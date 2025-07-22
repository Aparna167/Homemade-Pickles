from flask import Flask, render_template, request, redirect, send_from_directory
from flask_sqlalchemy import SQLAlchemy
import os
app = Flask(__name__, template_folder='.')


app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///picklenest.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


class Contact(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(100))
    message = db.Column(db.Text)

class CartOrder(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    items = db.Column(db.String(300))
    address = db.Column(db.String(200))

class UserLogin(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100))
    password = db.Column(db.String(100))


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
        new_order = CartOrder(name=name, items=items, address=address)
        db.session.add(new_order)
        db.session.commit()
        return redirect('/thankyou')
    return render_template('cart.html')

@app.route('/contact', methods=["GET", "POST"])
def contact():
    if request.method == "POST":
        name = request.form['name']
        email = request.form['email']
        message = request.form['message']
        new_contact = Contact(name=name, email=email, message=message)
        db.session.add(new_contact)
        db.session.commit()
        return redirect('/thankyou')
    return render_template('contact.html')

@app.route('/orders')
def orders():
    return render_template('orders.html')

@app.route('/login', methods=["GET", "POST"])
def login():
    if request.method == "POST":
        username = request.form['username']
        password = request.form['password']
        new_user = UserLogin(username=username, password=password)
        db.session.add(new_user)
        db.session.commit()
        return redirect('/home')
    return render_template('login.html')

@app.route('/thankyou')
def thankyou():
    return render_template('thankyou.html')

# Serve static files (CSS, images, JS, etc.)
@app.route('/<path:filename>')
def static_files(filename):
    return send_from_directory('.', filename)


if __name__ == '__main__':
    with app.app_context():
        db.create_all()  
    app.run(debug=True)
