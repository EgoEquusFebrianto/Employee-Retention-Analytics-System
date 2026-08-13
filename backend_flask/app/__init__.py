from flask import Flask
from dotenv import load_dotenv
import os

from app.extention import db
from app.routes.dashboard_route import dashboard_bp
from app.routes.employee_route import employee_bp

# APPLICATION FACTORY PATTERN
def create_app():
    load_dotenv()

    app = Flask(__name__)

    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DB_URL")
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.init_app(app)

    app.register_blueprint(employee_bp)
    app.register_blueprint(dashboard_bp)

    return app