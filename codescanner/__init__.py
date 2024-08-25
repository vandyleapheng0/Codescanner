from flask import (
    Flask,
    Blueprint,
    url_for,
    redirect,
    request,
    render_template,
    g,
    session,
)
from codescanner.config import Config
from flask_socketio import SocketIO, emit
import cv2, numpy as np
from codescanner.utils import process_image


app = Flask(__name__)
app.config.from_object(Config)
socketio = SocketIO(app, max_http_buffer_size=5 * 10**6)


@app.route("/")
def home():
    return render_template("index.html")


@socketio.on("msg")
def message(msg):
    print(msg)
