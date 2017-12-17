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
    // attach click event handlers
    this.gameBoard.onclick = this.onClick.bind(this);
    this.gameBoard.ontouchstart = this.onClick.bind(this);
  };

  /**
   * This intializes a game board. Used on game launch and on game reset.
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

    // build cards in a subcontainer and attach it to the game board container
    this.gameBoard.appendChild(this.render(cardSetIdList));
  };

  /**
   * Renders HTML Element
   * @memberof Engine
   * @name render
   * @param {Array} cardSetIdList - [cardId]=setId...
   * @return {HTMLElement} container of all cards
   */
  render(cardSetIdList) {
    const subContainer = this.doc.createElement('div');
    subContainer.className = 'game-board';
    this.cardSet = cardSetIdList.map((cardSetId, index) => {
      const card = new Card(cardSetId, index);
      subContainer.appendChild(card.createElement());
      return card;
    });
    return subContainer;
  }

  /**
   * Called by Engine.onClick()
   * @memberof Engine
   * @name onCardFlipOver
   * @param {Card} card - Card instance
   */
  onCardFlipOver(card) {
    this.clickCount++;
    // Add card to the queue.
    this.flippedCardQueue.push(card);

    // If there are three or more cards in the queue then it means that two initial are mismatching,
    //   therefore remove initial two from queue and flip them over.
    // This is intended behaviour when two non-matching cards are flipped back only upon third card click.
    if (this.flippedCardQueue.length >= 3
      && this.flippedCardQueue[0].setId !== this.flippedCardQueue[1].setId) {
      this.flippedCardQueue[0].flipDown();
      this.flippedCardQueue[1].flipDown();
      // remove cards from queue
      this.flippedCardQueue.splice(0, 2);
    }
    // If there are still two or more cards in queue and setIds of two initial cards are equal
    //   then hide/remove both from view, queue, and cardSet.
    if (this.flippedCardQueue.length >= 2
      && this.flippedCardQueue[0].setId === this.flippedCardQueue[1].setId) {
      // store cards to animate removal
      let [card0, card1] = this.flippedCardQueue;
      // remove cards from cardSet and queue
      this.cardSet = this.cardSet.filter(c => !(c.idIndex === this.flippedCardQueue[0].idIndex || c.idIndex === this.flippedCardQueue[1].idIndex));
      this.flippedCardQueue.splice(0, 2);
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
   * Click event handler. Employs delegation.
   * @memberof Engine
   * @name onClick
   * @param event
   */
  onClick(event) {
    const target = event.target;
    // go on only when card-back clicked
    if (!target.classList.contains('card-back')) return;
    const cardIdIndex = Number(target.getAttribute('data-card-id-index'));
    const card = this.cardSet.find(c => c.idIndex === cardIdIndex);
    if (card && card.flipFaceUp()) {
      // check status upon flip is completed
      card.queueVisualEffect(
        () => {
          this.onCardFlipOver(card);
        },
        false
      );
    }
  }

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