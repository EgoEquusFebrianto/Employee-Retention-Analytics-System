import os

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
import os

db = SQLAlchemy()

# APPLICATION FACTORY PATTERN
def create_app():
    load_dotenv()

    app = Flask(__name__)

    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DB_URL")
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.init_app(app)

    # Memperkenalkan Model Employee ke SQLAlchemy
    with app.app_context():
        from app.models.employee_model import Employee

        db.create_all()

    return app