let points = 0;
let firstNumber, secondNumber, correctAnswer;
let questionAnswered = false;

// Function to generate a new random division question
function generateQuestion() {
    secondNumber = Math.floor(Math.random() * 9) + 1; // Random divisor between 1 and 9
    correctAnswer = Math.floor(Math.random() * 10) + 1; // Random quotient between 1 and 10
    firstNumber = secondNumber * correctAnswer; // Ensure the division is perfect
    document.getElementById("question").innerText = `${firstNumber} ÷ ${secondNumber}`;
    document.getElementById("feedback").innerText = ''; // Clear feedback
    document.getElementById("answer").value = ''; // Clear input
    questionAnswered = false; // Reset the flag for the new question
}

// Check the user's answer
function checkAnswer() {
    if (questionAnswered) {
        return; // If the question has already been answered, do nothing
    }

    const userAnswer = parseInt(document.getElementById("answer").value);
    const feedback = document.getElementById("feedback");

    if (userAnswer === correctAnswer) {
        points += 10; // Increase points
        document.getElementById("points").innerText = points; // Update points on UI
        feedback.innerText = "Correct!";
        feedback.classList.remove('wrong');
        questionAnswered = true; // Mark the question as answered

        if (points >= 100) {
            window.location.href = "congrats4.html"; // Redirect to congrats page when 100 points reached
        } else {
            setTimeout(generateQuestion, 1000); // Load a new question after 1 second
        }
    } else {
        feedback.innerText = "Wrong, try again!";
        feedback.classList.add('wrong');
        setTimeout(generateQuestion, 2000); // Load a new question after 2 seconds if wrong
    }
}

// Initial call to display the first question
generateQuestion();
