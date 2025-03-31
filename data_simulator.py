from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/api/emission-data', methods=['GET'])
def get_emission_data():
    data = {
        "fuelEmissions": [
            {"type": "Diesel", "amount": 10, "co2": 26.4},
            {"type": "Petrol", "amount": 8, "co2": 18.6}
        ],
        "electricityEmissions": {"consumption": 50, "co2": 40},
        "sensorData": {"co2": 72, "co": 5, "pm25": 45}
    }
    return jsonify(data)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
