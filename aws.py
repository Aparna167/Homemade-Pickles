from flask import Flask, render_template, request, redirect, send_from_directory
import boto3
from boto3.dynamodb.conditions import Attr
from datetime import datetime
import uuid
import os
AWS_REGION = 'us-east-1'
USERS_TABLE = 'Users'
SERVICES_TABLE = 'Services'
SNS_TOPIC_ARN = 'arn:aws:sns:ap-south-1:765432198765:PicklesOrderNotifications'

app = Flask(__name__, template_folder='.')
dynamodb = boto3.resource('dynamodb', region_name='ap-south-1')
users_table = dynamodb.Table('Users')
services_table = dynamodb.Table('Services')


@app.route('/')
def home():
    return render_template('home.html')

@app.route('/shop')
def shop():
    return render_template('shop.html')

@app.route('/cart', methods=["GET", "POST"])
def cart():
    if request.method == "POST":
        name = request.form['name']
        items = request.form['items']
        address = request.form['address']

        services_table.put_item(Item={
            'id': str(uuid.uuid4()),
            'type': 'order',
            'name': name,
            'items': items,
            'address': address,
            'timestamp': datetime.utcnow().isoformat()
        })
        return redirect('/thankyou')
    return render_template('cart.html')

@app.route('/contact', methods=["GET", "POST"])
def contact():
    if request.method == "POST":
        name = request.form['name']
        email = request.form['email']
        message = request.form['message']

        users_table.put_item(Item={
            'id': str(uuid.uuid4()),
            'type': 'contact',
            'name': name,
            'email': email,
            'message': message,
            'timestamp': datetime.utcnow().isoformat()
        })
        return redirect('/thankyou')
    return render_template('contact.html')

@app.route('/orders')
def orders():
    response = services_table.scan(
        FilterExpression=Attr('type').eq('order')
    )
    orders = response.get('Items', [])
    return render_template('orders.html', orders=orders)

@app.route('/login', methods=["GET", "POST"])
def login():
    if request.method == "POST":
        username = request.form['username']
        password = request.form['password']

        users_table.put_item(Item={
            'id': str(uuid.uuid4()),
            'type': 'login',
            'username': username,
            'password': password,
            'timestamp': datetime.utcnow().isoformat()
        })
        return redirect('/home')
    return render_template('login.html')

@app.route('/thankyou')
def thankyou():
    return render_template('thankyou.html')

@app.route('/<path:filename>')
def static_files(filename):
    return send_from_directory('.', filename)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)