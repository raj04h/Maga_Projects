from flask import Flask, request, jsonify
import joblib
import pandas as pd

app = Flask(__name__)

# Load the trained model
with open(r"D:\CS_code\Maga_Projects\Drug_efficiency\ml_liver.pkl", "rb") as model_file:
    model = joblib.load(model_file)

@app.route("/")
def home():
    return "Liver Disease Prediction Service"

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json() or request.form

        # Check and extract all required fields
        required_fields = [
            "Total Bilirubin",
            " Alkphos Alkaline Phosphotase",  # note the leading space!
            "Sgot Aspartate Aminotransferase",
            "Total Protiens",
            "Albumin",
            "A/G Ratio Albumin and Globulin Ratio"
        ]

        input_data = {}
        for field in required_fields:
            if field not in data or data[field] in [None, ""]:
                return jsonify({"error": f"Missing or null value for: '{field}'"}), 400
            input_data[field] = float(data[field])

        # Create input DataFrame
        input_df = pd.DataFrame([input_data])

        # Make prediction
        pred = model.predict(input_df)[0]
        result = "The patient is likely to have liver disease." if pred == 1 else "The patient is likely to be healthy."

        return jsonify({"prediction": result})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True)