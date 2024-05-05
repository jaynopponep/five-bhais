from flask import Blueprint, request, jsonify
from app.db import test_db_connection, verify_new_user, email_exists

from flask_cors import CORS
from app.api.utils import expect
from datetime import datetime

users_api_v1 = Blueprint(
    'users_api_v1', 'users_api_v1', url_prefix='/api/v1/users')

CORS(users_api_v1)


@users_api_v1.route('/', methods=['GET'])
def api_get_movies():
    response = "Welcome to the API!"
    return jsonify(response)


@users_api_v1.route('/test', methods=['GET'])
def api_test_db():
    response = test_db_connection()
    return jsonify(response)


@users_api_v1.route('/register', methods=['POST'])
def api_register():
    if not request.is_json:
        return jsonify({'error': 'Not JSON request'}), 400
    request_data = request.get_json()
    print("received: ", request_data)
    try:
        check_email = email_exists()
        if check_email:
            return jsonify({'error': 'Email already exists'}), 400
        success = verify_new_user()
        if success:
            return jsonify({'message': 'User Successfully Registered'}), 201
        else:
            return jsonify({'error': 'Registration Unsuccessful'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

