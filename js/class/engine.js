let Engine = function(doc) {
  this.doc = doc;
  this.gameBoard = this.doc.getElementById('game-board');
  this.cardSet = [];
  this.flippedCardQueue = [];
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
  var cardSet = [];
  const onCardFlipOver = this.onCardFlipOver;
  let self = this;
  console.log(this.onCardFlipOver);
  cardSetIdList.forEach(function(cardSetId, index) {
    const card = new Card(cardSetId, index, onCardFlipOver.bind(self));
    cardSet.push(card);
    subContainer.appendChild(card.createElement());
  });
  this.cardSet = cardSet;
  this.gameBoard.appendChild(subContainer);
};

Engine.prototype.onCardFlipOver = function(idIndex, setId) {
  // Add card to the queue.
  console.log('Card #' + idIndex + ' flipped face up.');
  this.flippedCardQueue.push(cardId);
  console.log(this.flippedCardQueue);

  // If there are three cards in queue then it means two initial are mismatching,
  //   therefore remove initial two from queue and flip them over.
  if (this.flippedCardQueue.length === 3 && this.flippedCardQueue[0].setId !== this.flippedCardQueue[1].setId) {
    this.cardSet[this.flippedCardQueue[0].idIndex].flipDown();
    this.cardSet[this.flippedCardQueue[1].idIndex].flipDown();
    this.flippedCardQueue.shift();
    this.flippedCardQueue.shift();
  }
  // If there are two cards in queue and their setIds are equal
  //   then hide/remove both from view, queue, and cardSet.
  // If there are no cards in cardSet
  //   then game is completed, restart the game.
};