/** Class representing game Engine. */
class Engine {
  /**
   * Initialize Engine.
   * @constructor
   * @param {Object} doc - reference to document global
   */
  constructor(doc) {
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
   */
  init() {
    // reset click count
    this.clickCount = 0;

    // create shuffled list
    let cardSetIdList = [];
    for (let i = 0; i < 8; i++) {
      cardSetIdList.push(i, i);
    }
    cardSetIdList.sort(function () {
      return 0.5 - Math.random();
    });

    // build cards
    const subContainer = this.doc.createElement('div');
    subContainer.className = 'game-board';
    let cardSet = [];
    const onCardFlipOver = this.onCardFlipOver;
    let self = this;
    // console.log(this.onCardFlipOver);
    cardSetIdList.forEach(function (cardSetId, index) {
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
   * @param {number} idIndex - card id index
   */
  onCardFlipOver(idIndex) {
    this.clickCount++;
    // Add card to the queue.
    // console.log('Card #' + idIndex + ' flipped face up.');
    this.flippedCardQueue.push(idIndex);
    // console.log(this.flippedCardQueue);

    // If there are three cards in queue then it means two initial are mismatching,
    //   therefore remove initial two from queue and flip them over.
    if (this.flippedCardQueue.length >= 3
      && this.cardSet[this.flippedCardQueue[0]].setId !== this.cardSet[this.flippedCardQueue[1]].setId) {
      /* console.log('cardSet[~0]: ');
      console.log(this.cardSet[this.flippedCardQueue[0]]);
      console.log('cardSet[~1]: ');
      console.log(this.cardSet[this.flippedCardQueue[1]]); */
      this.cardSet[this.flippedCardQueue[0]].flipDown();
      this.cardSet[this.flippedCardQueue[1]].flipDown();
      this.flippedCardQueue.splice(0, 2);
      /* console.log('Removed two cards from the queue and have: ');
      console.log(this.flippedCardQueue); */
    }
    // If there are two cards in queue and their setIds are equal
    //   then hide/remove both from view, queue, and cardSet.
    if (this.flippedCardQueue.length >= 2
      && this.cardSet[this.flippedCardQueue[0]].setId === this.cardSet[this.flippedCardQueue[1]].setId) {
      /* console.log('cardSet[~0]: ');
      console.log(this.cardSet[this.flippedCardQueue[0]]);
      console.log('cardSet[~1]: ');
      console.log(this.cardSet[this.flippedCardQueue[1]]); */
      // store cards to animate removal
      let card0 = this.cardSet[this.flippedCardQueue[0]],
        card1 = this.cardSet[this.flippedCardQueue[1]];
      this.cardSet[this.flippedCardQueue[0]] = null;
      this.cardSet[this.flippedCardQueue[1]] = null;
      /* console.log('Removed two cards from the board and have: ');
      console.log(this.cardSet); */
      this.flippedCardQueue.splice(0, 2);
      /* console.log('Removed two cards from the queue and have: ');
      console.log(this.flippedCardQueue); */
      // animate removal
      setTimeout(() => {
        card0.hide();
        card1.hide();
        // check if any cards remain on the board
        this.onCardsRemoval();
      }, 100); // 500
    }
  };

  /**
   * This checks if there are any cards on the board. If none then game over panel visualized.
   * Called by Engine.onCardFlipOver()
   * @memberof Engine
   * @name onCardsRemoval
   */
  onCardsRemoval() {
    // If there are no cards in cardSet
    //   then game is completed, restart the game.
    let count = 0;
    this.cardSet.forEach(function (el) {
      // console.log(el);
      if (el) count++;
    });
    // console.log(count + ' cards remain on the board');
    if (!count) {
      // console.log('No cards remaining!');
      document.getElementById('click-count').innerText = this.clickCount;
      document.getElementById('game-over').style.display = 'block';
    }
  };

  /**
   * This restarts the game.
   * Called by onClick event attached to a button at game over panel in app.js
   * @memberof Engine
   * @name restart
   */
  restart() {
    document.getElementById('game-over').style.display = 'none';
    // window.location.reload();

    // reset board
    this.gameBoard.innerHTML = '';

    // initialize game board
    this.init();
  };
}