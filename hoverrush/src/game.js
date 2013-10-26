
var Timing = function() {
	this.current = Date.now();
	this.last = this.current;
	this.delta = 0;
};

Timing.prototype.update = function() {
	var current = Date.now();
	this.delta = current - this.last;
	this.last = this.current;
	this.current = current;	
};

Game = {

	timing : new Timing(), 
	
	mainloop : function() {
		Game.timing.update();		
		Game.updateGame(Game.timing);
		Game.drawGame(Game.timing);
    },
  
  	start: function() {
    	var animFrame = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            null ;

		animFrame = null;
    	if (animFrame !== null) {
        	var recursiveAnim = function() {
            	Game.mainloop();
            	animFrame(recursiveAnim);
        	};
       	 	animFrame( recursiveAnim );
    	} else {
        	var ONE_FRAME_TIME = 1000.0 / 60.0 ;
        	setInterval( Game.mainloop, ONE_FRAME_TIME );
  	  	}
	},
  
    frames : 0,
    fps : 0,
    time : 0,
	updateGame : function(timing) {
		Game.time += timing.delta;
		Game.frames++;
		var seconds = Game.time / 1000;
		Game.fps = Game.frames / seconds;
	},
	
	drawGame : function(timing) {
		var bar = document.getElementById("bar");
    	bar.innerText += ".";
    	var info = document.getElementById("info");
    	info.innerText = Game.fps + " fps";
	}  
};