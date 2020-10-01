from flask import Flask
import pymongo
from pymongo import MongoClient
from flask import request
from bson import json_util

import os
import json

app = Flask(__name__)

cluster = MongoClient("mongodb+srv://ericbucknam:ericbucknam@320.8rfoj.mongodb.net/Employees?retryWrites=true&w=majority")
database = cluster["Employees"]
collection = database["Tiger_Microsystems-employees"]
#collec.insert_one({"id" : 45678})


@app.route("/")
def homepage():
    return "Tiger Microsystems Homepage"

@app.route("/employees", methods=["GET"])
def getList():
    listAll = list(collection.find({}))
    return json.dumps(listAll, default=json_util.default)
