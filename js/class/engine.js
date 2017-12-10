var Engine = function(doc) {
  this.doc = doc;
  this.gameBoard = this.doc.getElementById('game-board');
};

// initialize the game board
Engine.prototype.init = function() {
  // create shuffled list
  let cardSet = [];
  for (let i=0; i<8; i++) {
    cardSet.push(i);
    cardSet.push(i);
  }
  cardSet.sort(function(){ return 0.5 - Math.random(); });

  // build cards
  const container = this.doc.createElement('div');
  container.className = 'game-board';
  cardSet.forEach(function(cardSetId) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = '<div class="card-side card-face-' + cardSetId +'"></div>';
    container.appendChild(card);
  });
  this.gameBoard.appendChild(container);
};