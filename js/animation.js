// Animator package.
var Animator = function(){
    // Id to store the javascript interval.
	this.id;
	/**
	  * the generic animate function
	  * it takes the basic argument and performs the animation on the basic of it.
	  * The configuration map is as follows
	  * {
	  *  delay : delay in between the position change
	  *  element : element to be animated
	  *  duration : animation duration
	  *  increment : how the animation transition should happen over time. Here its just a liner function
	  *  change : function to change the position of the element.
	  * }
	  **/
	function animate(opts) { 
	  var start = new Date;
	 
	  this.id = setInterval(function() {
		var timePassed = new Date - start
		var progress = timePassed / opts.duration
		// Greater than is checked incase the clock just goes past the duration.
		if (progress >= 1) {
		  clearInterval(this.id);
		}
		var delta = opts.increment(progress)
		opts.change(delta);
	  }, opts.delay || 10);
	}

	function move(container, duration) {
	  var element = container.children[0];
	  var containerHeight  = container.style.height || 400;
	  var elementHeight  = element.style.height || 100;
	  var to = (containerHeight - elementHeight);
	  
	  // Clear the interval if the button is clicked again and again.
	  reset(element);
	  
	  // animate function is called with configuration.
	  animate({
		delay: 10,
		element:element,
		duration: duration || 2000, 
		increment: function(p) {
			return p
		},
		change: function(delta) {
		  this.element.style.left = to*delta + "px";   
		  this.element.style.top = to*delta + "px";
		}
	  }); 
	}
	// Rest function to clear any inprogress animation if the button is clicked multiple times.
	function reset(element){
		if(this.id) {
			clearInterval(this.id); 
			element.style.left = 0 + "px";   
			element.style.top = 0 + "px";
		}
	}
	// A generic function to find elment by ID.
	// If element is not found return document.
	function findById(id) {
		var element;
		if(document.getElementById)
			var element = document.getElementById(id);
		return (element)? element : document;
	}
	return {
		findById : findById,
		move : move,
		animate : animate
	};
}();
