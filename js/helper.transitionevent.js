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
let transitionEndEvent = whichTransitionEndEvent();
transitionEndEvent && targetElement.addEventListener(transitionEndEvent, function() {
  console.log('Transition complete!  This is the callback, no library needed!');
});

// jQuery; source: https://jonsuh.com/blog/detect-the-end-of-css-animations-and-transitions-with-javascript/
let transitionEndEvent = whichTransitionEndEvent();

$(".button").click(function(){
  $(this).addClass("animate");
  $(this).one(transitionEndEvent,
              function(event) {
    // Do something when the transition ends
  });
*/