var userLogged,loaderText,loadImg1,loadImg2,loadImg3,loadImg4,bgMusic,
	BootState = function(){};

BootState.prototype = {
	preload : function() {
		// console.log('%c User detected. Loading JSON. ','background:blue;color:white;');
		this.load.json('getDialects', jsonUrl+'getDialects');
        this.load.json('getUserInfo', jsonUrl+'getUserInfo/user');
        this.load.json('arcadeInfo', jsonUrl+'getUserInfo/arcade');
        this.load.json('getTopPlayers', jsonUrl+'topPlayers');
        this.load.json('playerStats', jsonUrl+'getStats');
        this.load.json('getRandomText', jsonUrl+'getRandomText');
        this.load.json('userSettings', jsonUrl+'userSettings');
        
	   	console.log('%c BootState Preload ','background:blue;color:white;');     
        this.load.image('loaderText', './images/loader-text.png');
        this.load.image('loaderImage', './images/loader-image.png');
        this.load.image('logo', './images/tropical.png');
        this.load.image('playButton', './images/play.png');
        this.load.image('mainBG', './images/main_bg.png');
        this.load.image('settingsButton', './images/settings.png');
        this.load.image('exitButton', './images/exit_red.png');
        this.load.image('exitPopUp', './images/exit_popup.png');
        this.load.image('blackscreen', './images/blackscreen.jpg');
        this.load.image('okayGreen', './images/okay_green.png');
        this.load.image('settingsPopup', './images/settings_popup.png');
        this.load.image('musicSlider','./images/music_slider.png');
        this.load.image('musicSlideButton','./images/music_slide_button.png');
        this.load.image('leaderBoard','./images/leaderboard.png');
        this.load.image('directButton','./images/direct_button.png');
		this.load.image('backButton', './images/back.png');
		this.load.image('board', './images/board.png');
		this.load.image('plus', './images/plus.png');
		this.load.image('minus', './images/minus.png');
		this.load.image('submit', './images/submit.png');
		this.load.image('continue', './images/continue.png');
		this.load.image('skipButton', './images/skip.png');
		this.load.image('confet1', './images/confetti/confe1.png');
		this.load.image('confet2', './images/confetti/confe2.png');
		this.load.image('confet3', './images/confetti/confe3.png');

        this.load.audio('openMusic','./audio/opening.ogg');
        this.load.audio('optionsMusic','./audio/click-options.ogg');
        this.load.audio('playClickMS','./audio/click-game.ogg');
        this.load.audio('failPlay','./audio/fail.ogg');
        this.load.audio('successPlay','./audio/success.ogg');
        this.load.audio('stageCleared','./audio/stage-cleared.ogg');
        this.load.audio('flipMS','./audio/flip.ogg');
        this.load.audio('bgMusic','./audio/bg_sound.mp3');
	},
	create: function (){
		this.add.sprite(0, 0, 'loaderText');
		loadImg1 = this.add.sprite(140, 350, 'loaderImage');
		loadImg1.scale.setTo(0.7,0.7);
		loadImg1.anchor.setTo(0.5, 0.5);
		loadImg2 = this.add.sprite(240, 350, 'loaderImage');
		loadImg2.scale.setTo(0.7,0.7);
		loadImg2.anchor.setTo(0.5, 0.5);
		loadImg3 = this.add.sprite(340, 350, 'loaderImage');
		loadImg3.scale.setTo(0.7,0.7);
		loadImg3.anchor.setTo(0.5, 0.5);
		loadImg4 = this.add.sprite(440, 350, 'loaderImage');
		loadImg4.scale.setTo(0.7,0.7);
		loadImg4.anchor.setTo(0.5, 0.5);
		
		openMusic = game.add.audio('openMusic');
		bgMusic = game.add.audio('bgMusic');
        openMusic.play();
		
		setTimeout(function(){
			console.log('%c Starting MainScreen... ','background:blue;color:white;');
			this.game.stateTransition.to('MainScreen'); 
			// game.state.start('MainScreen'); 
		}, 3000);

		loaderText = game.add.text(this.world.centerX - 50, this.world.centerY + 100, 'Loading...', { font: "bold 28px Arial", fill: "#000", align:"center"});

		game.add.tween(loaderText).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);
		
	},
	update: function (){
		loadImg1.angle += 3;
		loadImg2.angle += 3;
		loadImg3.angle += 3;
		loadImg4.angle += 3;

	},
	render: function (){}
}
