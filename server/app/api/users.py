from flask import Blueprint, request, jsonify
from app.db import test_db_connection, verify_new_user, email_exists, post_review, login
from app.db import (
    test_db_connection,
    verify_new_user,
    email_exists,
    create_new_menu_item,
    edit_menu_item,
    delete_menu_item,
    delete_many_menu_items,
)

from flask_cors import CORS
from app.api.utils import expect
from datetime import datetime

users_api_v1 = Blueprint("users_api_v1", "users_api_v1", url_prefix="/api/v1/users")

CORS(users_api_v1)


@users_api_v1.route("/", methods=["GET"])
def api_get_movies():
    response = "Welcome to the API!"
    return jsonify(response)


@users_api_v1.route("/test", methods=["GET"])
def api_test_db():
    response = test_db_connection()
    return jsonify(response)


@users_api_v1.route("/register", methods=["POST"])
def api_register():
    if not request.is_json:
        return jsonify({"error": "Not JSON request"}), 400
    request_data = request.get_json()

    try:
        check_email = email_exists()
        if check_email:
            return jsonify({"error": "Email already exists"}), 400
        success = verify_new_user()
        if success:
            return jsonify({"message": "User Successfully Registered"}), 201
        else:
            return jsonify({"error": "Registration Unsuccessful"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@users_api_v1.route("/login", methods=["POST"])
def api_login():
    if not request.is_json:
        return jsonify({"error": "Not JSON request"}), 400
    request_data = request.get_json()
    print("LOGIN ROUTE: received: ", request_data)
    try:
        success = login()
        if success:
            return jsonify({"message": "User logged in successfully"}), 201
        else:
            return jsonify({"error": "Login Unsuccessful"}), 405
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@users_api_v1.route("/post-review", methods=["POST"])
def api_post_review():
    if not request.is_json:
        return jsonify({"error": "Not JSON request"}), 400
    request_data = request.get_json()
    print(request_data)
    try:
        success = post_review()
        if success:
            return jsonify({"message": "Review successfully posted"}), 201
        else:
            return jsonify({"error": "Review could not be posted"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500
      
      
@users_api_v1.route("/createItem", methods=["POST"])
def create_item():
    if not request.is_json:
        return jsonify({"error": "Not JSON request"}), 400
    request_data = request.get_json()
    try:
        name = request_data["name"]
        description = request_data["description"]
        price = request_data["price"]
        category = request_data["category"]
        chef = request_data["chef"]
        expect(name, str, "name")
        expect(description, str, "description")
        expect(price, (int, float), "price")
        expect(category, str, "category")
        expect(chef, str, "chef")
        create_new_menu_item(item=request_data)
        return jsonify({"message": f"Menu item ({name}) created successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@users_api_v1.route("/editItem", methods=["POST"])
def edit_item():
    if not request.is_json:
        return jsonify({"error": "Not JSON request"}), 400
    request_data = request.get_json()
    try:
        name, description, price, category, chef = (
            request_data["name"],
            request_data["description"],
            request_data["price"],
            request_data["category"],
            request_data["chef"],
        )
        expect(name, str, "name")
        expect(description, str, "description")
        expect(price, (int, float), "price")
        expect(category, str, "category")
        expect(chef, str, "chef")
        edit_menu_item(item=request_data)
        return jsonify({"message": f"Menu item ({name}) edited successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@users_api_v1.route("/deleteItem", methods=["POST"])
def delete_item():
    if not request.is_json:
        return jsonify({"error": "Not JSON request"}), 400
    request_data = request.get_json()
    try:
        name = request_data["name"]
        expect(name, str, "name")
        delete_menu_item(name=name)
        return jsonify({"message": f"Menu item ({name}) deleted successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@users_api_v1.route("/deleteManyItems", methods=["POST"])
def delete_many_items():
    if not request.is_json:
        return jsonify({"error": "Not JSON request"}), 400
    request_data = request.get_json()
    try:
        items = request_data["items"]
        expect(items, list, "items")
        to_delete = []
        for item in items:
            to_delete.append(item["name"])
        delete_many_menu_items(to_delete)
        return jsonify({"message": "Menu items deleted successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400