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
@app.route("/Stream")
def my_index():
    return render_template("index.html")

@app.route("/api/stream",methods=["GET","POST"])
def stream():
    # get json file sent from front end
    body = flask.request.get_json()
    print(body)
    # set token
    if  body.get('token'):
        flask.session['token'] = body['token']

    if not flask.session.get('token'):
        return flask.jsonify(
            stream = False,
            token = False
        )

    client_id = "oop9p00sz52axcloheko9usg5gnvto"
    headers = {
        'Accept' : 'application/vnd.twitchtv.v5+json',
        'Client-ID' : client_id,
        'Authorization' : 'OAuth '+ token,
    }
    r_user_info = requests.get('https://api.twitch.tv/kraken/user',headers = headers)
    data = json.loads(r_user_info.text)
    




if __name__ == "__main__":
    app.run()