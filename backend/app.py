from flask import Flask
import pymongo
from pymongo import MongoClient
import json 
from bson import json_util
# Mac: export FLASK_APP=app.py flask run
# To keep it in dev mode continuously: export FLASK_APP=app.py FLASK_ENV=development
# Talking Points for Presentation: 1. Close closest cluster for lowest latency 2. Chose PyMongo over MongoEngine -- why? 3. Demo Login
# Notes: 3.7.6 but using Python 3.4 or later -- why?

cluster_320 = MongoClient("mongodb://cc320:cc320@320-shard-00-00.8rfoj.mongodb.net:27017,320-shard-00-01.8rfoj.mongodb.net:27017,320-shard-00-02.8rfoj.mongodb.net:27017/320?ssl=true&replicaSet=atlas-mkdts8-shard-0&authSource=admin&retryWrites=true&w=majority")

db = cluster_320["Employees"]
collection = db["collection"]

app = Flask(__name__)

@app.route("/details", methods=["GET"])
def get_employees():
    all_employees = list(collection.find({}))
    return json.dumps(all_employees, default=json_util.default)