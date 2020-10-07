from flask import Flask
from flask import jsonify
import pymongo
from pymongo import MongoClient
import json
from bson import json_util
# Mac: export FLASK_APP=app.py flask run
# To keep it in dev mode continuously: export FLASK_APP=app.py FLASK_ENV=development
# Talking Points for Presentation: 1. Use closest cluster for lowest latency 2. Chose PyMongo over MongoEngine -- why? 3. Demo Login
# Notes: 3.7.6 but using Python 3.4 or later -- why?

cluster_320 = MongoClient("mongodb://cc320:cc320@320-shard-00-00.8rfoj.mongodb.net:27017,320-shard-00-01.8rfoj.mongodb.net:27017,320-shard-00-02.8rfoj.mongodb.net:27017/320?ssl=true&replicaSet=atlas-mkdts8-shard-0&authSource=admin&retryWrites=true&w=majority")

db = cluster_320["Employees"]
collection = db["Tiger_Microsystems-employees"]

app = Flask(__name__)

@app.route("/details/<email>", methods=["GET"])
def get_employees(email):
    """Find employee object with given email and retrieve empID. Get all employees where managerId == empId.
    Returns empId and direct reports of employee we are looking at.
    Args: email of employee
    Note: Direct reports are defined as an employee who has the current empId as managerId.
    """

    direct_reports = []
    current_emp = collection.find_one({"email": email})
    all_employees = collection.find({"managerId": current_emp["employeeId"]})

    for employee in all_employees:
        direct_reports.append({"firstName": employee["firstName"], "lastName": employee["lastName"]})
    
    return jsonify({"employeeId": current_emp["employeeId"], "directReports": direct_reports})