from flask import Flask, request, jsonify
import pymongo
from pymongo import MongoClient
import json
from bson import json_util
# Mac: export FLASK_APP=app.py flask run
# To keep it in dev mode continuously: export FLASK_APP=app.py FLASK_ENV=development
# Talking Points for Presentation: 1. Use closest cluster for lowest latency 2. Chose PyMongo over MongoEngine -- why? 3. Demo Login
# Notes: 3.7.6 but using Python 3.4 or later -- why?

# Change connection string depending on your python version. 
cluster_320 =  MongoClient("mongodb://cc320:cc320@320-shard-00-00.8rfoj.mongodb.net:27017,320-shard-00-01.8rfoj.mongodb.net:27017,320-shard-00-02.8rfoj.mongodb.net:27017/320?ssl=true&replicaSet=atlas-mkdts8-shard-0&authSource=admin&retryWrites=true&w=majority")
db = cluster_320["Employees"]
collection = db["Tiger_Microsystems-employees"]

app = Flask(__name__)

# Should load all the data into Postman.
@app.route("/employees", methods=["GET"])
def get_all_employees():
    all_employees = list(collection.find({}))
    return json.dumps(all_employees, default=json_util.default)

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
        direct_reports.append({"firstName": employee["firstName"], "lastName": employee["lastName"], "employeeID": employee["employeeId"], "managerID": employee["managerId"]})
    
    return jsonify({"employeeId": current_emp["employeeId"], "directReports": direct_reports})

# Get the data from the Mongo Server.

# Input data in json format...

# firstName       String
# lastName        String
# companyId       Integer
# password        String      // Don't need yet. Or do we...
# positionTitle   String
# companyName     String
# isManager       Boolean     // False if checked "employee" on form, else true.
# employeeId      Integer
# managerId       Integer
# email           String
# startDate       String

# Add json data via Postman to server. 
@app.route("/hire", methods=["POST"])
def get_json_employees():
    all_employees = list(collection.find({}))
    if request.is_json:
        # Get the data that is being added.
        employees = request.get_json()
        # Append the json data to the database.
        all_employees.append(employees)
        # Inserts to the database.
        collection.insert_one(employees);
        return {'id': len(all_employees)}, 200
    # The user did not enter json format.
    else:
        # The frontend will be notified of the error.
        flash('data is not in json format')
        # Return error 400.
        return render_template('error.html'), 400
