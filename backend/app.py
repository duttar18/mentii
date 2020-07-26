import flask
from flask import Flask, request, jsonify,redirect, render_template
from flask_sqlalchemy import SQLAlchemy
import flask_cors
from flask_cors import CORS, cross_origin
import os
  

app = flask.Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////'+os.path.join(basedir,'db.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['CORS_HEADERS'] = 'Content-Type'
db = SQLAlchemy(app)


class Streamer(db.Model):
    name = db.Column(db.String(80), unique=True, nullable=False)
    username = db.Column(db.String(80), unique=True, nullable=False,primary_key=True)
    title = db.Column(db.String(80),  nullable=False)
    avatar = db.Column(db.String(20),  nullable=False, default ='default.jpg')

    def __init__(name,username,title,avatar):
        self.name=name
        self.username=username
        self.avatar=avatar
        self.title=title


@app.route("/")
@app.route("/Home")
@app.route("/Welcome")
@app.route("/Watch")
def my_index():
    return render_template("index.html")


if __name__ == "__main__":
    app.run()