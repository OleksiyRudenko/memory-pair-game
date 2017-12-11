let Card = function(setId) {
  this.setId = setId;
};

// create div element containing the card
Card.prototype.createElement = function() {
  // create card sides container
  const el = document.createElement('div');
  el.className = 'card';

  // create card back element
  const elBack = document.createElement('div');
  elBack.className = 'card-side card-back';
  el.appendChild(elBack);

  // create card face element
  const elFace = document.createElement('div');
  elFace.className = 'card-side card-face-' + this.setId;
  el.appendChild(elBack);

  return el;
};