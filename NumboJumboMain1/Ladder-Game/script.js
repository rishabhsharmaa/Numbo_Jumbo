 let questions = [];
 let currentQuestionIndex = 0;
 let score = 0;
 let gameOver = false;

 const generateQuestion = () => {
   const num1 = Math.floor(Math.random() * 10);
   const num2 = Math.floor(Math.random() * 10);
   const answer = num1 + num2;
   return { question: `${num1} + ${num2}`, answer: answer.toString() };
 };

 const startGame = () => {
   questions = Array(10).fill(null).map(generateQuestion);
   currentQuestionIndex = 0;
   score = 0;
   gameOver = false;
   scoreUpdate();
   drawRocks();
   moveCharacter(0);
   document.getElementById('gameOver').style.display = 'none';
 };

 const drawRocks = () => {
   const gameBoard = document.getElementById('gameBoard');
   gameBoard.innerHTML = ''; 
   questions.forEach((q, index) => {
     const rock = document.createElement('div');
     rock.classList.add('rock');
     rock.classList.add(index === currentQuestionIndex ? 'active' : index < currentQuestionIndex ? 'answered' : 'inactive');
     rock.style.top = `${540 - index * 60}px`;
     rock.textContent = q.question;
     gameBoard.appendChild(rock);
   });
   const character = document.createElement('div');
   character.classList.add('character');
   character.innerHTML = '😊';
   character.style.bottom = `${currentQuestionIndex * 60}px`;
   gameBoard.appendChild(character);
 };

 const moveCharacter = (position) => {
   const character = document.querySelector('.character');
   character.style.bottom = `${position}px`;
 };

 const scoreUpdate = () => {
   document.getElementById('score').textContent = `Score: ${score} / ${questions.length}`;
 };

 const submitAnswer = () => {
   const input = document.getElementById('answerInput');
   const answer = input.value.trim();
   if (answer === questions[currentQuestionIndex].answer) {
     score++;
     if (currentQuestionIndex < questions.length - 1) {
       currentQuestionIndex++;
       input.value = '';
       scoreUpdate();
       drawRocks();
       moveCharacter(currentQuestionIndex * 60);
     } else {
       endGame();
     }
   }
 };

 const endGame = () => {
   document.getElementById('gameOver').style.display = 'block';
   document.getElementById('finalScore').textContent = score;
   gameOver = true;
 };

 const restartGame = () => {
   startGame();
 };
 window.onload = startGame;