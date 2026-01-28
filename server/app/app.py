from flask import Flask, request, jsonify
from flask_migrate import Migrate
from flask_cors import CORS

from app.models import (db, Parent, Route, Driver, Bus, Booking)

def create_app():
    app = Flask(__name__)

    app.config["SQLALCHEMY_DATABASE_URI"] = ("postgresql://school_transport") #still trying to get the concept of config in postgreSQL with a password
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.init_app(app)
    migrate = Migrate(app, db)
    CORS(app)

    return app



app = create_app()