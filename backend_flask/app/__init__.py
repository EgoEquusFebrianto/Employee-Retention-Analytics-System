from flask import Flask
from dotenv import load_dotenv
import os

from app.extention import db, cors
from app.routes.dashboard_route import dashboard_bp
from app.routes.employee_route import employee_bp

# APPLICATION FACTORY PATTERN
def create_app():
    load_dotenv()

    app = Flask(__name__)

    app.config.from_object("config.Config")

    cors_origins = os.getenv(
        "CORS_ORIGINS",
        "http://localhost"
    ).split(",")

    db.init_app(app)

    cors.init_app(
        app,
        resources={
            r"/api/*": {
                "origins": cors_origins,
                "methods": ["GET", "POST"], # ANOTHER: "PUT", "DELETE", "PATCH", "OPTIONS"
                "allow_headers": ["Content-Type", "Authorization", "Accept"],
                # "expose_headers": ["Content-Type", "Authorization"],
                # "max_age": 600,
                # "supports_credentials": True,
            }
        }
    )

    app.register_blueprint(employee_bp)
    app.register_blueprint(dashboard_bp)

    return app