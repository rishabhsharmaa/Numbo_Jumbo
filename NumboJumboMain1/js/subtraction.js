const generateRandomSubtractionProblem = () => {
    const num1 = Math.floor(Math.random() * 20) + 10;
    const num2 = Math.floor(Math.random() * 10) + 1;
    return { question: `${num1} - ${num2}`, answer: num1 - num2 };
  };

  const problems = Array.from({ length: 50 }, generateRandomSubtractionProblem);
  let currentProblemIndex = 0;
  let score = 0;

  function loadProblem() {
    const problemElement = document.getElementById('problem');
    const currentProblem = problems[currentProblemIndex];
    problemElement.textContent = `${currentProblem.question} = ?`;
    document.getElementById('answer-input').value = '';
    document.getElementById('feedback').textContent = '';
    document.getElementById('next-problem').style.display = 'none';
  }

  function handleAnswer() {
    const userAnswer = parseInt(document.getElementById('answer-input').value, 10);
    const currentProblem = problems[currentProblemIndex];
    const feedbackElement = document.getElementById('feedback');
    const scoreElement = document.getElementById('score');

    if (userAnswer === currentProblem.answer) {
      feedbackElement.textContent = 'Correct! Well done!';
      score += 10;
    } else {
      feedbackElement.textContent = 'Oops! Try again.';
    }

    scoreElement.textContent = `Score: ${score}`;
    document.getElementById('next-problem').style.display = 'inline-block';

    if (score >= 100) {
      window.location.href = 'congrats2.html';
    }
  }

  function nextProblem() {
    currentProblemIndex++;
    if (currentProblemIndex < problems.length) {
      loadProblem();
    } else {
      window.location.href = 'congrats2.html';
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    loadProblem();
    document.getElementById('submit-answer').addEventListener('click', handleAnswer);
    document.getElementById('next-problem').addEventListener('click', nextProblem);
  });
  function handleAnswer() {
    const userAnswer = parseInt(document.getElementById('answer-input').value, 10);
    const currentProblem = problems[currentProblemIndex];
    const feedbackElement = document.getElementById('feedback');
    const scoreElement = document.getElementById('score');
    const submitButton = document.getElementById('submit-answer');
  
    // Disable the submit button after the first correct attempt
    if (userAnswer === currentProblem.answer) {
      feedbackElement.textContent = 'Correct! Well done!';
      
      // Increase score only if the next problem button is not visible (prevents re-submitting)
      if (document.getElementById('next-problem').style.display === 'none') {
        score += 10;
      }
  
      // Show next problem button and disable submit button
      document.getElementById('next-problem').style.display = 'inline-block';
      submitButton.disabled = true;
    } else {
      feedbackElement.textContent = 'Oops! Try again.';
    }
  
    scoreElement.textContent = `Score: ${score}`;
  
    // Redirect if the score reaches or exceeds 100
    if (score >= 100) {
      window.location.href = 'congrats2.html';
    }
  }
  
  function loadProblem() {
    const problemElement = document.getElementById('problem');
    const currentProblem = problems[currentProblemIndex];
    const submitButton = document.getElementById('submit-answer');
    
    problemElement.textContent = `${currentProblem.question} = ?`;
    document.getElementById('answer-input').value = '';
    document.getElementById('feedback').textContent = '';
    document.getElementById('next-problem').style.display = 'none';
    submitButton.disabled = false;  // Re-enable the submit button for the new problem
  }