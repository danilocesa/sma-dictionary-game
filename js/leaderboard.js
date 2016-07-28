var  playerText1,playerText2,playerText3,playerText4,playerText5,playerText6,playerText7,playerText8,playerText9,playerText10,
	LeaderBoard = function() {};

LeaderBoard.prototype = {

	preload : function() {
		this.load.image('backButton', './images/back.png');
		this.load.image('mainBG', './images/main_bg.png');
		
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
		if(topPlayers[1] != null){
			playerText2 = this.add.text(30, 200, topPlayers[1].username + "\t" + topPlayers[1].lvl + "\t" + (topPlayers[1].translated_word == null ? "0" : topPlayers[1].translated_word) + "\t" + (topPlayers[1].guessed_word == null ? "0" : topPlayers[1].guessed_word ), { font: "bold 18px Arial", fill: "#fff", align:"left",  tabs: 132 });
		}
		
		if(topPlayers[2] != null){
			playerText3 = this.add.text(30, 250, topPlayers[2].username + "\t" + topPlayers[2].lvl + "\t" + (topPlayers[2].translated_word == null ? "0" : topPlayers[2].translated_word) + "\t" + (topPlayers[2].guessed_word == null ? "0" : topPlayers[2].guessed_word ), { font: "bold 18px Arial", fill: "#fff", align:"left",tabs: 132 });
		}

		if(topPlayers[3] != null){
			playerText4 = this.add.text(30, 300, topPlayers[3].username + "\t" + topPlayers[3].lvl + "\t" + (topPlayers[3].translated_word == null ? "0" : topPlayers[3].translated_word) + "\t" + (topPlayers[3].guessed_word == null ? "0" : topPlayers[3].guessed_word ), { font: "bold 18px Arial", fill: "#fff", align:"left",tabs: 132 });
		}

		if(topPlayers[4] != null){
			playerText5 = this.add.text(30, 350, topPlayers[4].username + "\t" + topPlayers[4].lvl + "\t" + (topPlayers[4].translated_word == null ? "0" : topPlayers[4].translated_word) + "\t" + (topPlayers[4].guessed_word == null ? "0" : topPlayers[4].guessed_word ), { font: "bold 18px Arial", fill: "#fff", align:"left",tabs: 132});
		}

		this.add.text(30, 450 ,"Your Stats: ", { font: "bold 38px Arial", fill: "#fff", align:"left"});

		this.add.text(140, 520, playerStats.lvl + "\t" + playerStats.translated + "\t" + playerStats.guessed, { font: "bold 48px Arial", fill: "#007fff", align:"left",tabs: 132});


		console.log(playerStats);
	},
	update: function(){
		if (playerText1.fontSize < 28)
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