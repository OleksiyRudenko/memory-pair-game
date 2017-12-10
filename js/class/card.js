let Card = function(setId) {
  this.setId = setId;
};

// create div element containing the card
Card.prototype.createElement = function() {
  const el = document.createElement('div');
  el.className = 'card';
  el.innerHTML = '<div class="card-side card-face-' + this.setId +'"></div>';
  return el;
};