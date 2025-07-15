from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt


db = SQLAlchemy()
bcrypt = Bcrypt()

class User(db.Model):
    __tablename__ = "user"

    id = db.Column (db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)
    is_active = db.Column(db.Boolean, default=True)


    def check_password(self, password_input):
        return bcrypt.check_password_hash(self.password, password_input)


    def serialize(self):
        return {
            "id": self.id,
            "email": self.email
            # do not serialize the password, its a security breach
        }