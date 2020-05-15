import functools
import os
from functools import wraps

import jwt
from flask import jsonify, make_response, request

from burger import app, db

SECRET_KEY = os.environ['SECRET_KEY']


def get(rule, **options):
    def decorator(view):
        @wraps(view)
        def decorated(*args, **kwargs):
            status_code, body = view(*args, **kwargs)
            return make_response(jsonify(body), status_code)

        endpoint = options.pop('endpoint', None)
        app.add_url_rule(rule, endpoint, decorated, methods=['GET'], **options)
        return view

    return decorator


def post(rule, **options):
    def decorator(view):
        @wraps(view)
        def decorated(*args, **kwargs):
            status_code, body = view(*args, **kwargs)
            return make_response(jsonify(body), status_code)

        endpoint = options.pop('endpoint', None)
        app.add_url_rule(
            rule, endpoint, decorated, methods=['POST'], **options
        )
        return view

    return decorator


def login_required(method):
    @functools.wraps(method)
    def wrapper():
        header = request.headers.get('Authorization')
        _, token = header.split()
        try:
            decoded = jwt.decode(token, SECRET_KEY, algorithms='HS256')
        except jwt.DecodeError:
            return 400, dict(message='Token is not valid.')
        except jwt.ExpiredSignatureError:
            return 400, dict(message='Token is expired.')
        email = decoded['email']
        if db.users.find({'email': email}).count() == 0:
            return 400, dict(message='User not found')
        user = db.users.find_one({'email': email})
        return method(user)

    return wrapper
