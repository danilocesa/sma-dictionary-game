var DirectLoad = function() {};

DirectLoad.prototype = {
    preload : function() {
    	this.load.json('getRandomText', jsonUrl+'getRandomText');
    }, 	
    create : function() {
    	game.state.start('Direct Translate');
    }
}   