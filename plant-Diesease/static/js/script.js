document.addEventListener('DOMContentLoaded', function() {
    const uploadForm = document.getElementById('uploadForm');
    const plantImage = document.getElementById('plantImage');
    const fileNameDisplay = document.getElementById('fileNameDisplay');
    const imagePreview = document.getElementById('imagePreview');
    const results = document.getElementById('results');
    const loading = document.getElementById('loading');
    const resultImage = document.getElementById('resultImage');
    const diseaseName = document.getElementById('diseaseName');
    const confidence = document.getElementById('confidence');
    const diseaseDescription = document.getElementById('diseaseDescription');
    const treatment = document.getElementById('treatment');

    // Display file name when file is selected
    plantImage.addEventListener('change', function() {
        if (this.files && this.files[0]) {
            fileNameDisplay.textContent = this.files[0].name;
            
            // Preview the image
            const reader = new FileReader();
            reader.onload = function(e) {
                imagePreview.src = e.target.result;
                imagePreview.style.display = 'block';
            }
            reader.readAsDataURL(this.files[0]);
        } else {
            fileNameDisplay.textContent = 'No file chosen';
            imagePreview.style.display = 'none';
        }
    });

    // Handle form submission
    uploadForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate file input
        if (!plantImage.files || !plantImage.files[0]) {
            alert('Please select an image to upload.');
            return;
        }
        
        // Show loading spinner
        loading.style.display = 'flex';
        results.style.display = 'none';
        
        // Create form data
        const formData = new FormData();
        formData.append('plant_image', plantImage.files[0]);
        
        // Send AJAX request
        fetch('/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Hide loading spinner
            loading.style.display = 'none';
            
            // Display results
            resultImage.src = '/' + data.image_url;
            diseaseName.textContent = data.disease;
            confidence.textContent = data.confidence;
            diseaseDescription.textContent = data.description;
            treatment.textContent = data.treatment;
            
            results.style.display = 'block';
            
            // Scroll to results
            results.scrollIntoView({ behavior: 'smooth' });
        })
        .catch(error => {
            console.error('Error:', error);
            loading.style.display = 'none';
            alert('An error occurred while processing your request. Please try again.');
        });
    });
});