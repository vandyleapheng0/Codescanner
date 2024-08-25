from codescanner import app, socketio

if __name__ == "__main__":
    ssl_context = ("./cert/localhost.pem", "./cert/localhost-key.pem")
    socketio.run(
        app,
        host="0.0.0.0",
        port=5000,
        debug=True,
        ssl_context=ssl_context,
    )
