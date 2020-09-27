from flask import Flask, request, jsonify
import db
import json
app = Flask(__name__)

class Employee(db.Document):
    firstName = db.StringField()
    lastName = db.StringField()
    companyID = db.IntField()
    password = db.StringField()
    positionTitle = db.StringField()
    companyName = db.StringField()
    isManager = db.BooleanField()
    employeeID = db.IntField()
    managerID = db.IntField()
    email = db.EmailField()
    startDate = db.StringField()
    def to_json(self):
        return {"firstName": self.firstName,
                "lastName": self.lastName,
                "companyID": self.companyID,
                "password": self.password,
                "positionTitle": self.positionTitle,
                "companyName": self.companyName,
                "isManager": self.isManager,
                "employeeID": self.employeeID,
                "managerID": self.managerID,
                "email": self.email,
                "startDate": self.startDate}

@app.route('/')
def flask_mongodb_atlas():
    return "flask mongodb atlas!"
@app.route('/test')

def test():
    db.db.collection.insert_one({"name": "John"})
    return "Connected to the data base!"


@app.route('/', methods=['PUT'])
def hire():
    record = json.loads(request.data)
    employee = Employee(firstName=record['firstName'],
                lastName=record['lastName'],
                companyID = record['companyID'],
                password = record['password'],
                positionTitle = record['positionTitle'],
                companyName = record['companyName'],
                isManager = record['isManager'],
                employeeID = record['employeeID'],
                managerId = record['managerID'],
                email = record['email'],
                startDate = record['startDate'])
    employee.save()
    return jsonify(employee.to_json())

if __name__ == '__main__':
    app.run(port=8000)

#test to insert data to the data base
