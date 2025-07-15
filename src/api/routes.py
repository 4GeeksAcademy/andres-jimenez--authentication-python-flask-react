"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, bcrypt
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required


api = Blueprint('api', __name__)


# Allow CORS requests to this API
CORS(api)


# ==== SIGNUP ===
@api.route('/user', methods=['POST'])
def create_user():
    # Get request data
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    if not email or not password:
        raise APIException("Email and password are required fields", 400)
    
    # Search email to confirm if already exist
    user_exist = User.query.filter_by(email = email).first()
    if user_exist:
        raise APIException("User aleready exists", 400)
    
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    
    newUser = User(
        email = email,
        password = hashed_password,
        is_active = True
    )

    db.session.add (newUser)
    db.session.commit()

    return jsonify({"message": "User created successfully"}), 201

# === LOGIN ====
@api.route('/token', methods=['POST'])
def create_token():
    # Get request username and password
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    # Search user id in DB
    user = User.query.filter_by(email = email).first()

    if user is None or not bcrypt.check_password_hashed(user.password, password):
        raise APIException("Invalid credendtials", 401)
    
    access_token = create_access_token(identity = user.id)
    
    return jsonify({"token": access_token, "user_id": user.id}), 200


# ===== PROTECTED ROUTE =====
@api.route('/protected', methods = ['GET'])
@jwt_required()
def protected():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    if not user:
        raise APIException("User not found", 404)


    return jsonify({"id": user.id, "email": user.email}), 200

   
