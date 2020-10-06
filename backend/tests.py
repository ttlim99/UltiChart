from flask import Flask
app = Flask(__name__)
# Mac: export FLASK_APP=app.py flask run
# To keep it in dev mode continuously: export FLASK_APP=app.py FLASK_ENV=development
# Talking Points: 1. Close closest cluster for lowest latency
# Notes: 3.7.6 but using Python 3.4 or later -- why?


@app.route("/") #root is "/"
def hello():   
    return "Hello All"

@app.route("/tamil")
def tamil():
    return "yanakkam"

@app.route("/name/<name>")
def hello_name(name):
    return f"vannakam {name}!"

"""@app.route("/add", methods=["POST"])
def add_employees():
	request_payload = request.json # if the key doesn't exist, return None
	employee = request_payload['employee']
	existing_employee = collection.find({"_id":employee["email"]})

	if existing_employee:
		for employee in existing_employee:

post_1 = {
    "firstName": "John",
    "lastName": "Cena",
    "companyId": 2,
    "password": "whitneymi",
    "positionTitle": "Engineering Manager",
    "companyName": "Tiger Microsystems",
    "isManager": True,
    "employeeId": 5,
    "managerId": 2,
    "email": "Mickey_Whitney@tigermicrosystems.com",
    "startDate": "2015-03-07"}

post_2 = {
    "firstName": "Cantus",
    "lastName": "Seemus",
    "companyId": 2,
    "password": "whitneymi",
    "positionTitle": "Engineering Manager",
    "companyName": "Tiger Microsystems",
    "isManager": True,
    "employeeId": 6,
    "managerId": 2,
    "email": "Mickey_Whitney@tigermicrosystems.com",
    "startDate": "2015-03-07"}

collection.insert_many([post_1, post_2])"""
