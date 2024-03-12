// Load the model
const modelPath = 'models/models.json'; // Specify the path to your model.json file
let model;

async function loadModel() {
  model = await tf.loadLayersModel(modelPath);
  console.log('Model loaded');
}

// Perform image preprocessing
function preprocessImage(imageElement) {
  // Assuming imageElement is an HTMLImageElement or HTMLCanvasElement
  const tensor = tf.browser
    .fromPixels(imageElement)
    .resizeNearestNeighbor([64, 64]) // Adjust to the input size of your model
    .toFloat()
    .div(tf.scalar(255))
    .expandDims();

  return tensor;
}

// Display selected image
function displaySelectedImage() {
  const inputElement = document.getElementById('image-input');
  const selectedImageElement = document.getElementById('selected-image');

  const file = inputElement.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    selectedImageElement.src = e.target.result;
  };

  reader.readAsDataURL(file);
}

// Make predictions
async function predict() {
  const imageElement = document.getElementById('selected-image');
  const predictionElement = document.getElementById('prediction');
  const trueLabelElement = document.getElementById('true-label');

  if (!model) {
    console.error('Model not loaded yet.');
    return;
  }

  // Preprocess the image
  const inputTensor = preprocessImage(imageElement);

  // Make a prediction
  const predictions = await model.predict(inputTensor).data();

  // Handle the predictions
  const predictedClassIndex = predictions.indexOf(Math.max(...predictions));
  console.log('Predicted class index:', predictedClassIndex);

  // Display the prediction result
  predictionElement.innerText = `Predicted class index: ${predictedClassIndex}`;

  // Update the true label (you may need to get this information based on your use case)
  trueLabelElement.innerText = 'True label: ???';
}

// Load the model when the page is loaded
window.onload = loadModel;
