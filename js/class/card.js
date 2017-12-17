/** Class representing a card. */
class Card {
  /**
   * Create a card.
   * @constructor
   * @param {number} setId - set id a card would belong to
   * @param {number} idIndex - card id index
   * @param {onCardFlipOver} actionFlipOver - a callback Engine.onCardFlipOver
   */
  constructor(setId, idIndex, actionFlipOver) {
    this.setId = setId;
    this.idIndex = idIndex;
    this.elId = '';          // card element id
    this.el = null;          // reference to card element
    this.elFaceId = '';      // card face element id
    this.elFace = null;      // reference to card face element
    this.isActive = true;    // whether card is active (not removed yet)
    this.isFaceDown = true;  // whether is card face down
    this.actionFlipOver = actionFlipOver;

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
    this.elId = 'card-' + this.idIndex;
    el.id = this.elId;

    // create flipper div
    const elFlipper = document.createElement('div');
    elFlipper.className = 'flipper';

    // create card back element
    const elBack = document.createElement('div');
    elBack.className = 'card-side card-back';
    elFlipper.appendChild(elBack);

    // create card face element
    const elFace = document.createElement('div');
    elFace.className = 'card-side card-face card-face-' + this.setId;
    this.elFaceId = 'card-face-id-' + this.idIndex;
    elFace.id = this.elFaceId;
    this.elFace = elFace;
    elFlipper.appendChild(elFace);

    // add click event handler
    el.onclick = this.onClick.bind(this);
    // attach ontouchstart="this.classList.toggle('flip');" event handler to deem swipes as clicks
    el.ontouchstart = this.onClick.bind(this);

    // complete container
    el.appendChild(elFlipper);

    // attach css transition listener
    let transitionEndEvent = whichTransitionEndEvent();
    transitionEndEvent && el.addEventListener(transitionEndEvent,
      // console.log('Transition of ' + this.elId + ' complete!');
      this.onTransitionEnd.bind(this)
    );

    // keep reference
    this.el = el;

    // console.log('Created ' + this.elId);
    return this.el;
  };

  /**
   * Invoked whenever card animation (transition) ends.
   * Attached to card element in Card.init()
   * @memberof Card
   * @name onTransitionEnd
   */
  onTransitionEnd() {
    // console.log('Transition of ' + this.elId + ' has ended!');
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
   * This flips the card and calls Engine.onCardFlipOver callback.
   * Called by face element within card element event handler whenever card face is clicked.
   * @memberof Card
   * @name onClick
   */
  onClick() {
    // console.log('Clicked ' + this.elId);
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
      // second: invoke engine callback upon flip is completed
      this.queueVisualEffect(
        () => {
          this.actionFlipOver(this);
        },
        false
      );
    }
  };

  /**
   * This flips card back face down.
   * Called by Engine.onCardFlipOver()
   * @memberof Card
   * @name flipDown
   */
  flipDown() {
    // console.log('Flipping down ' + this.elId);
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
    // console.log('Hiding ' + this.elId);
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