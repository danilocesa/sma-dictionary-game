var  playerText1,loaderImage,
	LeaderBoard = function() {};

LeaderBoard.prototype = {

	preload : function() {
		console.log('%c Leader Board Preload ', 'background:red;color:white;');
		this.load.json('getTopPlayers', jsonUrl+'topPlayers');
		this.load.json('playerStats', jsonUrl+'getStats');
		topPlayers = this.cache.getJSON('getTopPlayers');
		playerStats = this.cache.getJSON('playerStats');
	},
	create: function (){
		loaderImage = this.add.sprite(game.world.centerX,game.world.centerY,'loaderImage');
        loaderImage.alpha = 0;

		setTimeout(function(){
			game.add.tween(loaderImage).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);
			game.state.start('Leader Board');
		}, 10000);

		this.add.sprite(0, 0, 'mainBG');
		
		var blackscreen = game.add.graphics();
   		blackscreen.beginFill(0x000000, 0.7);
    	blackscreen.drawRect(0, 0, 550, 650);

		backButton = this.add.button(10, 5, 'backButton',this.backMain);
		backButton.scale.setTo(0.4,0.4);
		backButton.inputEnabled = true;
        backButton.input.useHandCursor = true;

		this.add.text(this.world.centerX - 100, 30, 'Top Players', { font: "bold 38px Arial", fill: "#ffd700", align:"center",boundsAlignH: "center", boundsAlignV: "center"});

		this.add.text(30, 100, "Name\tLevel\tTranslated\tGuess\tScore", { font: "bold 20px Arial", fill: "#fff", align:"left",tabs: 49});

		if(topPlayers == null){
			this.add.text(100, 220, 'Currently no players', { font: "bold 38px Arial", fill: "red", align:"left"});
			this.add.text(60, 290, 'Play now to be listed here', { font: "bold 35px Arial", fill: "red", align:"left"});
		}else {
			playerText1 = this.add.text(30, 150, topPlayers[0].username + "\t" + topPlayers[0].lvl + "\t" + (topPlayers[0].translated_word == null ? "0" : topPlayers[0].translated_word) + "\t" + (topPlayers[0].guessed_word == null ? "0" : topPlayers[0].guessed_word ) + " \t " + (topPlayers[0].total_score == null ? "0" : topPlayers[0].total_score ), { font: "bold 7px Arial", fill: "#41d207", align:"left", tabs: 111});

			var posText = 200;
			for (var i = 1; i < topPlayers.length; i++) {
				if(topPlayers[i] != null)
				this.add.text(30, posText, topPlayers[i].username + "\t" + topPlayers[i].lvl + "\t" + (topPlayers[i].translated_word == null ? "0" : topPlayers[i].translated_word) + "\t" + (topPlayers[i].guessed_word == null ? "0" : topPlayers[i].guessed_word ) + "\t" + (topPlayers[i].total_score == null ? "0" : topPlayers[i].total_score ), { font: "bold 18px Arial", fill: "#fff", align:"left",  tabs: 112 });
				posText += 50;		
			}	

			this.add.text(25, 450 ,"Your Stats: ", { font: "bold 38px Arial", fill: "#fff", align:"left"});
			playerStats = (playerStats ==  null) ? '0\t0\t0\t0' : playerStats.lvl + "\t" + playerStats.translated + "\t" + playerStats.guessed + "\t" + playerStats.total_score;
			this.add.text(140, 520, playerStats, { font: "bold 40px Arial", fill: "#007fff", align:"left",tabs: 95});
		}
		

	},
	update: function(){
		if(topPlayers != null){
			if (playerText1.fontSize < 18)
			{
				playerText1.fontSize += 1;
			}
		}
		

		
	},
	backMain: function () {
		console.log('%c Back to MainScreen', 'background:red;color:white;');
		game.add.tween(loaderImage).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);
		game.state.start('MainScreen');
	},
	render: function (){

	}

}	