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

client = MongoClient(config['PROD']['DB_URI'])
db = client.get_database("bhaibros")
users = db.users


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
        print("Existing email: ", existing_email)
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
            db_password = verify_email['password']
            print("Password: ", db_password)
            if db_password == password:
                return True
            else:
                return False

    except Exception as e:
        print(f"Error accessing user details: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500


def post_review():
    try:
        reviewDetails = request.get_json()
        reviewType = reviewDetails["reviewType"]
        driverSelection = reviewDetails["driverSelection"]
        review = reviewDetails["review"]
        rating = reviewDetails["rating"]

        review_data = {
            "reviewType": reviewType,
            "driverSelection": driverSelection,
            "review": review,
            "rating": rating,
        }

        review_id = db.reviews.insert_one(review_data).inserted_id
        return True
    except Exception as e:
        print(f"Error inserting review: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500