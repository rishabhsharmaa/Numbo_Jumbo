let towers = {
    tower1: [],
    tower2: [],
    tower3: [],
};

let numDisks = 3;
let moveCount = 0;

function setup() {
    numDisks = parseInt(document.getElementById('diskCount').value);

    towers.tower1 = Array.from({ length: numDisks }, (_, i) => numDisks - i);
    towers.tower2 = [];
    towers.tower3 = [];

    moveCount = 0; 
    renderTowers();
    updateScore();
}

function renderTowers() {
    for (let i = 1; i <= 3; i++) {
        const towerElement = document.getElementById(`tower${i}`);
        towerElement.innerHTML = '';

        towers[`tower${i}`].forEach((disk, index) => {
            const diskElement = document.createElement('div');
            diskElement.classList.add('disk');
            diskElement.id = `disk${disk}`;
            diskElement.draggable = true;
            diskElement.ondragstart = drag;
            diskElement.style.bottom = `${index * 30}px`; 
            towerElement.appendChild(diskElement);
        });
    }
}

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("disk", event.target.id);
    event.dataTransfer.setData("sourceTower", event.target.parentElement.id);
}

function drop(event) {
    event.preventDefault();
    
    const diskId = event.dataTransfer.getData("disk");
    const sourceTowerId = event.dataTransfer.getData("sourceTower");
    const destinationTowerId = event.target.id;

    const disk = document.getElementById(diskId);
    const sourceTower = towers[sourceTowerId];
    const destinationTower = towers[destinationTowerId];

    if (sourceTower.length > 0 &&
        (destinationTower.length === 0 || sourceTower[sourceTower.length - 1] < destinationTower[destinationTower.length - 1])) {
        
        destinationTower.push(sourceTower.pop());
        renderTowers();

        moveCount++; 
        updateScore(); 

        document.getElementById('message').innerText = `Good move! You moved a disk to ${destinationTowerId}.`;

        if (towers.tower3.length === numDisks) {
            document.getElementById('message').innerText = `You Win! All ${numDisks} disks moved to Tower 3 in ${moveCount} moves!`;
        }
    } else {
        document.getElementById('message').innerText = 'Oops! You can\'t put a larger disk on a smaller one.';
        disk.classList.add('invalid-move');
        setTimeout(() => {
            disk.classList.remove('invalid-move');
        }, 500);
    }
}

function updateScore() {
    document.getElementById('score').innerText = `Moves: ${moveCount}`;
}

// Initial setup
setup();