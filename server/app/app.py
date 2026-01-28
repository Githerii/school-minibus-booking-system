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
    Migrate = Migrate(app, db)
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


    #CRUD FOR ROUTES
    @app.post("/routes")
    def create_route():
        data = request.get_json()
        route = Route(route_name=data["route_name"])
        db.session.add(route)
        db.session.commit()
        return jsonify({"message": "Route created"}), 201
    
    @app.get("/routes")
    def get_routes():
        routes = Route.query.all()
        return jsonify([
            {"route_id": r.route_id, "route_name": r.route_name}
            for r in routes
        ])

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
    
    
    return app



app = create_app()