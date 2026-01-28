from flask import Flask, request, jsonify
from flask_migrate import Migrate
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from app.models import (db, Parent, Route, Driver, Bus, Booking)

def create_app():
    app = Flask(__name__)

    app.config["SQLALCHEMY_DATABASE_URI"] = ("postgresql://postgres:password@localhost:5432/school_transport") #still trying to get the concept of config in postgreSQL with a password
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.init_app(app)
    migrate = Migrate(app, db)
    CORS(app)

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


    return app



app = create_app()