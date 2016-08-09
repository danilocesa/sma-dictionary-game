var DirectLoad = function() {};

DirectLoad.prototype = {
    preload : function() {
    	this.load.json('getRandomText', jsonUrl+'getRandomText');
    }, 	
    create : function() {
    	this.game.stateTransition.to('Direct Translate');
    	// game.state.start('Direct Translate');
    }
}   