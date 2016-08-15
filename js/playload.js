var PlayLoad = function() {};

PlayLoad.prototype = {
    preload : function() {
    	this.load.json('arcadeInfo', jsonUrl+'getUserInfo/arcade');
    }, 	
    create : function() {
    	console.clear();
    	console.log('%c Play Reload ', 'background:yellow;color:black;');
    	game.state.start('Play');
    }
}   