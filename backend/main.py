from flask import Flask, request, jsonify
import pymongo
from pymongo import MongoClient
import json
from bson import json_util

cluster = MongoClient("mongodb+srv://cc320:cc320@320.8rfoj.mongodb.net/Employees?retryWrites=true&w=majority")

db = cluster["Employees"]
collection = db["Tiger_Microsystems-employees"]

app = Flask(__name__)

# Get the data from the Mongo Server.

all_employees = list(collection.find({}))

# Should load all the data into Postman.
@app.route("/employees", methods=["GET"])
def get_employees():
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

# Add json data via Postman to server. 
@app.route("/hire", methods=["POST"])
def get_json_employees():
    # If the user entered json format data, then accept it
    if request.is_json:
        # Get the data that is being added.
        employees = request.get_json()
        # Append the json data to the database.
        all_employees.append(employees)
        # This returns the id of added employee I believe.
        return {'id': len(all_employees)}, 200
    # The user did not enter json format.
    else:
        # The frontend will be notified of the error.
        flash('data is not in json format')
        # Return error 400.
        return render_template('error.html'), 400


    
