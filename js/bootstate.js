var userLogged,loaderText,
	BootState = function(){};

BootState.prototype = {
	preload : function() {

		this.load.json('getDialects', jsonUrl+'getDialects');
        this.load.json('getUserInfo', jsonUrl+'getUserInfo/user');
        this.load.json('arcadeInfo', jsonUrl+'getUserInfo/arcade');
        this.load.json('getTopPlayers', jsonUrl+'topPlayers');
        this.load.json('playerStats', jsonUrl+'getStats');
        this.load.json('getRandomText', jsonUrl+'getRandomText');

        this.load.image('loader', './images/loader.gif');
        this.load.image('logo', './images/tropicalv2-min.png');
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


        this.load.audio('bgMusic','./audio/bg_sound.mp3');
	},
	create: function (){
		this.load.onLoadStart.add(this.loadStart, this);
		this.add.sprite(-120, -120, 'loader');
		if(bgMusic == 'undefined' || bgMusic == null){
            bgMusic = game.add.audio('bgMusic');
            bgMusic.play();
            bgMusic.volume = bgMusicVol ? bgMusicVol : 1;
        }
		callAjax('getUserLogged','GET','',function(response){
		if(response)
			setTimeout(function(){ game.state.start('MainScreen'); }, 5000);
			
		});
		loaderText = this.add.text(32, 32, 'Click to start load', { fill: '#000' });
		
	},
	loadStart: function (){
		loaderText.setText("Loading ...");
	},
	update: function (){},
	render: function (){}
}
