from flask import Flask, jsonify, request
import requests
import os

app = Flask(__name__, static_folder='..', static_url_path='')

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/weather')
def weather():
    city = request.args.get('city')
    lat = request.args.get('lat')
    lon = request.args.get('lon')
    api_key = os.getenv('API_KEY')

    if not api_key:
        return jsonify({'error': 'API key not configured'}), 500

    if lat and lon:
        url = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={api_key}&units=metric&lang=en"
    elif city:
        url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric&lang=en"
    else:
        return jsonify({'error': 'Missing city or coordinates'}), 400

    try:
        response = requests.get(url)
        data = response.json()
        return jsonify(data)
    except Exception as e:
        return jsonify({'error': 'Failed to fetch weather data'}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)