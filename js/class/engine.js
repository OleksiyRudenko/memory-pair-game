var Engine = function(global) {
  this.doc = global.document;
};

// initialize the game board
Engine.prototype.init = function() {
  // create shuffled list
  var cardSet = [];
  for (var i=0; i<8; i++) {
    cardSet.push(i);
    cardSet.push(i);
  }
  cardSet.sort(function(){ return 0.5 - Math.random(); });

  // build cards


};