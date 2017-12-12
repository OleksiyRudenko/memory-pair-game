// Create Engine instance
// TODO: move following statement to class/engine.js
let engine = new Engine(document);

// Initialize game board
engine.init();

// Add event handler to a game over message button.
document.getElementById('btn-restart').onclick = engine.restart.bind(engine);