import flask 
from flask_sqlalchemy import SQLAlchemy


app = flask.Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))


app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////'+os.path.join(basedir,'db.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


class Streamer(db.Model):
    name = db.Column(db.String(80), unique=True, nullable=False)
    username = db.Column(db.String(80), unique=True, nullable=False)
    title = db.Column(db.String(80),  nullable=False)
    avatar = db.Column(db.String(20),  nullable=False, default ='default.jpg')

    def __repr__(self):
        return '<User %r>' % self.username

@app.route("/")
@app.route("/Home")
@app.route("/Welcome")
@app.route("/Watch")
def my_index():
    return render_template("index.html")


app.run(debug=True)