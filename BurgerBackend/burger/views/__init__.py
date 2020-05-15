import datetime
import os
import re

import jwt
from flask import request
from werkzeug.security import check_password_hash, generate_password_hash

from burger import app, db
from burger.views.utils import get, login_required, post

SECRET_KEY = os.environ['SECRET_KEY']


@get('/')
def base():
    return 200, dict(greeting="Welcome to burger")


@get('/healthcheck')
def health_check():
    return 200, dict(greeting="I'm healthy!!!")


@app.errorhandler(401)
def json_401(_):
    return 401, dict(error='Wrong creds!')


@app.errorhandler(404)
def json_404(_):
    return 404, dict(error='Nothing to see here')


@get('/ingredients')
def get_ingredients():
    return 200, dict(bacon=1.9, cheese=1.3, meat=1.7, salad=0.5)


@post('/signup')
def sign_up():
    email = request.json['email']
    password = request.json['password']

    if not re.match(
        r'^[A-Za-z0-9\.\+_-]+@[A-Za-z0-9\._-]+\.[a-zA-Z]*$', email
    ):
        return 400, dict(error='email is not valid.')
    if len(password) < 6:
        return 400, dict(error='password is too short.')

    if db.users.find({'email': email}).count() != 0:
        return 400, dict(error='Email already exists')

    db.users.insert_one(
        {'email': email, 'password': generate_password_hash(password)}
    )
    exp = datetime.datetime.utcnow() + datetime.timedelta(hours=1)
    encoded = jwt.encode(
        {'email': email, 'exp': exp}, SECRET_KEY, algorithm='HS256'
    )
    return 200, dict({'email': email, 'token': encoded.decode('utf-8')})


@post('/login')
def login():
    email = request.json['email']
    password = request.json['password']

    user = db.users.find_one({'email': email})
    if not user:
        return 400, dict(error='User not found')
    if not check_password_hash(user['password'], password):
        return 400, dict(error='Incorrect password')
    exp = datetime.datetime.utcnow() + datetime.timedelta(hours=1)
    encoded = jwt.encode(
        {'email': email, 'exp': exp}, SECRET_KEY, algorithm='HS256'
    )
    return {'email': email, 'token': encoded.decode('utf-8')}


@post('/order')
@login_required
def create_order(user):
    orders = db.orders
    result = orders.insert_one(request.get_json())

    return 200, dict(id=result.inserted_id.__str__())


@get('/orders')
@login_required
def get_orders(user):
    orders = db.orders.find({"userId": user['_id'].__str__()})

    return 200, dict(message=orders)  # TODO: transform this
