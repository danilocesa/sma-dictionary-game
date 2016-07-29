var  playerText1,
	LeaderBoard = function() {};

LeaderBoard.prototype = {

	preload : function() {
		topPlayers = this.cache.getJSON('getTopPlayers');
		playerStats = this.cache.getJSON('playerStats');
	},
	create: function (){
		this.add.sprite(0, 0, 'mainBG');
		
		var blackscreen = game.add.graphics();
   		blackscreen.beginFill(0x000000, 0.7);
    	blackscreen.drawRect(0, 0, 550, 650);

		backButton = this.add.button(10, 5, 'backButton',this.backMain);
		backButton.scale.setTo(0.4,0.4);
		backButton.inputEnabled = true;
        backButton.input.useHandCursor = true;

		this.add.text(this.world.centerX - 100, 30, 'Top Players', { font: "bold 38px Arial", fill: "#ffd700", align:"center",boundsAlignH: "center", boundsAlignV: "center"});

		this.add.text(30, 100, "Name \t Level \t Translated \t Guessed", { font: "bold 28px Arial", fill: "#fff", align:"left",tabs: 90});

		playerText1 = this.add.text(30, 150, topPlayers[0].username + "\t" + topPlayers[0].lvl + "\t" + (topPlayers[0].translated_word == null ? "0" : topPlayers[0].translated_word) + "\t" + (topPlayers[0].guessed_word == null ? "0" : topPlayers[0].guessed_word ), { font: "bold 8px Arial", fill: "#41d207", align:"left", tabs: 132});

		var posText = 200;
		for (var i = 1; i < topPlayers.length; i++) {
			if(topPlayers[i] != null)
			this.add.text(30, posText, topPlayers[i].username + "\t" + topPlayers[i].lvl + "\t" + (topPlayers[i].translated_word == null ? "0" : topPlayers[i].translated_word) + "\t" + (topPlayers[i].guessed_word == null ? "0" : topPlayers[i].guessed_word ), { font: "bold 18px Arial", fill: "#fff", align:"left",  tabs: 132 });
			posText += 50;		
		}	

		this.add.text(30, 450 ,"Your Stats: ", { font: "bold 38px Arial", fill: "#fff", align:"left"});
		playerStats = (playerStats ==  null) ? '0\t0\t0' : playerStats.lvl + "\t" + playerStats.translated + "\t" + playerStats.guessed;
		this.add.text(140, 520, playerStats, { font: "bold 44px Arial", fill: "#007fff", align:"left",tabs: 132});

	},
	update: function(){
		if (playerText1.fontSize < 22)
		{
			playerText1.fontSize += 1;
		}
	},
	backMain: function () {
		game.state.start('MainScreen');
	},
	render: function (){

	}

}	