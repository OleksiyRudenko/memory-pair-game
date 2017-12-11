let Card = function(setId, idIndex, actionFlipOver) {
  this.setId = setId;
  this.idIndex = idIndex;
  this.elId = '';
  this.isAactive = true;
  this.isFaceDown = true;
  this.actionFlipOver = actionFlipOver;
};

// create div element containing the card
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
  elFlipper.appendChild(elFace);

  // add event handler
  el.onclick = this.onClick.bind(this);

    // complete container
  el.appendChild(elFlipper);
  console.log('Created ' + this.elId);
  return el;
};

Card.prototype.onClick = function() {
  console.log('Clicked ' + this.elId);
  // flip on click only if isFaceDown
  if (this.isFaceDown) {
    document.getElementById(this.elId).classList.toggle('flip');
    this.actionFlipOver(this.elId);
    this.isFaceDown = false;
  }
};