let points = 0;
let firstNumber, secondNumber, correctAnswer;
let canSubmit = true; // Prevent multiple submits

// Function to generate a new random multiplication question
function generateQuestion() {
  firstNumber = Math.floor(Math.random() * 10) + 1; // Random number between 1 and 10
  secondNumber = Math.floor(Math.random() * 10) + 1;
  correctAnswer = firstNumber * secondNumber;
  document.getElementById("question").innerText = `${firstNumber} x ${secondNumber}`; // Fix: Correct template literal
  document.getElementById("feedback").innerText = ''; // Clear feedback
  document.getElementById("answer").value = ''; // Clear input
  canSubmit = true; // Allow the user to submit again
}

// Check the user's answer
function checkAnswer() {
  if (!canSubmit) return; // Prevent multiple submits if button is clicked repeatedly

  const userAnswer = parseInt(document.getElementById("answer").value);
  const feedback = document.getElementById("feedback");

  if (isNaN(userAnswer)) {
    feedback.innerText = "Please enter a number!";
    feedback.classList.add('wrong');
    return;
  }

  canSubmit = false; // Disable further submissions until next question is generated

  if (userAnswer === correctAnswer) {
    points += 10; // Increase points
    document.getElementById("points").innerText = points; // Update points on UI
    feedback.innerText = "Correct!";
    feedback.classList.remove('wrong');

    if (points >= 100) {
      setTimeout(() => {
        window.location.href = "congrats3.html"; // Redirect to congrats page when 100 points reached
      }, 1000);
    } else {
      setTimeout(generateQuestion, 1000); // Reload a new question after 1 second
    }
  } else {
    feedback.innerText = "Wrong, try again!";
    feedback.classList.add('wrong');
    setTimeout(generateQuestion, 2000); // Reload a new question after 2 seconds if wrong
  }
}

// Initial call to display the first question
generateQuestion();
