from datetime import datetime
import bson
import os
import configparser
import pymongo
from pymongo import MongoClient
from pymongo.errors import DuplicateKeyError, OperationFailure
from bson.objectid import ObjectId
from bson.errors import InvalidId
from flask import request, flash, jsonify
import re


current_dir = os.path.dirname(os.path.abspath(__file__))

# Construct the absolute path to your ..ini file
ini_file_path = os.path.join(current_dir, "..", "..ini")

# Load the configuration from the ..ini file
config = configparser.ConfigParser()
config.read(".ini")

client = MongoClient(config["PROD"]["DB_URI"])
db = client.get_database("bhaibros")
users = db.users
accounts = db.accounts

# Test the database connection:
def test_db_connection():
    try:
        # Use a test collection to check the connection
        test_collection = db.test_collection
        test_collection.insert_one({"test": True})
        test_collection.delete_one({"test": True})
        return "The database is successfully connected"
    except Exception as e:
        return f"Error connecting to the database: {e}"


def verify_new_user():
    try:
        # check to see if valid login credentials are being inserted
        userDetails = request.get_json()
        fname = userDetails["firstName"]
        lname = userDetails["lastName"]
        email = userDetails["email"]
        balance = userDetails["initialDeposit"]
        password = userDetails["password"]

        account_data = {
            "fname": fname,
            "lname": lname,
            "balance": balance,
            "email": email,
            "password": password,
            "role": "customer"
        }
        account_id = db.accounts.insert_one(account_data).inserted_id
        return True

    except pymongo.errors.DuplicateKeyError as e:
        # Handle duplicate key error
        return False
    except Exception as e:
        # General error handling
        print(f"Error inserting user: {str(e)}")  # Logging the error
        return False


def email_exists():
    try:
        userDetails = request.get_json()
        email = userDetails["email"]
        # check if email already exists
        existing_email = db.accounts.find_one({"email": email})
        if existing_email is not None:
            return True
    except Exception as e:
        # General error handling
        print(f"Error inserting user: {str(e)}")  # Logging the error
        return False

def login():
    try:
        loginDetails = request.get_json()
        email = loginDetails["email"]
        password = loginDetails["password"]
        print("Login details: ", email, password)

        verify_email = db.accounts.find_one({"email": email})
        print("Login email: ", verify_email)
        if verify_email is None:
            return False
        if verify_email:
            db_password = verify_email["password"]
            print("Password: ", db_password)
            if db_password == password:
                return True
            else:
                return False

    except Exception as e:
        print(f"Error accessing user details: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500


def post_review():
    try:
        reviewDetails = request.get_json()
        reviewType = reviewDetails["reviewType"]
        if reviewType == "driver":
            driverSelection = reviewDetails["driverSelection"]
        review = reviewDetails["review"]
        rating = reviewDetails["rating"]
        author = reviewDetails["author"]

        review_data = {
            "reviewType": reviewType,
            "review": review,
            "rating": rating,
            "author": author,
        }
        if reviewType == "driver":
            driverSelection = reviewDetails["driverSelection"]
            review_data["driverSelection"] = driverSelection

        review_id = db.reviews.insert_one(review_data).inserted_id
        return True
    except Exception as e:
        print(f"Error inserting review: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500

def create_new_menu_item(item: dict):
    try:
        # check to see if valid login credentials are being inserted
        item_id = db.menu.insert_one(item).inserted_id
        return True

    except pymongo.errors.DuplicateKeyError as e:
        # Handle duplicate key error
        return False
    except Exception as e:
        # General error handling
        print(f"Error inserting item: {str(e)}")  # Logging the error
        return False


def edit_menu_item(item: dict):
    try:
        name = item["name"]
        db.menu.replace_one({"name": name}, item)
        return True
    except Exception as e:
        # General error handling
        print(f"Error updating item: {str(e)}")
        return False


def delete_menu_item(name: str):
    try:
        db.menu.delete_one({"name": name})
        return True
    except Exception as e:
        # General error handling
        print(f"Error deleting item: {str(e)}")
        return False


def delete_many_menu_items(names: list):
    try:
        db.menu.delete_many({"name": {"$in": names}})
        return True
    except Exception as e:
        # General error handling
        print(f"Error deleting items: {str(e)}")
        return False


def get_usertype_by_email(email):
    try:
        customer = accounts.find_one({"email": email})
        if customer:
            balance = int(customer['balance'])
            if balance > 500:
                accounts.update_one(
                    {"email": email}, {'$set': {'isVIP': True, 'discount': 0.10}}
                )
            else:
                accounts.update_one(
                    {"email": email}, {'$set': {'isVIP': False, 'discount': 0}}
                )
            return {
                "role": customer.get("role")
            }
        else:
            print("customer not found")

    except Exception as e:
        print(f"Unable to detect user: {str(e)}")

def update_userType(email):
    try:
        customer = accounts.find_one(
            {"email": email}
        )

        if customer:
            # check if isVIP true or false
            if customer["isVIP"] == True:
                accounts.update_one(
                    {"email": email}, {'$set': {'warnings': 0}}
                )
                # if warning >= 2, update warnings and isVIP = false and discount = 0
                numWarning = int(customer["warnings"])
                if numWarning >= 2:
                    accounts.update_one( # reset warnings to 0
                        {"email": email}, {'warnings': 0}, {'isVIP': False}, {'discount': 0}
                    )
                    print("Warning limit reached. You have been registered as a regular customer")
            else: # customer is regular
                accounts.update_one(
                    {"email": email}, {'$set': {'warnings': 0}}
                )
                # if warning >= 2, delete account
                numWarning = int(customer["warnings"])
                if numWarning >= 2:
                    accounts.delete_one(
                        {"email": email}
                    )
                    print("Warning limit reached. You have been deregistered")

        else:
            print("customer not found")
    except Exception as e:
        print("unable to return user type")


def update_driver(email, driver_data):
    try:
        customer = accounts.find_one(
            {"email": email}
        )

        if customer:
            accounts.update_one(
                {"email": email}, {'$set': driver_data}
            )
            return True
    except Exception as e:
        print("Unable to update driver:", e)
        return False
