var  
	LeaderBoard = function() {};

LeaderBoard.prototype = {

	preload : function() {
		this.load.image('backButton', './images/back.png');
	},
	create: function (){
		game.stage.backgroundColor = '#000';
		backButton = this.add.button(10, 5, 'backButton',this.backMain);
		backButton.scale.setTo(0.4,0.4);
		backButton.inputEnabled = true;
        backButton.input.useHandCursor = true;
		

		game.add.text(this.world.centerX + 135, 60, 'Top Players', { font: "bold 28px Arial", fill: "#fff", align:"center",boundsAlignH: "center", boundsAlignV: "center" });
	},
	update: function(){

	},
	render: function (){

	}

}	