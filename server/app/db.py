from datetime import datetime
import bson
import os
import configparser

import bson.json_util
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
        if existing_email is not None:
            return True
    except Exception as e:
        # General error handling
        print(f"Error inserting user: {str(e)}")  # Logging the error
        return False


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