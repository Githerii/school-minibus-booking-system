from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()


class Parent(db.Model):
    __tablename__ = 'parents'

    parent_id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    full_name = db.Column(db.String(100), nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    bookings = db.relationship("Booking", back_populates="parent")

class Route(db.Model):
    __tablename__ = "routes"

    route_id = db.Column(db.Integer, primary_key=True)
    route_name = db.Column(db.String)
    start_location = db.Column(db.String, nullable=False)
    end_location = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    buses = db.relationship("Bus", back_populates="route")

class Driver(db.Model):
    __tablename__ = "drivers"

    driver_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True)

    buses = db.relationship("Bus", back_populates="driver")

class Bus(db.Model):
    __tablename__ = "buses"

    bus_id = db.Column(db.Integer, primary_key=True)
    route_id = db.Column(db.Integer, db.ForeignKey("routes.route_id"), nullable=False)
    driver_id = db.Column(db.Integer, db.ForeignKey("drivers.driver_id"), nullable=False)
    plate_number = db.Column(db.String, unique=True, nullable=False)
    capacity = db.Column(db.Integer, nullable=False)
    gps_coordinates= db.Column(db.String)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    route = db.relationship("Route", back_populates="buses")
    driver = db.relationship("Driver", back_populates="buses")
    bookings = db.relationship("Booking", back_populates="bus")
    
