import os

class Config:
    SQLALCHEMY_DATABASE_URI: str = os.getenv("DB_URL", "")
    SQLALCHEMY_TRACK_MODIFICATIONS: bool = False