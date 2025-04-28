from flask import Flask, request, jsonify
import pickle
import pandas as pd

app = Flask(__name__)

# Load the trained pipeline
import joblib
model_pipeline = joblib.load('egfr_model.pkl')


@app.route('/')
def home():
    return "Lung Cancer Drug's IC50 Prediction Service"

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()

        required_fields = ['MW', 'LogP', 'NumHDonors', 'NumHAcceptors']
        if not all(field in data for field in required_fields):
            return jsonify({'error': f"Missing one of the required fields: {required_fields}"}), 400

        input_df = pd.DataFrame([{
            'MW': float(data['MW']),
            'LogP': float(data['LogP']),
            'NumHDonors': float(data['NumHDonors']),
            'NumHAcceptors': float(data['NumHAcceptors']),
        }])

        prediction = model_pipeline.predict(input_df)[0]

        return jsonify({'predicted_pIC50': float(prediction)})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ✅ Run server safely
if __name__ == '__main__':
    app.run(debug=True, use_reloader=False)
