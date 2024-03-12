// // Define the class names
// const class_names = ['airplane', 'automobile', 'bird', 'cat', 'deer', 'dog', 'frog', 'horse', 'ship', 'truck'];

// // Function to load the model and classify the image
// async function loadModelAndClassify() {
//   // Load the model from server
//   const model = await tf.loadLayersModel('models/model.json');

//   // Get the HTML elements
//   const image_input = document.getElementById('image-input');
//   const classify_button = document.getElementById('classify-button');
//   const selected_image = document.getElementById('selected-image');
//   const prediction = document.getElementById('prediction');
//   const true_label = document.getElementById('true-label');

//   // Function to classify the image
//   async function classifyImage() {
//     // Rest of your code for image classification...
//     // Read the image file as a data URL
//     const reader = new FileReader();
//     reader.readAsDataURL(image_input.files[0]);
//     reader.onload = async function () {
//       // Set the image source to the data URL
//       selected_image.src = reader.result;
//       // Wait for the image to load
//       selected_image.onload = async function () {
//         // Resize the image to 32x32 pixels
//         const image = tf.browser.fromPixels(selected_image).resizeNearestNeighbor([32, 32]);
//         // Normalize the image to values between 0 and 1
//         const normalized_image = image.toFloat().div(tf.scalar(255));
//         // Add a batch dimension to the image
//         const batched_image = normalized_image.expandDims(0);
//         // Predict the class probabilities for the image
//         const predictions = model.predict(batched_image);
//         // Get the index of the class with the highest probability
//         const predicted_class = tf.argMax(predictions, 1).dataSync()[0];
//         // Get the name of the predicted class
//         const predicted_class_name = class_names[predicted_class];
//         // Display the prediction
//         prediction.innerHTML = 'Ini adalah: ' + predicted_class_name;
//         // If the image file name contains the true class, display it
//         const file_name = image_input.files[0].name;
//         const true_class = file_name.split('_')[0];
//         if (class_names.includes(true_class)) {
//           true_label.innerHTML = 'True class: ' + true_class;
//         } else {
//           true_label.innerHTML = '';
//         }
//       };
//     };
//   }

//   // Add a click event listener to the classify button
//   classify_button.addEventListener('click', classifyImage);
// }

// // Call the function to load the model and start the classification process
// loadModelAndClassify();

// Define the class names for CIFAR-100
const class_names = [
  'berang-berang',
  'lumba-lumba',
  'berang-berang',
  'anjing laut',
  'paus',
  'ikan akuarium',
  'ikan pipih',
  'pari',
  'hiu',
  'ikan trout',
  'anggrek',
  'bunga poppy',
  'mawar',
  'bunga matahari',
  'tulip',
  'botol',
  'mangkuk',
  'kaleng',
  'cangkir',
  'piring',
  'apel',
  'jamur',
  'jeruk',
  'pir',
  'paprika',
  'jam',
  'keyboard komputer',
  'lampu',
  'telepon',
  'televisi',
  'tempat tidur',
  'kursi',
  'sofa',
  'meja',
  'lemari',
  'lebah',
  'kumbang',
  'kupu-kupu',
  'ulat',
  'kecoa',
  'beruang',
  'macan tutul',
  'singa',
  'harimau',
  'serigala',
  'jembatan',
  'kastil',
  'rumah',
  'jalan',
  'gedung pencakar langit',
  'awan',
  'hutan',
  'gunung',
  'dataran',
  'laut',
  'unta',
  'sapi',
  'simpanse',
  'gajah',
  'kanguru',
  'rubah',
  'landak',
  'tupai',
  'rakun',
  'sigung',
  'kepiting',
  'lobster',
  'siput',
  'laba-laba',
  'cacing',
  'bayi',
  'anak laki-laki',
  'anak perempuan',
  'pria',
  'wanita',
  'buaya',
  'dinosaurus',
  'kadal',
  'ular',
  'kura-kura',
  'hamster',
  'tikus',
  'kelinci',
  'tikus',
  'tupai',
  'maple',
  'oak',
  'palem',
  'pinus',
  'willow',
  'sepeda',
  'bus',
  'sepeda motor',
  'truk pikap',
  'kereta api',
  'mesin pemotong rumput',
  'roket',
  'trem',
  'tangki',
  'traktor',
];

// Function to load the model and classify the image
async function loadModelAndClassify() {
  // Load the model from server
  const model = await tf.loadLayersModel('model/model100.json');

  // Get HTML elements
  const image_input = document.getElementById('image-input');
  const classify_button = document.getElementById('classify-button');
  const selected_image = document.getElementById('selected-image');
  const prediction = document.getElementById('prediction');

  // Function to classify the image
  async function classifyImage() {
    // Read the image file as a data URL
    const reader = new FileReader();
    reader.readAsDataURL(image_input.files[0]);

    reader.onload = async function () {
      // Set the image source to the data URL
      selected_image.src = reader.result;

      // Wait for the image to load
      selected_image.onload = async function () {
        // Resize the image to the input size of the model
        const image = tf.browser.fromPixels(selected_image).resizeNearestNeighbor([32, 32]);

        // Normalize the image to values between 0 and 1
        const normalized_image = image.toFloat().div(tf.scalar(255));

        // Add a batch dimension to the image
        const batched_image = normalized_image.expandDims(0);

        // Predict the class probabilities for the image
        const predictions = model.predict(batched_image);

        // Get the index of the class with the highest probability
        const predicted_class = tf.argMax(predictions, 1).dataSync()[0];

        // Get the name of the predicted class
        const predicted_class_name = class_names[predicted_class];

        // Display the prediction
        prediction.innerHTML = 'Predicted class: ' + predicted_class_name;
      };
    };
  }

  // Add a click event listener to the classify button
  classify_button.addEventListener('click', classifyImage);
}

// Call the function to load the model and start the classification process
loadModelAndClassify();
