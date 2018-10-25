from flask import Flask
from flask import render_template
app = Flask(__name__)

@app.route('/')
def signup():
    return render_template('signup.html')

@app.route('/confirmation')
def confirmation():
    return render_template('confirmation.html')