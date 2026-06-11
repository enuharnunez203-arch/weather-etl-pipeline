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
    if not city:
        return jsonify({'error': 'Missing city parameter'}), 400

    api_key = os.getenv('API_KEY')
    if not api_key:
        return jsonify({'error': 'API key not configured'}), 500

    url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric&lang=en"
    response = requests.get(url)
    data = response.json()

    if data.get('cod') != 200:
        return jsonify({'error': data.get('message', 'City not found')}), 404

    fetched_data = {
        'city': data.get('name'),
        'temperature': data['main']['temp'],
        'description': data['weather'][0]['description'],
        'icon': data['weather'][0]['icon']
    }
    return jsonify(fetched_data)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)