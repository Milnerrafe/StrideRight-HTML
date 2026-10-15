import os
from flask import Flask, render_template
from flask_frozen import Freezer

app = Flask(__name__)

app.config['FREEZER_DESTINATION'] = 'dist'
app.config['FREEZER_RELATIVE_URLS'] = True

freezer = Freezer(app)


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/about/')
def about():
    return render_template('about.html', title="About Us")

if __name__ == '__main__':
    freezer.freeze()
