var logoSprite, playButton,leaderButton, settingsButton, exitButton, blackscreen, okayGreen, exitPopup, exitPopupButton,
    settingsPopup, tweenExit = null, tweenSettings = null, bgMusic, musicSlider, musicSlideButton,directButton,bgMusicVol,sessionValue,
    mSliderw,getDialects,getUserInfo,
    MainScreen = function() {};

MainScreen.prototype = {
     preload : function() {   
        getDialects = this.cache.getJSON('getDialects'); 
        getUserInfo = this.cache.getJSON('getUserInfo'); 
    },

    create: function () {

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
        okayGreenExit.inputEnabled = true;
        okayGreenExit.input.useHandCursor = true;
        okayGreenExit.events.onInputDown.add(this.closeApp, this);
        
        exitPopupButton = this.make.sprite( (exitPopUpDialog.width / 2) - 120, (exitPopUpDialog.height / 2) + 105, 'exitButton');
        exitPopupButton.scale.setTo(0.26,0.26);
        exitPopupButton.inputEnabled = true;
        exitPopupButton.input.useHandCursor = true;
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
            mSliderw = (settingsPopupDialog.width / 2 ) + 105;
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

    update: function () {
      
    },

    /** Show exit dialog popup **/
    exitGame: function () {
        if ((tweenExit !== null && tweenExit.isRunning) || exitPopup.scale.x === 1)
        {
            return;
        }
        tweenExit = game.add.tween(exitPopup.scale).to( { x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true);
        exitPopup.alpha = 1;
        playButton.visible = false;
        settingsButton.visible = false;
        blackscreen.visible = true;
    },

    /** Close exit popup dialog **/
    exitPopUp: function () {
        if (tweenExit && tweenExit.isRunning || exitPopup.scale.x === 0.1)
        {
            return;
        }
        tweenExit = game.add.tween(exitPopup.scale).to( { x: 0.1, y: 0.1 }, 500, Phaser.Easing.Elastic.In, true);
        exitPopup.alpha = 0;
        playButton.visible = true;
        settingsButton.visible = true;
        blackscreen.visible = false;
        
    },
    leaderGame: function (){
        game.state.start('Leader Board');
    },
    /** Close the game **/
    closeApp: function () {
        window.close();
    },

    /** Show settings dialog popup **/
    setGame: function () {
        directButton
        if ((tweenSettings !== null && tweenSettings.isRunning) || settingsPopup.scale.x === 1)
        {
            return;
        }
        if(document.getElementById("dialect_select") == null ){
            var $selectDialect = document.createElement('select');
            $selectDialect.id = "dialect_select";
            var $main_content = document.getElementById('main-content'); 
            $main_content.appendChild($selectDialect);
            var $sel = document.getElementById("dialect_select");
            Object.keys(getDialects).forEach(function(key) { 
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
    
        tweenSettings = game.add.tween(settingsPopup.scale).to( { x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true);
        settingsPopup.alpha = 1;
        playButton.visible = false;
        exitButton.visible = false;
        blackscreen.visible = true; 

    },
    /** Save User Settings **/
    saveSettings: function () {
        callAjax("saveUserSettings", "POST",{dialect: document.getElementById('dialect_select').value},function (result) {
            if(document.getElementById("dialect_select") != null ){
              document.getElementById("dialect_select").style.display = 'none';
            }  
            //  Create a tween that will close the window, but only if it's not already tweening or closed
            tweenSettings = game.add.tween(settingsPopup.scale).to( { x: 0.1, y: 0.1 }, 500, Phaser.Easing.Elastic.In, true);
            settingsPopup.alpha = 0;
            playButton.visible = true;
            exitButton.visible = true;
            blackscreen.visible = false; 
        });
    },
    /** Close the settings pop up **/
    exitSettings: function () {
        if (tweenSettings && tweenSettings.isRunning || settingsPopup.scale.x === 0.1)
        {
            return;
        }
        if(document.getElementById("dialect_select") != null ){
          document.getElementById("dialect_select").style.display = 'none';
        }  

        //  Create a tween that will close the window, but only if it's not already tweening or closed
        tweenSettings = game.add.tween(settingsPopup.scale).to( { x: 0.1, y: 0.1 }, 500, Phaser.Easing.Elastic.In, true);
        settingsPopup.alpha = 0;
        playButton.visible = true;
        exitButton.visible = true;
        blackscreen.visible = false;

    },

    changeVolume: function (pointer) {
        mSliderw = pointer.x;
        if (pointer.x <= 160){
            bgMusic.mute = true;
        }
        else if (pointer.x <= 280 && pointer.x >= 270){
            bgMusic.volume = 0.7;
            bgMusicVol = 0.7;
        }
        else if (pointer.x <= 269 && pointer.x >= 250){
            bgMusic.volume = 0.6;
            bgMusicVol = 0.6;
        }
        else if (pointer.x <= 249 && pointer.x >= 230){
            bgMusic.volume = 0.5;
            bgMusicVol = 0.5;
        }
        else if (pointer.x <= 229 && pointer.x >= 210){
            bgMusic.volume = 0.4;
            bgMusicVol = 0.4;
        }
        else if (pointer.x <= 209 && pointer.x >= 199){
            bgMusic.volume = 0.3;
            bgMusicVol = 0.3;
        }
        else if (pointer.x <= 198 && pointer.x > 161){
            bgMusic.volume = 0.2;
            bgMusicVol = 0.2;
        }
        else{
            bgMusic.volume = 1;  
            bgMusicVol = 1;
        }
    },

    directTranslate: function () {
        game.state.start('Direct Translate');
    },

    startPlay: function () {
        game.state.start('Play');
    },

    render: function () {
        // game.debug.body(musicSlider, 'green', false);
        // game.debug.spriteBounds(musicSlider, 'red', false);
    }
}