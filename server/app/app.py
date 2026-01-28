from flask import Flask, request, jsonify
from flask_migrate import Migrate
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from app.models import (db, Parent, Route, Driver, Bus, Booking)

def create_app():
    app = Flask(__name__)

    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///school_transport.db" #still trying to get the concept of config in postgreSQL with a password
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.init_app(app)
    migrate = Migrate(app, db)
    CORS(app)

    #CRUD for routes
    #creation of a new parent or rather registration
    @app.post("/register")
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
            password_hash=generate_password_hash(password)
        )

        db.session.add(parent)
        db.session.commit()

        return jsonify({
            "parent_id": parent.parent_id,
            "email": parent.email,
            "full_name": parent.full_name
        }), 201

    #added login 
    @app.post("/login")
    def login():
        data = request.get_json()
        parent = Parent.query.filter_by(email=data["email"]).first()

        if not parent or not check_password_hash(parent.password_hash, data["password"]):
            return jsonify({"error": "Invalid credentials"}), 401

        return jsonify({
            "parent_id": parent.parent_id,
            "email": parent.email,
            "full_name": parent.full_name
        })

    @app.get("/parents")
    def get_parents():
        parents = Parent.query.all()
        return jsonify([
            {"parent_id": p.parent_id, "email": p.email, "full_name": p.full_name}
            for p in parents
        ])

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

    @app.get("/routes")
    def get_routes():
        routes = Route.query.all()
        return jsonify([
            {"route_id": r.route_id, "route_name": r.route_name}
            for r in routes
        ])
    
    @app.put("/routes/<int:route_id>")
    def update_route(route_id):
        route = Route.query.get_or_404(route_id)
        data = request.get_json()

        route.route_name = data.get("route_name", route.route_name)

        db.session.commit()
        return jsonify({"message": "Route updated"}), 200
    
    @app.delete("/routes/<int:route_id>")
    def delete_route(route_id):
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

    @app.get("/drivers")
    def get_drivers():
        drivers = Driver.query.all()
        return jsonify([
            {"driver_id": d.driver_id, "name": d.name, "email": d.email}
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
    
    @app.delete("/drivers/<int:driver_id>")
    def delete_driver(driver_id):
        driver = Driver.query.get_or_404(driver_id)
        db.session.delete(driver)
        db.session.commit()
        return jsonify({"message": "Driver deleted"}), 200

    #CRUD for Buses
    @app.post("/buses")
    def create_bus():
        data = request.get_json()
        bus = Bus(
            plate_number=data["plate_number"],
            route_id=data["route_id"],
            driver_id=data["driver_id"]
        )
        db.session.add(bus)
        db.session.commit()
        return jsonify({"message": "Bus created"}), 201
    
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
    
    #CRUD for Bookings
    @app.post("/bookings")
    def create_booking():
        data = request.get_json()
        booking = Booking(
            parent_id=data["parent_id"],
            bus_id=data["bus_id"],
            pickup_point=data["pickup_point"],
            dropoff_point=data["dropoff_point"]
        )
        db.session.add(booking)
        db.session.commit()
        return jsonify({"message": "Booking created"}), 201
    
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
    
    return app



app = create_app()