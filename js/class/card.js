let Card = function(setId, idIndex) {
  this.setId = setId;
  this.idIndex = idIndex;
  this.elId = '';
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
  document.getElementById(this.elId).classList.toggle('flip');
};