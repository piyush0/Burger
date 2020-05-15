import os

from flask import Flask
from pymongo import MongoClient

app = Flask('burger')

DATABASE_URI = os.environ['DATABASE_URI']
client = MongoClient(DATABASE_URI)
db = client.burger

from burger import views  # isort:skip # NOQA
