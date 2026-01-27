from flask import Flask, request, jsonify
from flask_migrate import Migrate
from flask_cors import CORS

from app.models import (db, Parent, Route, Driver)

def create_app():
    app = Flask(__name__)

    