document.addEventListener("DOMContentLoaded", function () {
    let currentLevel = 1;
    let correctAnswer;
    const totalLevels = 10;
    const character = document.getElementById('character');

    function generateProblem() {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;


        
        const operators = ['+', '-', '*', '/'];
        const operator = operators[Math.floor(Math.random() * operators.length)];

    
        let problem;
        switch (operator) {
            case '+':
                problem = `(${num1} + ${num2})`;
                correctAnswer = num1 + num2;
                break;
            case '-':
                problem = `(${num1} - ${num2})`;
                correctAnswer = num1 - num2;
                break;
            case '*':
                problem = `(${num1} * ${num2})`;
                correctAnswer = num1 * num2;
                break;
            case '/':
                problem = `(${num1 * num2} / ${num2})`; 
                correctAnswer = num1;
                break;
        }

        if (Math.random() > 0.5) {
            document.getElementById('leftDoor').textContent = correctAnswer;
            document.getElementById('rightDoor').textContent = correctAnswer + Math.floor(Math.random() * 5 + 1);
        } else {
            document.getElementById('rightDoor').textContent = correctAnswer;
            document.getElementById('leftDoor').textContent = correctAnswer - Math.floor(Math.random() * 5 + 1);
        }

    
        document.getElementById('problem').textContent = `Solve: ${problem}`;
        document.getElementById('message').textContent = '';
        document.getElementById('level').textContent = `Level: ${currentLevel}`;
        document.getElementById('retryButton').style.display = 'none';
        character.style.left = '50%';  
    }

    function chooseDoor(door) {
        const chosenAnswer = door === 'left' ? parseInt(document.getElementById('leftDoor').textContent) : parseInt(document.getElementById('rightDoor').textContent);

        if (chosenAnswer === correctAnswer) {
            moveCharacter(door);
            setTimeout(() => {
                openDoor(door);
                if (currentLevel < totalLevels) {
                    currentLevel++;
                    setTimeout(generateProblem, 2000);  
                } else {
                    document.getElementById('message').textContent = 'Congratulations! You completed all 10 levels!';
                    disableDoors();
                    document.getElementById('retryButton').style.display = 'block';
                }
            }, 1000); 
        } else {
            document.getElementById('message').textContent = 'Wrong answer! Game over.';
            disableDoors();
            document.getElementById('retryButton').style.display = 'block';
        }
    }

    function moveCharacter(direction) {
        if (direction === 'left') {
            character.style.left = '15%'; 
        } else {
            character.style.left = '75%';  
        }
    }

    function openDoor(door) {
        const doorElement = door === 'left' ? document.getElementById('leftDoor') : document.getElementById('rightDoor');
        doorElement.classList.add('open');  
        setTimeout(() => doorElement.classList.remove('open'), 2000);  
    }

    function disableDoors() {
        document.getElementById('leftDoor').onclick = null;
        document.getElementById('rightDoor').onclick = null;
    }

    function retryGame() {
        currentLevel = 1;
        document.getElementById('leftDoor').onclick = function() { chooseDoor('left'); };
        document.getElementById('rightDoor').onclick = function() { chooseDoor('right'); };
        generateProblem();
    }

    document.getElementById('leftDoor').onclick = function() { chooseDoor('left'); };
    document.getElementById('rightDoor').onclick = function() { chooseDoor('right'); };

    generateProblem();
    window.retryGame = retryGame;
});