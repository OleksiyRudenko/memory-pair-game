/** Class representing a card. */
class Card {
  /**
   * Create a card.
   * @constructor
   * @param {number} setId - set id a card would belong to
   * @param {number} idIndex - card id index
   */
  constructor(setId, idIndex) {
    this.setId = setId;
    this.idIndex = idIndex;
    this.el = null;          // reference to card element
    this.elFace = null;      // reference to card face element
    this.isActive = true;    // whether card is active (not removed yet)
    this.isFaceDown = true;  // whether is card face down

    // css transition management
    this.isInAnimation = false; // indicates whether any animation (transition) runs
    this.visualEffectQueue = [];   // transition and visibility change calls queue; array of {isAnimated:,action}
  };

  /**
   * This creates div element containing the card.
   * @memberof Card
   * @name createElement
   * @return {HTMLElement} div element containing card
   */
  createElement() {
    // create card sides container
    const el = document.createElement('div');
    el.className = 'card';
    el.id = 'card-' + this.idIndex;

    // create flipper div
    const elFlipper = document.createElement('div');
    elFlipper.className = 'flipper';

    // create card back element
    const elBack = document.createElement('div');
    elBack.className = 'card-side card-back';
    elBack.setAttribute('data-card-id-index', this.idIndex);
    elFlipper.appendChild(elBack);

    // create card face element
    const elFace = document.createElement('div');
    elFace.className = 'card-side card-face card-face-' + this.setId;
    elFace.id = 'card-face-id-' + this.idIndex;
    this.elFace = elFace;
    elFlipper.appendChild(elFace);

    // complete container
    el.appendChild(elFlipper);

    // attach css transition listener
    let transitionEndEvent = whichTransitionEndEvent();
    transitionEndEvent && el.addEventListener(transitionEndEvent,
      this.onTransitionEnd.bind(this)
    );

    // keep reference
    this.el = el;

    return this.el;
  };

  /**
   * Invoked whenever card animation (transition) ends.
   * Attached to card element in Card.init()
   * @memberof Card
   * @name onTransitionEnd
   */
  onTransitionEnd() {
    this.isInAnimation = false;
    // if any method in queue, then invoke it
    if (this.visualEffectQueue.length) {
      let action = this.visualEffectQueue.shift(); // remove method from queue and invoke it
      this.isInAnimation = action.isAnimated;
      action.action();
    }
  };

  /**
   * This queues action or executes it immediately if none is running.
   * @memberof Card
   * @name queueVisualEffect
   * @param action - method to queue or execute
   * @param isAnimated - true if action invokes animation; false is of immediate effect
   */
  queueVisualEffect(action, isAnimated) {
    if (this.isInAnimation) {
      // queue
      this.visualEffectQueue.push({
        isAnimated: isAnimated,
        action: action,
      });
    } else {
      // execute
      this.isInAnimation = isAnimated;
      action();
    }
  };

  /**
   * This flips the card.
   * Called by Engine.onClick.
   * @memberof Card
   * @name flipFaceUp
   * @return {Boolean} false if inactive or already face up
   */
  flipFaceUp() {
    // flip on click only if isFaceDown
    if (this.isActive && this.isFaceDown) {
      this.isFaceDown = false;
      // first: flip the card
      this.queueVisualEffect(
        () => {
          this.el.classList.toggle('flip');
        },
        true
      );
      return true;
    }
    return false;
  };

  /**
   * This flips card back face down.
   * Called by Engine.onCardFlipOver()
   * @memberof Card
   * @name flipDown
   */
  flipDown() {
    if (this.isActive && !this.isFaceDown) {
      // flip card face down
      this.queueVisualEffect(
        () => {
          this.el.classList.toggle('flip');
        },
        true
      );
      // make card clickable only when it is completely flipped face down
      this.queueVisualEffect(
        () => {
          this.isFaceDown = true;
        },
        false
      );
    }
  };

  /**
   * This hides div element containing the card.
   * @memberof Card
   * @name hide
   */
  hide() {
    if (this.isActive) {
      this.isActive = false;
      this.queueVisualEffect(
        () => {
          this.elFace.className += ' fade-out';
        },
        true
      );
      this.queueVisualEffect(
        () => {
          this.elFace.style.className += ' card-face-hide';
        },
        false
      );
    }
  };
}