from typing import Union
from flask import Blueprint, request, jsonify
import bson
import json
from app.db import (
    test_db_connection,
    verify_new_user,
    email_exists,
    create_new_menu_item,
    edit_menu_item,
    delete_menu_item,
    delete_many_menu_items,
    get_all_menu_items,
    get_highest_reviews,
    login,
    post_review,
    place_order,
    get_all_staff,
    create_staff,
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
        newUser = verify_new_user()
        newUser["_id"] = str(newUser["_id"])
        if newUser:
            return (
                jsonify({"message": "User successfully registered", "user": newUser}),
                201,
            )
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

        user = login()
        user["_id"] = str(user["_id"])
        if user:
            return (
                jsonify({"message": "User logged in successfully", "user": user}),
                201,
            )
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


@users_api_v1.route("/getMenuItems", methods=["GET"])
def get_menu_items():
    try:
        menu_items = get_all_menu_items()
        return jsonify({"items": json.loads(menu_items)}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@users_api_v1.route("/getHighestReviews", methods=["GET"])
def get_highest_reviews():
    limit = request.args.get("limit")
    try:
        highest_reviews = get_highest_reviews(limit=limit)
        return jsonify({"items": highest_reviews}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@users_api_v1.route("/order", methods=["GET"])
def order():
    if not request.is_json:
        return jsonify({"error": "Not JSON request"}), 400
    try:
        request_data = request.get_json()
        response = place_order(request_data)
        if response == 400:
            return jsonify({"error": response}), 400
        else:
            return jsonify({"message": f"Order placed successfully. New balance: {response}"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400


## STAFF APIS:
@users_api_v1.route("/getStaff", methods=["GET"])
def api_get_staff():
    try:
        staff_members = get_all_staff()
        return jsonify({"staff_members": json.loads(staff_members)}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@users_api_v1.route("/createStaff", methods=["POST"])
def api_create_staff():
    if not request.is_json:
        return jsonify({"error": "No JSON request found"}), 400
    request_data = request.get_json()
    try:
        name = request_data["name"]
        pay = request_data["pay"]
        email = request_data["email"]
        password = request_data["password"]
        role = request_data["role"]
        expect(name, str, "name")
        expect(pay, (int, float), "pay")
        expect(email, str, "email")
        expect(password, str, "password")
        expect(role, str, "category")
        create_staff(staff=request_data)
        return jsonify({"message": f"Staff ({name}) was added"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400
