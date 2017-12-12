/**
 * Class Card constructor.
 * @constructor
 * @param {number} setId - set id a card would belong to
 * @param {number} idIndex - card id index
 * @param {onCardFlipOver} actionFlipOver - a callback Engine.onCardFlipOver
 */
let Card = function(setId, idIndex, actionFlipOver) {
  this.setId = setId;
  this.idIndex = idIndex;
  this.elId = '';          // card element id
  this.el = null;          // reference to card element
  this.elFaceId = '';      // card face element id
  this.elFace = null;      // reference to card face element
  this.isActive = true;    // whether card is active (not removed yet)
  this.isFaceDown = true;  // whether is card face down
  this.actionFlipOver = actionFlipOver;
};

/**
 * This creates div element containing the card.
 * @memberof Card
 * @name createElement
 * @function
 * @returns {Object} div element containing card
 */
Card.prototype.createElement = function() {
  // create card sides container
  const el = document.createElement('div');
  el.className = 'card';
  this.elId = 'card-' + this.idIndex;
  el.id = this.elId;

  // create flipper div
  elFlipper = document.createElement('div');
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

  // add event handler
  el.onclick = this.onClick.bind(this);

    // complete container
  el.appendChild(elFlipper);

  // attach css transition listener
  let transitionEvent = whichTransitionEvent();
  transitionEvent && this.el.addEventListener(transitionEvent, () => {
    console.log('Transition of ' + this.elId + ' complete!');
  });

  // keep reference
  this.el = el;

  console.log('Created ' + this.elId);
  return this.el;
};

/**
 * This flips the card and calls Engine.onCardFlipOver callback.
 * Called by face element within card element event handler whenever card face is clicked.
 * @memberof Card
 * @name onClick
 * @function
 */
Card.prototype.onClick = function() {
  console.log('Clicked ' + this.elId);
  // flip on click only if isFaceDown
  if (this.isActive && this.isFaceDown) {
    // obsolete: document.getElementById(this.elId).classList.toggle('flip');
    this.el.classList.toggle('flip');
    this.actionFlipOver(this.idIndex);
    this.isFaceDown = false;
  }
};

/**
 * This flips card back face down.
 * Called by Engine.onCardFlipOver()
 * @memberof Card
 * @name flipDown
 * @function
 */
Card.prototype.flipDown = function() {
  console.log('Flipping down ' + this.elId);
  if (this.isActive && !this.isFaceDown) {
    // obsolete: document.getElementById(this.elId).classList.toggle('flip');
    this.el.classList.toggle('flip');
    this.isFaceDown = true;
  }
};

/**
 * This hides div element containing the card.
 * @memberof Card
 * @name hide
 * @function
 */
Card.prototype.hide = function() {
  console.log('Hiding ' + this.elId);
  if (this.isActive) {
    // obsolete: document.getElementById(this.elFaceId).style.display = 'none';
    this.elFace.style.display = 'none';
    this.isActive = false;
  }
};