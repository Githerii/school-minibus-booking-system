import token
from flask import Flask, app, request, jsonify
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt
from datetime import datetime
from app.utils.auth import admin_required


from werkzeug.security import generate_password_hash, check_password_hash
from app.models import (db, Parent, Route, Driver, Bus, Booking)

def create_app():
    app = Flask(__name__)

    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///school_transport.db" #still trying to get the concept of config in postgreSQL with a password
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["JWT_SECRET_KEY"] = "super-secret-change-this"
    jwt = JWTManager(app)

    db.init_app(app)
    migrate = Migrate(app, db)
    CORS(app)

    #CRUD for routes
    #creation of a new parent or rather registration
    @app.post("/parents")
    def register():
        data = request.get_json()

        if not data:
            return jsonify({"error": "Invalid request"}), 400

        email = data.get("email")
        password = data.get("password")
        full_name = data.get("full_name")

        if not email or not password or not full_name:
            return jsonify({"error": "Missing required fields"}), 400

        existing_parent = Parent.query.filter_by(email=email).first()
        if existing_parent:
            return jsonify({"error": "Email already registered"}), 409

        parent = Parent(
            email=email,
            full_name=full_name,
            password_hash = generate_password_hash(password, method="pbkdf2:sha256")
        )

        db.session.add(parent)
        db.session.commit()

        return jsonify({
            "parent_id": parent.parent_id,
            "email": parent.email,
            "full_name": parent.full_name
        }), 201

    #added login 
    #this has been updated for JWT
    @app.post("/login")
    def login():
        data = request.get_json()
        parent = Parent.query.filter_by(email=data["email"]).first()

        if not parent or not check_password_hash(parent.password_hash, data["password"]):
            return jsonify({"error": "Invalid credentials"}), 401

        token = create_access_token(
        identity=str(parent.parent_id),
        additional_claims={"role": parent.role}
    )

        return jsonify({
            "access_token": token,
            "role": parent.role
        }), 200

    @app.get("/parents")
    def get_parents():
        parents = Parent.query.all()
        return jsonify([
            {"parent_id": p.parent_id, "email": p.email, "full_name": p.full_name}
            for p in parents
        ])
    

    # for specifically getting only the admin
    @app.get("/admin/parents")
    @admin_required
    def get_all_parents():
        parents = Parent.query.all()
        return jsonify([
            {
                "id": p.parent_id,
                "email": p.email,
                "full_name": p.full_name,
                "role": p.role
            }
            for p in parents
        ])
    
    #This lets frontend verify identityy using JWT
    @app.get("/me")
    @jwt_required()
    def me():
        user_id = get_jwt_identity()
        claims = get_jwt()

        return {
            "id": user_id,
            "role": claims.get("role")
        }


    #CRUD FOR ROUTES
    @app.post("/routes")
    def create_route():
        data = request.get_json()

        if not data or not data.get("route_name"):
            return jsonify({"error": "Invalid request"}), 400
        
        required_fields = ["route_name", "start_location", "end_location"]

        if not all(field in data for field in required_fields):
            return jsonify({"error": "Missing required fields"}), 400
        
        route = Route(
            route_name=data["route_name"],
            start_location=data["start_location"],
            end_location=data["end_location"]
        )
        db.session.add(route)
        db.session.commit()
        return jsonify({
            "route_id": route.route_id,
            "route_name": route.route_name,
            "start_location": route.start_location,
            "end_location": route.end_location
        }), 201
    
    #admin POST end point
    @app.post("/admin/routes")
    @admin_required
    def admin_create_route():
        data = request.get_json()

        required_fields = ["name", "startLocation", "endLocation"]
        if not data or not all(f in data for f in required_fields):
            return jsonify({"error": "Missing required fields"}), 400

        route = Route(
            route_name=data["name"],
            start_location=data["startLocation"],
            end_location=data["endLocation"],
            pickup_spots=data.get("pickupSpots"),
            dropoff_spots=data.get("dropoffSpots"),
            status=data.get("status", "active")
        )

        db.session.add(route)
        db.session.commit()

        return jsonify({
            "id": route.route_id,
            "name": route.route_name,
            "startLocation": route.start_location,
            "endLocation": route.end_location,
            "pickupSpots": route.pickup_spots,
            "dropoffSpots": route.dropoff_spots,
            "status": route.status,
            "busCount": 0
        }), 201


    @app.get("/routes")
    def get_routes():
        routes = Route.query.filter_by(status="active").all()
        return jsonify([
            {"route_id": r.route_id,
             "route_name": r.route_name,
             "start_location": r.start_location,
             "end_location": r.end_location,
             "pickup_spots": r.pickup_spots,
             "dropoff_spots": r.dropoff_spots}
            for r in routes
        ])
    
    #Admin Get endpoint
    @app.get("/admin/routes")
    @admin_required
    def admin_get_routes():
        routes = Route.query.all()
        return jsonify([
            {
                "id": r.route_id,
                "name": r.route_name,
                "startLocation": r.start_location,
                "endLocation": r.end_location,
                "pickupSpots": r.pickup_spots,
                "dropoffSpots": r.dropoff_spots,
                "status": r.status,
                "busCount": len(r.buses) if hasattr(r, "buses") else 0
            }
            for r in routes
        ])

    
    @app.put("/routes/<int:route_id>")
    def update_route(route_id):
        route = Route.query.get_or_404(route_id)
        data = request.get_json()

        route.route_name = data.get("route_name", route.route_name)

        db.session.commit()
        return jsonify({"message": "Route updated"}), 200
    
    #admin put endpoint
    @app.put("/admin/routes/<int:route_id>")
    @admin_required
    def admin_update_route(route_id):
        route = Route.query.get_or_404(route_id)
        data = request.get_json()

        route.route_name = data.get("name", route.route_name)
        route.start_location = data.get("startLocation", route.start_location)
        route.end_location = data.get("endLocation", route.end_location)
        route.pickup_spots = data.get("pickupSpots", route.pickup_spots)
        route.dropoff_spots = data.get("dropoffSpots", route.dropoff_spots)
        route.status = data.get("status", route.status)

        db.session.commit()

        return jsonify({"message": "Route updated"}), 200
    

    @app.delete("/routes/<int:route_id>")
    def delete_route(route_id):
        route = Route.query.get_or_404(route_id)
        db.session.delete(route)
        db.session.commit()
        return jsonify({"message": "Route deleted"}), 200
    
    #admin delete endpoint
    @app.delete("/admin/routes/<int:route_id>")
    @admin_required
    def admin_delete_route(route_id):
        route = Route.query.get_or_404(route_id)
        db.session.delete(route)
        db.session.commit()

        return jsonify({"message": "Route deleted"}), 200
    

    #CRUD for Drivers - bus drivers
    @app.post("/drivers")
    def create_driver():
        data = request.get_json()
        driver = Driver(name=data["name"], email=data["email"])
        db.session.add(driver)
        db.session.commit()
        return jsonify({"message": "Driver created"}), 201

    #ADmin Driver POST endpoint
    @app.post("/admin/drivers")
    @admin_required
    def admin_create_driver():
        data = request.get_json()

        if not data or not data.get("name") or not data.get("email"):
            return {"error": "Missing required fields"}, 400

        driver = Driver(
            name=data["name"],
            email=data["email"]
        )

        db.session.add(driver)
        db.session.commit()

        return {
            "id": driver.driver_id,
            "name": driver.name,
            "email": driver.email
        }, 201


    @app.get("/drivers")
    def get_drivers():
        drivers = Driver.query.all()
        return jsonify([
            {"driver_id": d.driver_id, "name": d.name, "email": d.email}
            for d in drivers
        ])
    #Admin Drivers GET endpoint
    @app.get("/admin/drivers")
    @admin_required
    def admin_get_drivers():
        drivers = Driver.query.all()

        return jsonify([
            {
                "id": d.driver_id,
                "name": d.name,
                "email": d.email
            }
            for d in drivers
        ])



    @app.put("/drivers/<int:driver_id>")
    def update_driver(driver_id):
        driver = Driver.query.get_or_404(driver_id)
        data = request.get_json()

        driver.name = data.get("name", driver.name)
        driver.email = data.get("email", driver.email)

        db.session.commit()
        return jsonify({"message": "Driver updated"}), 200
    
    #Admin driver update endpoint

    @app.put("/admin/drivers/<int:driver_id>")
    @admin_required
    def admin_update_driver(driver_id):
        driver = Driver.query.get_or_404(driver_id)
        data = request.get_json()

        driver.name = data.get("name", driver.name)
        driver.email = data.get("email", driver.email)

        db.session.commit()

        return {"message": "Driver updated"}

    @app.delete("/drivers/<int:driver_id>")
    def delete_driver(driver_id):
        driver = Driver.query.get_or_404(driver_id)
        db.session.delete(driver)
        db.session.commit()
        return jsonify({"message": "Driver deleted"}), 200

    #Admin driver delete endpoint
    @app.delete("/admin/drivers/<int:driver_id>")
    @admin_required
    def admin_delete_driver(driver_id):
        driver = Driver.query.get_or_404(driver_id)
        db.session.delete(driver)
        db.session.commit()

        return {"message": "Driver deleted"}

    #CRUD for Buses
    @app.post("/buses")
    def create_bus():
        data = request.get_json()

        required_fields = ["plate_number", "route_id", "driver_id"]
        if not all(field in data for field in required_fields):
            return jsonify({"error": "Missing required fields"}), 400

        bus = Bus(
            plate_number=data["plate_number"],
            route_id=data["route_id"],
            driver_id=data["driver_id"],
            capacity=data["capacity"]
        )
        db.session.add(bus)
        db.session.commit()
        return jsonify({"bus_id": bus.bus_id,
                        "plate_number": bus.plate_number,
                        "capacity": bus.capacity
                        }), 201
    
    #admin buses POST endpoitn
    @app.post("/admin/buses")
    @admin_required
    def admin_create_bus():
        data = request.get_json()

        required = ["plateNumber", "capacity", "routeId", "driverId"]
        if not all(field in data for field in required):
            return {"error": "Missing required fields"}, 400

        bus = Bus(
            plate_number=data["plateNumber"],
            capacity=data["capacity"],
            route_id=data["routeId"],
            driver_id=data["driverId"]
        )

        db.session.add(bus)
        db.session.commit()

        return {
            "id": bus.bus_id,
            "plateNumber": bus.plate_number,
            "capacity": bus.capacity,
            "routeId": bus.route_id,
            "driverId": bus.driver_id
        }, 201


    @app.get("/buses")
    def get_buses():
        buses = Bus.query.all()
        return jsonify([
            {
                "bus_id": b.bus_id,
                "plate_number": b.plate_number,
                "route": b.route.route_name,
                "driver": b.driver.name
            }
            for b in buses
        ])
    #Admin buses GET endpoint
    @app.get("/admin/buses")
    @admin_required
    def admin_get_buses():
        buses = Bus.query.all()

        return jsonify([
            {
                "id": b.bus_id,
                "plateNumber": b.plate_number,
                "capacity": b.capacity,
                "routeId": b.route_id,
                "driverId": b.driver_id,
                "routeName": b.route.route_name if b.route else None,
                "driverName": b.driver.name if b.driver else None
            }
            for b in buses
        ])

    @app.put("/buses/<int:bus_id>")
    def update_bus(bus_id):
        bus = Bus.query.get_or_404(bus_id)
        data = request.get_json()

        bus.plate_number = data.get("plate_number", bus.plate_number)
        bus.route_id = data.get("route_id", bus.route_id)
        bus.driver_id = data.get("driver_id", bus.driver_id)

        db.session.commit()
        return jsonify({"message": "Bus updated"}), 200
    #admin update bus endpoint
    @app.put("/admin/buses/<int:bus_id>")
    @admin_required
    def admin_update_bus(bus_id):
        bus = Bus.query.get_or_404(bus_id)
        data = request.get_json()

        bus.plate_number = data.get("plateNumber", bus.plate_number)
        bus.capacity = data.get("capacity", bus.capacity)
        bus.route_id = data.get("routeId", bus.route_id)
        bus.driver_id = data.get("driverId", bus.driver_id)

        db.session.commit()

        return {"message": "Bus updated"}



    @app.delete("/buses/<int:bus_id>")
    def delete_bus(bus_id):
        bus = Bus.query.get_or_404(bus_id)
        db.session.delete(bus)
        db.session.commit()
        return jsonify({"message": "Bus deleted"}), 200
    
    #Admin Delete bus endpoiny
    @app.delete("/admin/buses/<int:bus_id>")
    @admin_required
    def admin_delete_bus(bus_id):
        bus = Bus.query.get_or_404(bus_id)

        db.session.delete(bus)
        db.session.commit()

        return {"message": "Bus deleted"}

    #CRUD for Bookings
    @app.post("/bookings")
    @jwt_required()  # Require authentication
    def create_booking():
        try:
            data = request.get_json()
            
            # Validate required fields
            required_fields = ["bus_id", "pickup_point", "drop_off_point"]
            missing_fields = [field for field in required_fields if field not in data]
            
            if missing_fields:
                return jsonify({
                    "error": f"Missing required fields: {', '.join(missing_fields)}"
                }), 400

            #Gets parent id from JWT token
            parent_id = get_jwt_identity()

            # Verify parent exists
            parent = Parent.query.get(parent_id)
            if not parent:
                return jsonify({"error": "Parent not found"}), 404
            
            # Verify bus exists
            bus = Bus.query.get(data["bus_id"])
            if not bus:
                return jsonify({"error": "Bus not found"}), 404
            
            # Create booking
            booking = Booking(
                parent_id=parent_id,
                bus_id=data["bus_id"],
                pickup_point=data["pickup_point"],
                drop_off_point=data["drop_off_point"],
                num_seats=data.get("num_seats", 1),
                selected_days=data.get("selected_days"),
                booking_date=data.get("booking_date", datetime.now().strftime("%Y-%m-%d")),
                status="booked"
            )
            
            db.session.add(booking)
            db.session.commit()
            
            return jsonify({
                "id": booking.booking_id,
                "parent_id": booking.parent_id,
                "bus_id": booking.bus_id,
                "pickup": booking.pickup_point,
                "dropoff": booking.drop_off_point,
                "numSeats": booking.num_seats,
                "selectedDays": booking.selected_days,
                "bookingDate": booking.booking_date,
                "message": "Booking created successfully"
            }), 201
            
        except KeyError as e:
            db.session.rollback()
            return jsonify({"error": f"Invalid field: {str(e)}"}), 400
        except Exception as e:
            db.session.rollback()
            return jsonify({"error": f"Failed to create booking: {str(e)}"}), 500
    
    #Admin create bookings endpoint
    @app.post("/admin/bookings")
    @admin_required
    def admin_create_booking():
        try:
            data = request.get_json()

            required = ["parentId", "busId", "pickup", "dropoff"]
            if not all(field in data for field in required):
                return {"error": "Missing required fields"}, 400

            # this line is for Getting today's date as default if not provided
            booking_date = data.get("bookingDate", datetime.now().strftime("%Y-%m-%d"))

            booking = Booking(
                parent_id=data["parentId"],
                bus_id=data["busId"],
                pickup_point=data["pickup"],
                drop_off_point=data["dropoff"],  
                booking_date=booking_date,        
                status=data.get("status", "booked")
            )

            db.session.add(booking)
            db.session.commit()

            return {
                "id": booking.booking_id,
                "parentId": booking.parent_id,
                "busId": booking.bus_id,
                "pickup": booking.pickup_point,
                "dropoff": booking.drop_off_point,
                "bookingDate": booking.booking_date,
                "status": booking.status
            }, 201
            
        except Exception as e:
            db.session.rollback()
            return {"error": str(e)}, 500

    
    @app.get("/bookings")
    def get_bookings():
        bookings = Booking.query.all()
        return jsonify([
            {
                "booking_id": b.booking_id,
                "parent": b.parent.full_name,
                "bus": b.bus.plate_number,
                "pickup": b.pickup_point,
                "dropoff": b.dropoff_point
            }
            for b in bookings
        ])
    
    #Admin GET bookings endpoint
    @app.get("/admin/bookings")
    @admin_required
    def admin_get_bookings():
        bookings = Booking.query.all()
        return jsonify([
            {
                "id": b.booking_id,
                "parentId": b.parent_id,
                "parentName": b.parent.full_name,
                "busId": b.bus_id,
                "busPlate": b.bus.plate_number,
                "pickup": b.pickup_point,
                "dropoff": b.drop_off_point, 
                "bookingDate": b.booking_date,
                "status": b.status
            }
            for b in bookings
        ])

    @app.put("/bookings/<int:booking_id>")
    def update_booking(booking_id):
        booking = Booking.query.get_or_404(booking_id)
        data = request.get_json()

        booking.pickup_point = data.get("pickup_point", booking.pickup_point)
        booking.dropoff_point = data.get("dropoff_point", booking.dropoff_point)
        booking.bus_id = data.get("bus_id", booking.bus_id)

        db.session.commit()
        return jsonify({"message": "Booking updated"}), 200
    # Admin update booking endpoint
    @app.put("/admin/bookings/<int:booking_id>")
    @admin_required
    def admin_update_booking(booking_id):
        booking = Booking.query.get_or_404(booking_id)
        data = request.get_json()

        booking.parent_id = data.get("parentId", booking.parent_id)
        booking.bus_id = data.get("busId", booking.bus_id)
        booking.pickup_point = data.get("pickup", booking.pickup_point)
        booking.drop_off_point = data.get("dropoff", booking.drop_off_point)  
        booking.booking_date = data.get("bookingDate", booking.booking_date)
        booking.status = data.get("status", booking.status)

        db.session.commit()

        return {"message": "Booking updated"}


    @app.delete("/bookings/<int:booking_id>")
    def delete_booking(booking_id):
        booking = Booking.query.get_or_404(booking_id)
        db.session.delete(booking)
        db.session.commit()
        return jsonify({"message": "Booking deleted"}), 200
    
    @app.delete("/admin/bookings/<int:booking_id>")
    @admin_required
    def admin_delete_booking(booking_id):
        booking = Booking.query.get_or_404(booking_id)

        db.session.delete(booking)
        db.session.commit()

        return {"message": "Booking deleted"}

    
    return app

app = create_app()