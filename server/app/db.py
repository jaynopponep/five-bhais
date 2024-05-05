"""
This module contains all database interfacing methods for the MFlix
application. You will be working on this file for the majority of M220P.

Each method has a short description, and the methods you must implement have
docstrings with a short explanation of the task.

Look out for TODO markers for additional help. Good luck!
"""
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

# Construct the absolute path to your .ini file
ini_file_path = os.path.join(current_dir, "..", ".ini")

# Load the configuration from the .ini file
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


# TODO: Try to get some data from the database.
def get_listings_by_name(name):
    """
    Given a name, return a list of Airbnb listings.
    """
    try:
        print(f"Name: {name}")
        return list(db.listingsAndReviews.find({name: name}))
    except Exception as e:
        return e
# TODO: Implement db accessor and modifier methods here.


def verifyNewUser():
    try:
        # check to see if valid login credentials are being inserted
        userDetails = request.get_json()
        fname = userDetails["firstName"]
        lname = userDetails["lastName"]
        email = userDetails["email"]
        username = userDetails["initialDeposit"]
        password = userDetails["password"]
        conpass = userDetails["confirmPassword"]

        # check if username already exists
        # existing_user = db.accounts.find_one({"username": username})
        # if existing_user:
        #     flash('Username already exists.', category='error')
        #     return False
        #
        # # check email format
        # if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
        #     flash('Email address is invalid.', category='error')
        #     return False
        #
        # # check password requirements
        # if not re.search(r"[\d]+", password):
        #     flash('Password must contain at least 1 digit.', category='error')
        #     return False
        # if not re.search(r"[A-Z]+", password):
        #     flash('Password must contain at least 1 uppercase letter.', category='error')
        #     return False
        # if not re.search(r"[a-z]+", password):
        #     flash('Password must contain at least 1 lowercase letter.', category='error')
        #     return False
        # if len(password) < 8:
        #     flash('Password must contain at least 8 characters.', category='error')
        #     return False
        # if password != conpass:
        #     flash('Passwords do not match.', category='error')
        #     return False
        #
        # # check phone number length
        # if len(phone) != 10:
        #     flash('Phone number is invalid. Must be 10 digits.', category='error')
        #     return False
        #
        # # check card number length
        # if len(card) != 16:
        #     flash('Card number is invalid. Must be 16 digits.', category='error')
        #     return False
        #
        # # account pending creation. must be approved by manager to be added to database
        # flash('Account successfully created!', category='success')

        # Insert new account into the database
        account_data = {
            "fname": fname,
            "lname": lname,
            "email": email,
            "username": username,
            "password": password,
        }
        account_id = db.accounts.insert_one(account_data).inserted_id
        customer_data = {
            "account_id": account_id
        }
        db.customers.insert_one(customer_data)

        return True
    except pymongo.errors.DuplicateKeyError as e:
        # Handle duplicate key error
        return jsonify({'error': 'User already exists'}), 409
    except Exception as e:
        # General error handling
        print(f"Error inserting user: {str(e)}")  # Logging the error
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

# def get_movies_by_country(countries):
#     """
#     Finds and returns movies by country.
#     Returns a list of dictionaries, each dictionary contains a title and an _id.
#     """
#     try:

#         """
#         Ticket: Projection

#         Write a query that matches movies with the countries in the "countries"
#         list, but only returns the title and _id of each movie.

#         Remember that in MongoDB, the $in operator can be used with a list to
#         match one or more values of a specific field.
#         """

#         # Find movies matching the "countries" list, but only return the title
#         # and _id. Do not include a limit in your own implementation, it is
#         # included here to avoid sending 46000 documents down the wire.
#         print(f" c: {countries}")
#         return list(db.movies.find({},{"country" : 1}))

#     except Exception as e:
#         return e


# def get_movies_faceted(filters, page, movies_per_page):
#     """
#     Returns movies and runtime and ratings facets. Also returns the total
#     movies matched by the filter.

#     Uses the same sort_key as get_movies
#     """
#     sort_key = "tomatoes.viewer.numReviews"

#     pipeline = []

#     if "cast" in filters:
#         pipeline.extend([{
#             "$match": {"cast": {"$in": filters.get("cast")}}
#         }, {
#             "$sort": {sort_key: -1}
#         }])
#     else:
#         raise AssertionError("No filters to pass to faceted search!")

#     counting = pipeline[:]
#     count_stage = {"$count": "count"}
#     counting.append(count_stage)

#     skip_stage = {"$skip": movies_per_page * page}
#     limit_stage = {"$limit": movies_per_page}
#     facet_stage = {
#         "$facet": {
#             "runtime": [{
#                 "$bucket": {
#                     "groupBy": "$runtime",
#                     "boundaries": [0, 60, 90, 120, 180],
#                     "default": "other",
#                     "output": {
#                         "count": {"$sum": 1}
#                     }
#                 }
#             }],
#             "rating": [{
#                 "$bucket": {
#                     "groupBy": "$metacritic",
#                     "boundaries": [0, 50, 70, 90, 100],
#                     "default": "other",
#                     "output": {
#                         "count": {"$sum": 1}
#                     }
#                 }
#             }],
#             "movies": [{
#                 "$addFields": {
#                     "title": "$title"
#                 }
#             }]
#         }
#     }

