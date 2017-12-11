let Engine = function(doc) {
  this.doc = doc;
  this.gameBoard = this.doc.getElementById('game-board');
  this.cardSet = [];
};

// initialize the game board
Engine.prototype.init = function() {
  // create shuffled list
  let cardSetIdList = [];
  for (let i=0; i<8; i++) {
    cardSetIdList.push(i);
    cardSetIdList.push(i);
  }
  cardSetIdList.sort(function(){ return 0.5 - Math.random(); });

  // build cards
  const subContainer = this.doc.createElement('div');
  subContainer.className = 'game-board';
  let cardSet = [];
  cardSetIdList.forEach(function(cardSetId, index) {
    const card = new Card(cardSetId, index);
    cardSet.push(card);
    subContainer.appendChild(card.createElement());
  });
  this.cardSet = cardSet;
  this.gameBoard.appendChild(subContainer);
};