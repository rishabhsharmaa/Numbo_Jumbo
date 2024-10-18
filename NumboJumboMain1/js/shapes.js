const shapes = ['square', 'circle', 'rectangle', 'triangle', 'rhombus', 'pentagon'];  // 6 shapes
let targetShape = '';
let level = 1;  // Starting at level 1

function setRandomShape() {
  const randomIndex = Math.floor(Math.random() * shapes.length);
  targetShape = shapes[randomIndex];
  document.getElementById("target-shape").className = "shape " + targetShape;

  const shapeOptionsContainer = document.getElementById("shape-options");
  shapeOptionsContainer.innerHTML = '';

  // Display only names of shapes in options (no images)
  shapes.forEach(shape => {
    shapeOptionsContainer.innerHTML += `
      <div class="option">
        <input type="radio" name="shape" value="${shape}"> ${shape.charAt(0).toUpperCase() + shape.slice(1)}
      </div>
    `;
  });
}

function submitShape() {
  const selectedShape = document.querySelector('input[name="shape"]:checked');
  const resultElement = document.getElementById("game-result");

  if (!selectedShape) {
    resultElement.textContent = "Please select a shape!";
    resultElement.classList.remove('correct', 'wrong');
    return;
  }

  if (selectedShape.value === targetShape) {
    resultElement.textContent = "Great! You matched the " + targetShape + "!";
    resultElement.classList.add('correct');
    resultElement.classList.remove('wrong');

    // Check if the level is 10
    if (level === 10) {
      setTimeout(() => {
        window.location.href = "congrats.html"; // Redirect to congrats.html
      }, 1500);
    } else {
      // Move to the next level after a short delay
      setTimeout(() => {
        level++;
        updateLevelHeading();
        setRandomShape();
      }, 1500);
    }
  } else {
    resultElement.textContent = "Oops! The correct answer was the " + targetShape + ".";
    resultElement.classList.add('wrong');
    resultElement.classList.remove('correct');
  }
}

// Update the heading based on the current level
function updateLevelHeading() {
  document.getElementById('level-heading').textContent = `Shapes & Patterns - Level ${level}`;
}

// Initialize the first random shape when the page loads
setRandomShape();
