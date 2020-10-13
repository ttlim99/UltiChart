from flask import Flask, request, jsonify
import pymongo
from pymongo import MongoClient
import json 
from bson import json_util
 # Mac: export FLASK_APP=app.py flask run
 # To keep it in dev mode continuously: export FLASK_APP=app.py FLASK_ENV=development
 # Talking Points for Presentation: 1. Close closest cluster for lowest latency 2. Chose PyMongo over MongoEngine -- why? 3. Demo Login
 # Talking Points for Presentation: 1. Use closest cluster for lowest latency 2. Chose PyMongo over MongoEngine -- why? 3. Demo Login
 # Notes: 3.7.6 but using Python 3.4 or later -- why?

 # cluster_320 = MongoClient("mongodb://cc320:cc320@320-shard-00-00.8rfoj.mongodb.net:27017,320-shard-00-01.8rfoj.mongodb.net:27017,320-shard-00-02.8rfoj.mongodb.net:27017/320?ssl=true&replicaSet=atlas-mkdts8-shard-0&authSource=admin&retryWrites=true&w=majority")

cluster = MongoClient("mongodb+srv://cc320:cc320@320.8rfoj.mongodb.net/Employees?retryWrites=true&w=majority")
db = cluster["Employees"]
collection = db["collection"]
collection = db["Tiger_Microsystems-employees"]

app = Flask(__name__)

@app.route("/details/<email>", methods=["GET"])
def get_employees(email):
     """Find employee object with given email and retrieve empID. Get all employees where managerId == empId."""
     direct_reports = []
     current_emp = collection.find_one({"email": email})
     all_employees = collection.find({"managerId": current_emp["employeeId"]})

     for employee in all_employees:
         direct_reports.append({"firstName": employee["firstName"], "lastName": employee["lastName"]})

     return jsonify({"employeeId": current_emp["employeeId"], "directReports": direct_reports})

"""Get the data from the Mongo Server."""
all_employees = list(collection.find({}))

# Should load all the data into Postman.
@app.route("/employees", methods=["GET"])
def get_all_employees():
    return json.dumps(all_employees, default=json_util.default)

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

# Add json data via Postman to server. Also adds data directly to the MongoDB.
@app.route("/hire", methods=["POST"])
def get_json_employees():
    """If the data is in json format do."""
    if request.is_json:
        """Get the json data from Postman."""
        employees = request.get_json()
        """Append the json data to the server."""
        all_employees.append(employees)
        """Add the data directly to the MongoDB."""
        collection.insert_one(employees);
        """Return an id on postman that is the index of where the object is stored."""
        return {'id': len(all_employees)}, 200
    """If the data is not in json format."""
    else:
        """Flash a message to the frontend, telling them the problem."""
        flash('data is not in json format')
        """Return error 400."""
        return render_template('error.html'), 400