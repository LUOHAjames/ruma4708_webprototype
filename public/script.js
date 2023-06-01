const trainingForm = document.getElementById('trainingForm');
const trainingList = document.getElementById('trainingList');
const feedback = document.getElementById('feedback');
const imageContainer = document.getElementById('imageContainer');
const calorieCount = document.getElementById('calorieCount');

// Event listener for form submission
trainingForm.addEventListener('submit', function(event) {
  event.preventDefault();

  // Get input values from the form
  const trainingType = document.getElementById('trainingType').value;
  const totalShots = parseInt(document.getElementById('totalShots').value);
  const madeShots = parseInt(document.getElementById('madeShots').value);
  const targetTime = parseFloat(document.getElementById('targetTime').value);
  const actualTime = parseFloat(document.getElementById('actualTime').value);
  const remarks = document.getElementById('remarks').value;

  // Calculate shooting percentage
  const shootingPercentage = (madeShots / totalShots) * 100;

  // Generate feedback based on shooting percentage and actual training time
  // Each time feedback will be recorded into history
  let feedbackText = '';
  if (shootingPercentage > 50) {
    feedbackText = 'You were on fire today!';
  } else if (shootingPercentage < 20) {
    feedbackText = "It's okay, keep practicing!";
  }

  if (actualTime >= targetTime) {
    feedbackText += ' You achieved your training goal!';
  } else {
    feedbackText += ' Keep going, don\'t stop!';
  }

  // Display feedback to the user
  feedback.textContent = feedbackText;

  // Create a new training entry
  const trainingEntry = {
    trainingType,
    totalShots,
    madeShots,
    targetTime,
    actualTime,
    remarks
  };

  // Save the training entry to local storage
  const trainingHistory = JSON.parse(localStorage.getItem('trainingHistory')) || [];
  trainingHistory.push(trainingEntry);
  localStorage.setItem('trainingHistory', JSON.stringify(trainingHistory));

  // Clear the form
  trainingForm.reset();

  // Update the training history list
  updateTrainingHistory();

  // Fetch related image using Unsplash API
  fetchImage(trainingType);

  // Calculate and display calorie count using Nutritionix API
  calculateCalories(trainingType, totalShots);
});

// Function to update the training history list
function updateTrainingHistory() {
  trainingList.innerHTML = '';

  // Retrieve the training history from local storage
  const trainingHistory = JSON.parse(localStorage.getItem('trainingHistory')) || [];

  // Loop through the training history and add each entry to the list
  trainingHistory.forEach((entry, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = `Training ${index + 1}: ${entry.trainingType} - ${entry.totalShots} shots`;
    trainingList.appendChild(listItem);
  });
}

// Function to fetch related image using Unsplash API
fetch("https://api.unsplash.com/photos/random?query=" + trainingType + "&client_id=WtTns6uD3X6mQwxAj0U6Zk3wjRebVfJH-IYUNHdMl2M")
  .then((response) => response.json())
  .then((data) => {
    const imageUrl = data.urls.regular;
    const imageAlt = data.alt_description;
const trainingImage = document.getElementById("training-image");
trainingImage.src = imageUrl;
trainingImage.alt = imageAlt;
})
.catch((error) => {
console.log("Error fetching image from Unsplash API:", error);
});

// Function to display the fetched image
function displayImage(imageUrl) {
  imageContainer.innerHTML = `<img src="${imageUrl}" alt="Training Image">`;
}
