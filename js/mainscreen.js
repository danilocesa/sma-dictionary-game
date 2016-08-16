var logoSprite, playButton,leaderButton, settingsButton, exitButton, blackscreen, okayGreen, exitPopup, exitPopupButton,
    settingsPopup, tweenExit = null, tweenSettings = null, bgMusic, musicSlider, musicSlideButton,directButton,bgMusicVol,sessionValue,optionsMusic,
    mSliderw,getDialects,getUserInfo,
    MainScreen = function() {};

MainScreen.prototype = {

    preload : function() {   
        console.clear();
        console.log('%c MainScreen Preload ', 'background:green;color:white;');
        getDialects = this.cache.getJSON('getDialects'); 
        getUserInfo = this.cache.getJSON('getUserInfo'); 
        this.load.json('userSettings', jsonUrl+'userSettings');
        userSettings = this.cache.getJSON('userSettings'); 
    },

    create: function () {
        optionsMusic = game.add.audio('optionsMusic');
        playClickMS = game.add.audio('playClickMS');
        if(! bgMusic.isPlaying){
            bgMusic.play();
        }
        
        bgMusic.loop = true;
        if(userSettings.music_volume || userSettings.setting_music ){
            bgMusic.volume = userSettings.music_volume;
            mSliderw = userSettings.setting_music;
            optionsMusic.volume = userSettings.music_volume;
            playClickMS.volume = userSettings.music_volume;
        }  else {
            bgMusic.volume = 1;
            optionsMusic.volume = 1;
            playClickMS.volume = 1;
            mSliderw = 285;
        }
       
       
        //Add Background Image
        this.add.sprite(0, 0, 'mainBG');
        //Add logo
        logoSprite = this.add.sprite(( this.world.centerX / 2 ) - 20, 0, 'logo');
        logoSprite.scale.setTo(0.7,0.7);
        //Add play button
        playButton = this.add.button(( this.world.centerX / 2 ) + 10, this.world.centerY - 50, 'playButton',this.startPlay);
        playButton.scale.setTo(0.7,0.7);
        playButton.inputEnabled = true;
        playButton.input.useHandCursor = true;
         //Add direct button
        directButton = this.add.button(( this.world.centerX / 2 ) + 60, this.world.centerY + 120, 'directButton',this.directTranslate);
        directButton.scale.setTo(0.7,0.7);
        directButton.inputEnabled = true;
        directButton.input.useHandCursor = true;
        //Add leader board button
        leaderButton = this.add.button(this.world.centerX + 60, this.world.centerY + 255, 'leaderBoard', this.leaderGame);
        leaderButton.scale.setTo(0.2,0.2);
        leaderButton.inputEnabled = true;
        leaderButton.input.useHandCursor = true;
        //Add settings button
        settingsButton = this.add.button(this.world.centerX + 130, this.world.centerY + 255, 'settingsButton', this.setGame);
        settingsButton.scale.setTo(0.2,0.2);
        settingsButton.inputEnabled = true;
        settingsButton.input.useHandCursor = true;
        //Add exit button
        exitButton = this.add.button(this.world.centerX + 200, this.world.centerY + 255, 'exitButton', this.exitGame);
        exitButton.scale.setTo(0.2,0.2);
        exitButton.inputEnabled = true;
        exitButton.input.useHandCursor = true;


        blackscreen = this.add.tileSprite(0, 0, 550, 650,'blackscreen');
        blackscreen.alpha = 0.8;
        blackscreen.visible = false;

        /** Exit popup dialog **/
        exitPopup = this.add.group(); //Create exitPopup group      
        var exitPopUpDialog = this.add.sprite(( this.world.centerX / 2 ) - 75, (this.world.centerY / 2) - 60, 'exitPopUp'); // Exit dialog screen
        
        okayGreenExit = this.make.sprite( (exitPopUpDialog.width / 2) + 50 , (exitPopUpDialog.height / 2) + 98, 'okayGreen');
        okayGreenExit.scale.setTo(0.3,0.3);
        okayGreenExit.inputEnabled = false;
        okayGreenExit.events.onInputDown.add(this.closeApp, this);
        
        exitPopupButton = this.make.sprite( (exitPopUpDialog.width / 2) - 120, (exitPopUpDialog.height / 2) + 105, 'exitButton');
        exitPopupButton.scale.setTo(0.26,0.26);
        exitPopupButton.inputEnabled = false;
        exitPopupButton.events.onInputDown.add(this.exitPopUp, this);
        
        exitPopUpDialog.addChild(okayGreenExit);
        exitPopUpDialog.addChild(exitPopupButton);

        exitPopup.add(exitPopUpDialog);
        exitPopup.alpha = 0;
        exitPopup.scale.set(0);
        /** End exit popup dialog **/

        /** Settings popup dialog **/
        settingsPopup = this.add.group(); // Create settings popup dialog
        var settingsPopupDialog = this.add.sprite(this.world.centerX - 170, this.world.centerY - 240, 'settingsPopup'); //Settings dialog screen

        okayGreenSettings = this.make.button((settingsPopupDialog.width / 2) + 30 , (settingsPopupDialog.height / 2) + 100, 'okayGreen');
        okayGreenSettings.scale.setTo(0.3,0.3);
        okayGreenSettings.inputEnabled = true;
        okayGreenSettings.input.useHandCursor = true;
        okayGreenSettings.events.onInputDown.add(this.saveSettings, this);

        exitSettings = this.add.button((settingsPopupDialog.width / 2 ) - 105  , (settingsPopupDialog.height / 2) + 105, 'exitButton');
        exitSettings.scale.setTo(0.26,0.26);
        exitSettings.inputEnabled = true;
        exitSettings.input.useHandCursor = true;
        exitSettings.events.onInputDown.add(this.exitSettings, this);

        musicSlider = this.add.sprite((settingsPopupDialog.width / 2 ) - 26, (settingsPopupDialog.height / 2 ) - 38, 'musicSlider');
        musicSlider.scale.setTo(0.89,0.64);

        // if(mSliderw == null || mSliderw == 'undefined'){
        //     mSliderw = (settingsPopupDialog.width / 2 ) + 105;
        // } else{
            // mSliderw = mSliderw;
            
            
        // }
        musicSlideButton = this.add.sprite(mSliderw, (settingsPopupDialog.height / 2 ) - 39, 'musicSlideButton');
        musicSlideButton.scale.setTo(0.25,0.2);
        musicSlideButton.inputEnabled = true;
        musicSlideButton.input.useHandCursor = true;
        musicSlideButton.input.enableDrag(true);
        musicSlideButton.input.boundsSprite = musicSlider;
        musicSlideButton.input.allowVerticalDrag = false;
        musicSlideButton.events.onDragStop.add(this.changeVolume, this);

        settingsPopupDialog.addChild(okayGreenSettings);
        settingsPopupDialog.addChild(exitSettings);
        settingsPopupDialog.addChild(musicSlider);
        settingsPopupDialog.addChild(musicSlideButton);

        settingsPopup.add(settingsPopupDialog);
        settingsPopup.alpha = 0;
        settingsPopup.scale.set(0);

        /** End settings popup **/

    },

    update: function () {},

    /** Show exit dialog popup **/
    exitGame: function () {
        console.log('%c Exit Popup ', 'background:green;color:white;');
        optionsMusic.play();
        directButton.input.enabled = false;
        playButton.input.enabled = false;
        leaderButton.input.enabled = false;
        settingsButton.input.enabled = false;
        exitButton.input.enabled = false;

        if ((tweenExit !== null && tweenExit.isRunning) || exitPopup.scale.x === 1)
        {   
            okayGreenExit.inputEnabled = false;
            exitPopupButton.inputEnabled = false;
            return;
        }

        var tweenexit = game.add.tween(exitPopup.scale)
        tweenExit = tweenexit.to( { x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true);
        tweenexit.onComplete.add(function(){
            okayGreenExit.inputEnabled = true;
            okayGreenExit.input.useHandCursor = true;
            exitPopupButton.inputEnabled = true;
            exitPopupButton.input.useHandCursor = true;
        }, this);
        tweenexit.start();

        exitPopup.alpha = 1;
        blackscreen.visible = true;
        
    },

    /** Close exit popup dialog **/
    exitPopUp: function () {
        console.log('%c Exit Popup Close ', 'background:green;color:white;');
        optionsMusic.play();
        if (tweenExit && tweenExit.isRunning || exitPopup.scale.x === 0.1)
        {
            return;
        }

        tweenExit = game.add.tween(exitPopup.scale).to( { x: 0.1, y: 0.1 }, 500, Phaser.Easing.Elastic.In, true);
        directButton.input.enabled = true;
        playButton.input.enabled = true;
        leaderButton.input.enabled = true;
        settingsButton.input.enabled = true;
        exitButton.input.enabled = true;
        exitPopup.alpha = 0;
        playButton.visible = true;
        settingsButton.visible = true;
        blackscreen.visible = false;
        
    },
    leaderGame: function (){
        console.log('%c Leader board state ', 'background:green;color:white;');
        optionsMusic.play();
        this.game.stateTransition.to('Leader Board'); 
        // game.state.start('Leader Board');
    },
    /** Close the game **/
    closeApp: function () {
        callAjax("deleteSession", "GET",'',function(result){
            if(result){
                location.reload();
            }

        });
        
        // window.close();
    },

    /** Show settings dialog popup **/
    setGame: function () {
        console.log('%c Settings Popup ', 'background:green;color:white;');
        optionsMusic.play();
        directButton.input.enabled = false;
        playButton.input.enabled = false;
        leaderButton.input.enabled = false;
        settingsButton.input.enabled = false;
        exitButton.input.enabled = false;
        if ((tweenSettings !== null && tweenSettings.isRunning) || settingsPopup.scale.x === 1)
        {
            return;
        }
        
        var tweenset = game.add.tween(settingsPopup.scale);
        tweenSettings = tweenset.to( { x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true);
        tweenset.onComplete.add(function(){
            if(document.getElementById("dialect_select") == null ){
                var $selectDialect = document.createElement('select');
                $selectDialect.id = "dialect_select";
                var $main_content = document.getElementById('main-content'); 
                $main_content.appendChild($selectDialect);
                var $sel = document.getElementById("dialect_select");
                Object.keys(getDialects).reverse().forEach(function(key) { 
                  var $option = document.createElement("option");
                  $option.value = getDialects[key].dialect_id;
                  $option.text = getDialects[key].dialect;
                  if(getUserInfo.dialect == getDialects[key].dialect_id){
                    $option.selected = true;
                  }
                  $sel.insertBefore($option, $sel.options[1]);
                });

                document.getElementsByTagName("canvas")[0].style.zIndex = '1';
                document.getElementById('dialect_select').style.zIndex = '2';
                document.getElementById('dialect_select').style.position = 'relative';
                document.getElementById('dialect_select').style.top = '280px';
                document.getElementById('dialect_select').style.left = '255px';
                document.getElementById('dialect_select').style.width = '155px';
            }
            else{
              document.getElementById("dialect_select").style.display = '';
            }

        }, this);
        tweenset.start();
        settingsPopup.alpha = 1;
        blackscreen.visible = true; 

    },
    /** Save User Settings **/
    saveSettings: function () {
        console.log('%c Saving settings ', 'background:green;color:white;');
        optionsMusic.play();
        callAjax("saveUserSettings", "POST",{dialect: document.getElementById('dialect_select').value, musicPos: mSliderw, musicVol: bgMusicVol},function (result) {
            directButton.input.enabled = true;
            playButton.input.enabled = true;
            leaderButton.input.enabled = true;
            settingsButton.input.enabled = true;
            exitButton.input.enabled = true;
            if(document.getElementById("dialect_select") != null ){
              document.getElementById("dialect_select").style.display = 'none';
            }  

            tweenSettings = game.add.tween(settingsPopup.scale).to( { x: 0.1, y: 0.1 }, 500, Phaser.Easing.Elastic.In, true);
            settingsPopup.alpha = 0;
            blackscreen.visible = false; 
        });
    },
    /** Close the settings pop up **/
    exitSettings: function () {
        console.log('%c Close settings popup ', 'background:green;color:white;');
        optionsMusic.play();
        directButton.input.enabled = true;
        playButton.input.enabled = true;
        leaderButton.input.enabled = true;
        settingsButton.input.enabled = true;
        exitButton.input.enabled = true;
        if (tweenSettings && tweenSettings.isRunning || settingsPopup.scale.x === 0.1)
        {
            return;
        }
        if(document.getElementById("dialect_select") != null ){
          document.getElementById("dialect_select").style.display = 'none';
        }  
        mSliderw = userSettings.setting_music;
        tweenSettings = game.add.tween(settingsPopup.scale).to( { x: 0.1, y: 0.1 }, 500, Phaser.Easing.Elastic.In, true);
        settingsPopup.alpha = 0;
        blackscreen.visible = false;

    },

    changeVolume: function (pointer) {
        console.log('%c Changing volume ', 'background:green;color:white;');
        mSliderw = pointer.x;
        if(pointer.x > 160){
            bgMusic.mute = false;   
        }
        if (pointer.x <= 160){
            bgMusic.mute = true;
            bgMusicVol = 0;
            optionsMusic.volume = 0;
            playClickMS.volume = 0;
        }
        else if (pointer.x <= 280 && pointer.x >= 270){
            bgMusic.volume = 0.7;
            bgMusicVol = 0.7;
            optionsMusic.volume = 0.7;
            playClickMS.volume = 0.7;
        }
        else if (pointer.x <= 269 && pointer.x >= 250){
            bgMusic.volume = 0.6;
            bgMusicVol = 0.6;
            optionsMusic.volume = 0.6;
            playClickMS.volume = 0.6;
        }
        else if (pointer.x <= 249 && pointer.x >= 230){
            bgMusic.volume = 0.5;
            bgMusicVol = 0.5;
            optionsMusic.volume = 0.5;
            playClickMS.volume = 0.5;
        }
        else if (pointer.x <= 229 && pointer.x >= 210){
            bgMusic.volume = 0.4;
            bgMusicVol = 0.4;
            optionsMusic.volume = 0.4;
            playClickMS.volume = 0.4;
        }
        else if (pointer.x <= 209 && pointer.x >= 199){
            bgMusic.volume = 0.3;
            bgMusicVol = 0.3;
            optionsMusic.volume = 0.3;
            playClickMS.volume = 0.3;
        }
        else if (pointer.x <= 198 && pointer.x > 161){
            bgMusic.volume = 0.2;
            bgMusicVol = 0.2;
            optionsMusic.volume = 0.2;
            playClickMS.volume = 0.2;
        }
        else{
            bgMusic.volume = 1;  
            bgMusicVol = 1;
            optionsMusic.volume = 1;
            playClickMS.volume = 1;
        }
    },
    disableButton: function (){
        directButton.input.enabled = false;
        playButton.input.enabled = false;
        leaderButton.input.enabled = false;
        settingsButton.input.enabled = false;
        exitButton.input.enabled = false;
    },
    directTranslate: function () {
        console.log('%c Direct Translate state ', 'background:green;color:white;');
        playClickMS.play();
        this.game.stateTransition.to('DirectLoad');
        // game.state.start('DirectLoad');
    },

    startPlay: function () {
        console.log('%c Play state ', 'background:green;color:white;');
        playClickMS.play();
        this.game.stateTransition.to('Play');
        // game.state.start('Play');
    },

    render: function () {
        // game.debug.body(musicSlider, 'green', false);
        // game.debug.spriteBounds(musicSlider, 'red', false);
    }
}