#     try:
#         movies = list(db.movies.aggregate(pipeline, allowDiskUse=True))[0]
#         count = list(db.movies.aggregate(counting, allowDiskUse=True))[
#             0].get("count")
#         return (movies, count)
#     except OperationFailure:
#         raise OperationFailure(
#             "Results too large to sort, be more restrictive in filter")


# def build_query_sort_project(filters):
#     """
#     Builds the `query` predicate, `sort` and `projection` attributes for a given
#     filters dictionary.
#     """
#     query = {}
#     # The field "tomatoes.viewer.numReviews" only exists in the movies we want
#     # to display on the front page of MFlix, because they are famous or
#     # aesthetically pleasing. When we sort on it, the movies containing this
#     # field will be displayed at the top of the page.
#     sort = [("tomatoes.viewer.numReviews", -1)]
#     project = None
#     if filters:
#         if "text" in filters:
#             query = {"$text": {"$search": filters["text"]}}
#             meta_score = {"$meta": "textScore"}
#             sort = [("score", meta_score)]
#             project = {"score": meta_score}
#         elif "cast" in filters:
#             query = {"cast": {"$in": filters["cast"]}}
#         elif "genres" in filters:

#             """
#             Ticket: Text and Subfield Search

#             Given a genre in the "filters" object, construct a query that
#             searches MongoDB for movies with that genre.
#             """

#             # TODO: Text and Subfield Search
#             # Construct a query that will search for the chosen genre.
#             query = {}

#     return query, sort, project


# def get_movies(filters, page, movies_per_page):
#     """
#     Returns a cursor to a list of movie documents.

#     Based on the page number and the number of movies per page, the result may
#     be skipped and limited.

#     The `filters` from the API are passed to the `build_query_sort_project`
#     method, which constructs a query, sort, and projection, and then that query
#     is executed by this method (`get_movies`).

#     Returns 2 elements in a tuple: (movies, total_num_movies)
#     """
#     query, sort, project = build_query_sort_project(filters)
#     if project:
#         cursor = db.movies.find(query, project).sort(sort)
#     else:
#         cursor = db.movies.find(query).sort(sort)

#     total_num_movies = 0
#     if page == 0:
#         total_num_movies = db.movies.count_documents(query)
 
#     movies = cursor.limit(movies_per_page)

#     return (list(movies), total_num_movies)


# def get_movie(id):
#     """
#     Given a movie ID, return a movie with that ID, with the comments for that
#     movie embedded in the movie document. The comments are joined from the
#     comments collection using expressive $lookup.
#     """
#     try:

#         pipeline = [
#             {
#                 "$match": {
#                     "_id": ObjectId(id)
#                 }
#             }
#         ]

#         movie = db.movies.aggregate(pipeline).next()
#         return movie

#     # TODO: Error Handling
#     # If an invalid ID is passed to `get_movie`, it should return None.
#     except (StopIteration) as _:

#         return None

#     except Exception as e:
#         return {}


# def get_all_genres():
#     """
#     Returns list of all genres in the database.
#     """
#     return list(db.movies.aggregate([
#         {"$unwind": "$genres"},
#         {"$group": {"_id": None, "genres": {"$addToSet": "$genres"}}}
#     ]))[0]["genres"]


# """
# Ticket: Create/Update Comments

# For this ticket, you will need to implement the following two methods:

# - add_comment
# - update_comment

# You can find these methods below this docstring. Make sure to read the comments
# to better understand the task.
# """


# def add_comment(movie_id,name , email, comment, date):
#     """
#     Inserts a comment into the comments collection, with the following fields:

#     - "name"
#     - "email"
#     - "movie_id"
#     - "text"
#     - "date"

#     Name and email must be retrieved from the "user" object.
#     """
    
#     comment_doc = { 'movie_id' : movie_id, 'name' : name, 'email' : email,'text' : comment, 'date' : date}
#     return db.comments.insert_one(comment_doc)


# def update_comment(comment_id, user_email, text, date):
#     """
#     Updates the comment in the comment collection. Queries for the comment
#     based by both comment _id field as well as the email field to doubly ensure
#     the user has permission to edit this comment.
#     """
#     # TODO: Create/Update Comments
#     # Use the user_email and comment_id to select the proper comment, then
#     # update the "text" and "date" of the selected comment.
#     response = db.comments.update_one(
#         { "comment_id": comment_id },
#         { "$set": { "text ": text, "date" : date } }
#     )

#     return response


# def delete_comment(comment_id, user_email):
#     """
#     Given a user's email and a comment ID, deletes a comment from the comments
#     collection
#     """

#     response = db.comments.delete_one( { "_id": ObjectId(comment_id) } )
#     return response