// Function to generate random glitter particles
function createGlitter() {
    const glitterContainer = document.getElementById('glitter');
    for (let i = 0; i < 100; i++) {
      const glitter = document.createElement('div');
      glitter.style.left = Math.random() * 100 + '%';
      glitter.style.top = Math.random() * 100 + '%';
      glitter.style.width = Math.random() * 10 + 'px';
      glitter.style.height = glitter.style.width;
      glitter.style.animationDuration = Math.random() * 2 + 1 + 's';
      glitterContainer.appendChild(glitter);
    }
  }

  // Function to play the celebration sound
  function playSound() {
    const audio = document.getElementById('celebration-sound');
    if (audio) {
      audio.play().then(() => {
        console.log("Sound is playing.");
      }).catch((error) => {
        console.error("Error playing sound:", error);
      });
    } else {
      console.error("Audio element not found.");
    }
  }

  // Start glitter animation and play sound on user interaction
  document.addEventListener('DOMContentLoaded', () => {
    createGlitter();
    // Create a button to manually trigger the sound
    const playButton = document.createElement('button');
    playButton.textContent = "Play Sound";
    playButton.style.position = 'absolute';
    playButton.style.top = '20px';
    playButton.style.left = '20px';
    playButton.style.padding = '10px';
    playButton.style.fontSize = '1.5em';
    playButton.style.cursor = 'pointer';
    playButton.addEventListener('click', playSound);
    document.body.appendChild(playButton);
    
    // Automatically play sound after user interaction
    document.body.addEventListener('click', playSound, { once: true });
  });