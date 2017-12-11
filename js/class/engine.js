/**
 * Class Engine constructor.
 * @constructor
 * @param {Object} doc - reference to document global
 */
let Engine = function(doc) {
  this.doc = doc;
  this.gameBoard = this.doc.getElementById('game-board'); // refers to game-board container
  this.cardSet = [];          // stores instances of Card class
  this.flippedCardQueue = []; // stores flipped cards
  this.clickCount = 0;        // counts flipped cards
};

/**
 * This intializes a game board.
 * @memberof Engine
 * @name init
 * @function
 */
Engine.prototype.init = function() {
  // reset board
  this.gameBoard.innerHTML = '';

  // reset click count
  this.clickCount = 0;

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
  // attach container to a game board container
  this.gameBoard.appendChild(subContainer);
};

/**
 * This is a callback employed by a Card instance when the latter is being clicked.
 * Called by Card.onClick()
 * @memberof Engine
 * @name onCardFlipOver
 * @function
 * @param {number} idIndex - card id index
 */
Engine.prototype.onCardFlipOver = function(idIndex) {
  this.clickCount++;
  // Add card to the queue.
  console.log('Card #' + idIndex + ' flipped face up.');
  this.flippedCardQueue.push(idIndex);
  console.log(this.flippedCardQueue);

  // If there are three cards in queue then it means two initial are mismatching,
  //   therefore remove initial two from queue and flip them over.
  if (this.flippedCardQueue.length === 3
      && this.cardSet[this.flippedCardQueue[0]].setId !== this.cardSet[this.flippedCardQueue[1]].setId) {
    /* console.log('cardSet[~0]: ');
    console.log(this.cardSet[this.flippedCardQueue[0]]);
    console.log('cardSet[~1]: ');
    console.log(this.cardSet[this.flippedCardQueue[1]]); */
    this.cardSet[this.flippedCardQueue[0]].flipDown();
    this.cardSet[this.flippedCardQueue[1]].flipDown();
    this.flippedCardQueue.shift();
    this.flippedCardQueue.shift();
    /* console.log('Removed two cards from the queue and have: ');
    console.log(this.flippedCardQueue); */
  }
  // If there are two cards in queue and their setIds are equal
  //   then hide/remove both from view, queue, and cardSet.
  if (this.flippedCardQueue.length === 2
    && this.cardSet[this.flippedCardQueue[0]].setId === this.cardSet[this.flippedCardQueue[1]].setId) {
    /* console.log('cardSet[~0]: ');
    console.log(this.cardSet[this.flippedCardQueue[0]]);
    console.log('cardSet[~1]: ');
    console.log(this.cardSet[this.flippedCardQueue[1]]); */
    setTimeout(() => {
      this.cardSet[this.flippedCardQueue[0]].hide();
      this.cardSet[this.flippedCardQueue[1]].hide();
      this.cardSet[this.flippedCardQueue[0]] = null;
      this.cardSet[this.flippedCardQueue[1]] = null;
      /* console.log('Removed two cards from the board and have: ');
      console.log(this.cardSet); */
      this.flippedCardQueue.shift();
      this.flippedCardQueue.shift();
      /* console.log('Removed two cards from the queue and have: ');
      console.log(this.flippedCardQueue); */
      // check if any cards remain on the board
      this.onCardsRemoval();
    }, 500);
  }
};

/**
 * This checks if there are any cards on the board. If none then game over panel visualized.
 * Called by Engine.onCardFlipOver()
 * @memberof Engine
 * @name onCardsRemoval
 * @function
 */
Engine.prototype.onCardsRemoval = function() {
  // If there are no cards in cardSet
  //   then game is completed, restart the game.
  let count = 0;
  this.cardSet.forEach(function(el){
    // console.log(el);
    if (el) count++;
  });
  console.log(count + ' cards remain on the board');
  if (!count) {
    console.log('No cards remaining!');
    document.getElementById('click-count').innerText = this.clickCount;
    document.getElementById('game-over').style.display = 'block';
  }
};

/**
 * This restarts the game.
 * Called by onClick event attached to a button at game over panel in app.js
 * @memberof Engine
 * @name restart
 * @function
 */
Engine.prototype.restart = function() {
  document.getElementById('game-over').style.display = 'none';
  window.location.reload();
  // this.init();
};