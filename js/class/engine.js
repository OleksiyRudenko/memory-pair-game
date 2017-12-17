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
    this.clickCount = 0;        // counts clicks to win
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
    cardSetIdList.sort(() => 0.5 - Math.random());

    // build cards
    const subContainer = this.doc.createElement('div');
    subContainer.className = 'game-board';
    const onCardFlipOver = this.onCardFlipOver;
    let self = this;
    this.cardSet = cardSetIdList.map((cardSetId, index) => {
      const card = new Card(cardSetId, index, onCardFlipOver.bind(self));
      subContainer.appendChild(card.createElement());
      return card;
    });
    // attach container to a game board container
    this.gameBoard.appendChild(subContainer);
  };

  /**
   * This is a callback employed by a Card instance when the latter is being clicked.
   * Called by Card.onClick()
   * @memberof Engine
   * @name onCardFlipOver
   * @param {Card} card - Card instance
   */
  onCardFlipOver(card) {
    this.clickCount++;
    // Add card to the queue.
    this.flippedCardQueue.push(card);
    // console.log(this.flippedCardQueue);

    // If there are three cards in queue then it means two initial are mismatching,
    //   therefore remove initial two from queue and flip them over.
    if (this.flippedCardQueue.length >= 3
      && this.flippedCardQueue[0].setId !== this.flippedCardQueue[1].setId) {
      /* console.log('cardSet[~0]: ');
      console.log(this.cardSet[this.flippedCardQueue[0]]);
      console.log('cardSet[~1]: ');
      console.log(this.cardSet[this.flippedCardQueue[1]]); */
      this.flippedCardQueue[0].flipDown();
      this.flippedCardQueue[1].flipDown();
      this.flippedCardQueue.splice(0, 2);
      /* console.log('Removed two cards from the queue and have: ');
      console.log(this.flippedCardQueue); */
    }
    // If there are two cards in queue and their setIds are equal
    //   then hide/remove both from view, queue, and cardSet.
    if (this.flippedCardQueue.length >= 2
      && this.flippedCardQueue[0].setId === this.flippedCardQueue[1].setId) {
      /* console.log('cardSet[~0]: ');
      console.log(this.cardSet[this.flippedCardQueue[0]]);
      console.log('cardSet[~1]: ');
      console.log(this.cardSet[this.flippedCardQueue[1]]); */
      // store cards to animate removal
      let [card0, card1] = this.flippedCardQueue;
      // remove cards from cardSet
      this.cardSet = this.cardSet.filter(c => !(c.idIndex === this.flippedCardQueue[0].idIndex || c.idIndex === this.flippedCardQueue[1].idIndex));
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
    if (!this.cardSet.length) {
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