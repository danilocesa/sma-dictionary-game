var PlayLoad = function() {};

PlayLoad.prototype = {
    preload : function() {
    	this.load.json('arcadeInfo', jsonUrl+'getUserInfo/arcade');
    }, 	
    create : function() {
    	game.state.start('Play');
    }
}   