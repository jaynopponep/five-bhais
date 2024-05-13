from datetime import datetime
from typing import Union
import bson
import os
import configparser
import bson.json_util
import pymongo
from pymongo import MongoClient
from pymongo.errors import DuplicateKeyError, OperationFailure
from bson.objectid import ObjectId
from bson.errors import InvalidId
from flask import make_response, request, flash, jsonify
import re


current_dir = os.path.dirname(os.path.abspath(__file__))

# Construct the absolute path to your ..ini file
ini_file_path = os.path.join(current_dir, "..", "..ini")

# Load the configuration from the ..ini file
config = configparser.ConfigParser()
config.read(".ini")

client = MongoClient(config["PROD"]["DB_URI"])
db = client.get_database("bhaibros")
accounts = db.accounts
customers = db.customers
reviews = db.reviews
orders = db.orders


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

        balance = float(balance)
        if balance > 500:
            role = "vipcustomer"
            discount = 0.10
        else:
            role = "customer"
            discount = 0.0

        account_data = {
            "fname": fname,
            "lname": lname,
            "balance": balance,
            "email": email,
            "password": password,
            "role": role,
            "discount": discount,
        }
        db.accounts.insert_one(account_data)
        newUser = db.accounts.find_one({"email": email})
        return newUser

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
        existing_email = accounts.find_one({"email": email})
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

        foundUser = accounts.find_one({"email": email})
        if foundUser and (foundUser["password"] == password):
            return foundUser
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

        review_id = reviews.insert_one(review_data).inserted_id
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
        fixedID = ObjectId(item["_id"]["$oid"])
        item["_id"] = fixedID
        db.menu.replace_one({"_id": fixedID}, item)
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
        print(f"Error deleting an item: {str(e)}")
        return False


def delete_many_menu_items(names: list):
    try:
        db.menu.delete_many({"name": {"$in": names}})
        return True
    except Exception as e:
        # General error handling
        print(f"Error deleting many items: {str(e)}")
        return False


def get_all_menu_items():
    try:
        return bson.json_util.dumps(list(db.menu.find({})))
    except Exception as e:
        # General error handling
        print(f"Error getting menu items: {str(e)}")
        return False


def get_highest_reviews(limit: int):
    try:
        return db.menu.find().sort("reviews", pymongo.DESCENDING).limit(limit)
    except Exception as e:
        # General error handling
        print(f"Error getting reviews: {str(e)}")
        return False


def update_userType(email):
    try:
        customer = accounts.find_one({"email": email})

        if customer:
            # check if isVIP true or false
            if customer["isVIP"] == True:
                customers.update_one({"_id": ObjectId(id)}, {"$set": {"warnings": 0}})
                # if warning >= 2, update warnings and isVIP = false and discount = 0
                numWarning = int(customer["warnings"])
                if numWarning >= 2:
                    customers.update_one(  # reset warnings to 0
                        {"_id": ObjectId(id)},
                        {"warnings": 0},
                        {"isVIP": False},
                        {"discount": 0},
                    )
                    print(
                        "Warning limit reached. You have been registered as a regular customer"
                    )
            else:  # customer is regular
                customers.update_one({"_id": ObjectId(id)}, {"$set": {"warnings": 0}})
                # if warning >= 2, delete account
                numWarning = int(customer["warnings"])
                if numWarning >= 2:
                    customers.delete_one({"_id": ObjectId(id)})
                    print("Warning limit reached. You have been deregistered")

                    accounts.delete_one({"email": email})
                    print("Warning limit reached. You have been deregistered")
        else:
            print("customer not found")
    except Exception as e:
        print("unable to return user type")


def update_driver(email, driver_data):
    try:
        customer = accounts.find_one({"email": email})

        if customer:
            accounts.update_one({"email": email}, {"$set": driver_data})
            return True
    except Exception as e:
        print("Unable to update driver:", e)
        return False


def place_order(orderDetails):
    orderUserEmail = orderDetails["email"]
    orderTotal = float(orderDetails["total"])  # Ensure this is a float
    userEmail = accounts.find_one({"email": orderUserEmail})

    if not userEmail:
        print("User not found")
        return False
    if "balance" not in userEmail:
        print("Balance not found")
        return False

    userBalance = userEmail["balance"]
    print(userBalance)
    if orderTotal > userBalance:
        print("Insufficient funds")
        return False

    accounts.update_one({"email": orderUserEmail}, {"$inc": {"balance": -orderTotal}})
    orders.insert_one(orderDetails)
    return True


## Staff functions:
def get_all_staff():
    try:
        return bson.json_util.dumps(list(db.employees.find({})))
    except Exception as e:
        print(f"Error getting all staff members:  {str(e)}")
        return False


def create_staff(staff: dict):
    try:
        db.employees.insert_one(staff)
        fname, lname = staff["name"].split()
        email = staff["email"]
        balance = 0
        password = staff["password"]
        role = staff["role"]
        balance = float(balance)

        staff_account = {
            "fname": fname,
            "lname": lname,
            "balance": balance,
            "email": email,
            "password": password,
            "role": role,
        }
        db.accounts.insert_one(staff_account)
        newUser = db.accounts.find_one({"email": email})
        return newUser

    except pymongo.errors.DuplicateKeyError as e:
        return False
    except Exception as e:
        print(f"Error inserting staff: {str(e)}")
        return False
