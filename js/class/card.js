let Card = function(setId, idIndex) {
  this.setId = setId;
  this.idIndex = idIndex;
};

// create div element containing the card
Card.prototype.createElement = function() {
  // create card sides container
  const el = document.createElement('div');
  el.className = 'card';
  el.id = 'card-' + this.idIndex;

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

  el.appendChild(elFlipper);
  return el;
};