import os
from flask import Flask, redirect, url_for, render_template, request
from flask_frozen import Freezer

app = Flask(__name__)

app.config['FREEZER_DESTINATION'] = 'dist'
app.config['FREEZER_RELATIVE_URLS'] = True
app.config['FREEZER_REDIRECT_POLICY'] = 'follow'


freezer = Freezer(app)


@app.route('/')
def index():
    return "hi"

@app.route('/sports/<path:sport>')
def sports(sport):
    sports = [
        "football", "afl", "basketball", "tennis", "iceskating",
        "bowling", "netball", "cricket", "volleyball", "hockey"
    ]

    if sport.replace(".html", "") in sports:
        return render_template('sport-page.html', sport=sport.replace(".html", "").capitalize())

    return render_template('sports.html')


@freezer.register_generator
def sports_generator():
    sports = [
        "index", "football", "afl", "basketball", "tennis", "iceskating",
        "bowling", "netball", "cricket", "volleyball", "hockey"
    ]

    for sport in sports:
        yield 'sports', {'sport': sport+".html"}


@app.route('/about/')
def about():
    return render_template('about.html', title="About Us")

if __name__ == '__main__':
    freezer.freeze()
