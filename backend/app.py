import flask
import logging
import requests
from flask import Flask, request, jsonify,redirect, render_template
from flask_sqlalchemy import SQLAlchemy
import flask_cors
from flask_cors import CORS, cross_origin
import os
import sys
import json
  

app = flask.Flask(__name__)
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'
basedir = os.path.abspath(os.path.dirname(__file__))
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////'+os.path.join(basedir,'db.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['TESTING'] = True
db = SQLAlchemy(app)


class Streamer(db.Model):
    name = db.Column(db.String(80), unique=True, nullable=False)
    username = db.Column(db.String(80), unique=True, nullable=False,primary_key=True)
    title = db.Column(db.String(80),  nullable=False)
    avatar = db.Column(db.String(20),  nullable=False, default ='default.jpg')
    live = db.Column(db.Boolean(),nullable=False,default=False)

    def __init__(self,name,username,avatar,title,live):
        self.name=name
        self.username=username
        self.avatar=avatar
        self.title=title
        self.live=live


@app.route("/")
@app.route("/Home")
@app.route("/Welcome")
@app.route("/Watch")
@app.route("/Stream")
@app.route("/Login")
@app.route("/Profile")
def my_index():
    return render_template("index.html")

@app.route('/Watch/<path:id>', methods=['GET'])
def my_watch(id):
    return render_template("index.html")

@app.route("/api/login",methods=["GET"])
def login():
    token = request.args.get('token',default='',type=str)
    if token and token!='undefined':
        flask.session['token'] = token
    if not flask.session.get('token'):
        return flask.jsonify(token = False)
    
    client_id = "oop9p00sz52axcloheko9usg5gnvto"
    headers = {
        'Accept' : 'application/vnd.twitchtv.v5+json',
        'Client-ID' : client_id,
        'Authorization' : 'OAuth '+ flask.session['token'],
    }
    r_user_info = requests.get('https://api.twitch.tv/kraken/user',headers = headers)
    data = json.loads(r_user_info.text)
    
    streamer = Streamer.query.filter_by(username=data['name']).first()
    flask.session["username"] = data["name"]
    title = "Lets talk about anything!"
    if streamer:
        streamer.name=data['display_name']
        streamer.username=data['name']
        streamer.title=title
        streamer.avatar=data['logo']
        streamer.live=False
    else:
        streamer = Streamer(data['display_name'],data['name'],data['logo'],title,False)
        db.session.add(streamer)
    db.session.commit()
    return flask.jsonify(token = True)

@app.route('/api/logout', methods=['GET'])
def logout():
    streamer = Streamer.query.filter_by(username=flask.session['username']).first()
    streamer.live=False
    db.session.commit()
    flask.session.clear()
    return flask.jsonify(token = False)

@app.route("/api/streams",methods=["GET"])
def streams():
    streams = Streamer.query.filter_by(live=True).all()
    context = {
        "streams" : []
    }
    for stream in streams:
        tmp = {}
        for column in stream.__table__.columns:
            tmp[column.name] = str(getattr(stream, column.name))
        context["streams"].append(tmp)
    return flask.jsonify(**context)

@app.route("/api/stream",methods=["GET","POST"])
def stream():
    # get json file sent from front end
    if not flask.session.get('token'):
        return flask.jsonify(live = False,token=False)
    

    client_id = "oop9p00sz52axcloheko9usg5gnvto"
    headers = {
        'Accept' : 'application/vnd.twitchtv.v5+json',
        'Client-ID' : client_id,
        'Authorization' : 'OAuth '+ flask.session['token'],
    }
    r_user_info = requests.get('https://api.twitch.tv/kraken/user',headers = headers)
    data = json.loads(r_user_info.text)
    
    streamer = Streamer.query.filter_by(username=data['name']).first()

    if flask.request.method == 'POST':
        body = flask.request.get_json()
        if body['live']:  
            streamer.name=data['display_name']
            streamer.username=data['name']
            streamer.avatar=data['logo']
            streamer.live=True
        else:
            streamer.name=data['display_name']
            streamer.username=data['name']
            streamer.avatar=data['logo']
            streamer.live=False
    context={
        "live":streamer.live,
        "avatar":streamer.avatar,
        "title":streamer.title,
        "name":streamer.name,
        "username":streamer.username,
        "token":True
    }
    db.session.commit()
    return flask.jsonify(**context)



if __name__ == "__main__":
    app.run()