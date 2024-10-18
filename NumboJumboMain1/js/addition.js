const generateRandomAdditionProblem = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    return { question: `${num1} + ${num2}`, answer: num1 + num2 };
  };
  
  const problems = Array.from({ length: 50 }, generateRandomAdditionProblem);
  let currentProblemIndex = 0;
  let score = 0;
  
  function loadProblem() {
    const problemElement = document.getElementById('problem');
    const currentProblem = problems[currentProblemIndex];
    problemElement.textContent = `${currentProblem.question} = ?`;
    document.getElementById('answer-input').value = '';
    document.getElementById('feedback').textContent = '';
    document.getElementById('next-problem').style.display = 'none';
    
    // Enable the submit button
    document.getElementById('submit-answer').disabled = false;
  }
  
  function handleAnswer() {
    const userAnswer = parseInt(document.getElementById('answer-input').value, 10);
    const currentProblem = problems[currentProblemIndex];
    const feedbackElement = document.getElementById('feedback');
    const scoreElement = document.getElementById('score');
  
    // Disable the submit button after answering
    document.getElementById('submit-answer').disabled = true;
  
    if (userAnswer === currentProblem.answer) {
      feedbackElement.textContent = 'Correct! Well done!';
      score += 10;
    } else {
      feedbackElement.textContent = 'Oops! Try again.';
    }
  
    scoreElement.textContent = `Score: ${score}`;
    document.getElementById('next-problem').style.display = 'inline-block';
  
    if (score >= 100) {
      window.location.href = "congrats.html";
    }
  }
  
  function nextProblem() {
    currentProblemIndex++;
    if (currentProblemIndex < problems.length) {
      loadProblem();
    } else {
      window.location.href = 'congrats1.html';
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    loadProblem();
    document.getElementById('submit-answer').addEventListener('click', handleAnswer);
    document.getElementById('next-problem').addEventListener('click', nextProblem);
  });
  