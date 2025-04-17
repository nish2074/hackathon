# app.py - Main Flask application
from flask import Flask, render_template, request, jsonify
import os
from flask_cors import CORS
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input
import cv2
import json

app = Flask(__name__)
CORS(app)  
app.config['UPLOAD_FOLDER'] = 'static/uploads'
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# Load the pre-trained model (placeholder - you'll need a real trained model)
# model = load_model('plant_disease_model.h5')

# Disease information database
with open('disease_info.json', 'r') as f:
    disease_info = json.load(f)

# Disease classes (example)
disease_classes = [
    'healthy',
    'leaf_blight',
    'powdery_mildew',
    'leaf_spot',
    'rust'
]

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'plant_image' not in request.files:
        return jsonify({'error': 'No file part'})
    
    file = request.files['plant_image']
    if file.filename == '':
        return jsonify({'error': 'No selected file'})
    
    if file:
        filename = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(filename)
        
        # For demo purposes, we'll use a mock prediction
        # In a real system, you would use your trained model
        prediction = mock_predict(filename)
        
        disease_id = disease_classes[prediction]
        result = {
            'image_url': filename,
            'disease': disease_info[disease_id]['name'],
            'confidence': f"{np.random.uniform(0.7, 0.99):.2f}",
            'description': disease_info[disease_id]['description'],
            'treatment': disease_info[disease_id]['treatment']
        }
        
        return jsonify(result)

def mock_predict(img_path):
    """Mock prediction function for demonstration purposes"""
    # In a real system, you would use your trained model:
    # img = image.load_img(img_path, target_size=(224, 224))
    # img_array = image.img_to_array(img)
    # img_array = np.expand_dims(img_array, axis=0)
    # img_array = preprocess_input(img_array)
    # prediction = model.predict(img_array)
    # predicted_class = np.argmax(prediction, axis=1)[0]
    
    # For demonstration, return a random class
    return np.random.randint(0, len(disease_classes))

if __name__ == '__main__':
    app.run(debug=True)