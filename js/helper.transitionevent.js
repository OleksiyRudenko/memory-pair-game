/* Source: https://davidwalsh.name/css-animation-callback */
/*
	The "whichTransitionEvent" can be swapped for "animation" instead of "transition" texts, as can the usage :)
*/


/* From Modernizr */
function whichTransitionEndEvent(){
  let t;
  const el = document.createElement('fakeelement');
  const transitions = {
    'transition':'transitionend',
    'OTransition':'oTransitionEnd',
    'MozTransition':'transitionend',
    'WebkitTransition':'webkitTransitionEnd'
  };

  for(t in transitions){
    if( el.style[t] !== undefined ){
      return transitions[t];
    }
  }
}

/* typical transition event listener */
/* Listen for a transition! */
/*
// Vanilla JS
let transitionEvent = whichTransitionEvent();
transitionEvent && e.addEventListener(transitionEvent, function() {
  console.log('Transition complete!  This is the callback, no library needed!');
});

// jQuery; source: https://jonsuh.com/blog/detect-the-end-of-css-animations-and-transitions-with-javascript/
let transitionEvent = whichTransitionEvent();

$(".button").click(function(){
  $(this).addClass("animate");
  $(this).one(transitionEvent,
              function(event) {
    // Do something when the transition ends
  });
*/