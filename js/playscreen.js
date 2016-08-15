var backButton,level = 1,arcadeInfo,levelText,jumbleWordsGroup,sentiGroup,gameState = null,continueButton,dialectText,sentiButton = 2,checkback = 0,sentiText,skipButton,inputTranslate,emitterLeft,emitterRight,errorText = null,
	PlayScreen = function(){};

PlayScreen.prototype = {
	preload : function() {
		arcadeInfo = this.cache.getJSON('arcadeInfo'); 	
		this.load.image('mapBG', './images/arcades/'+arcadeInfo.arcade_map);
		console.log('%c Play Preload ', 'background:yellow;color:black;');
	},
	create: function () { 
		if(checkback == 1){
			checkback = 0;
			gameState = null;
			game.state.restart();
		}
		failPlay = game.add.audio('failPlay');
		successPlay = game.add.audio('successPlay');
		stageCleared = game.add.audio('stageCleared');
		flipMS = game.add.audio('flipMS');
		this.add.sprite(0, 0, 'mapBG');// Add background

		backButton = this.add.button(10, 5, 'backButton',this.backMain);
		backButton.scale.setTo(0.4,0.4);
		backButton.inputEnabled = true;
        backButton.input.useHandCursor = true;

        submitButton = this.add.button(this.world.centerX + 70, this.world.centerY + 210, 'submit',this.savePlay);
		submitButton.scale.setTo(0.6,0.6);
		submitButton.inputEnabled = false;
        submitButton.alpha = 0.5;

        skipButton = this.add.button(10, 585, 'skipButton',this.skip);
		skipButton.scale.setTo(0.4,0.4);
		skipButton.inputEnabled = true;
        skipButton.input.useHandCursor = true;

        boardGroup = this.add.group();
        board = this.add.sprite(455 , 20, 'board');

       	board.width = 180;
       	board.height = 180;
        board.anchor.setTo(0.5, 0.5);

        boardGroup.addChild(board);

        levelText = game.add.text(this.world.centerX + 135, 60, arcadeInfo.level_name, { font: "bold 28px Arial", fill: "#000", align:"center",boundsAlignH: "center", boundsAlignV: "center" });

        boardGroup.addChild(levelText);
    	
    	if(gameState != 'translate'){
        	game.add.text(105, 75, 'Guess the word:', { font: "bold 18px Arial", fill: "#fff", align:"center",boundsAlignH: "center", boundsAlignV: "center",stroke:"black",strokeThickness:1 });
    	}
        //Split jumble words
		jumbleWordsGroup = this.add.group();

		 if(gameState == 'translate'){
        	this.checkJumble();
        	dialectText = game.add.text(this.world.centerX - 65, 165, arcadeInfo.synset_terms,{ font: "bold 58px Arial", fill: "#fff", align:"center", boundsAlignH: "center", boundsAlignV: "middle"});
        }	
    	else{
	        for (var i = 0; i < arcadeInfo.jumble_words.length; i++) {
	        	var jumbBmd = 'jumbBmd'+ i;
	        	var widthSep = i * 55;
			    jumbBmd = game.add.bitmapData(100, 100, 'jumbwords'+i);
			    jumbBmd.ctx.arc(50, 50, 50, 0, 2 * Math.PI);
		    	jumbBmd.ctx.fillStyle = '#FFF';
		    	jumbBmd.ctx.fill();
		    	jumbBmd.text(arcadeInfo.jumble_words.charAt(i), 35, 62, '28pt Arial', 'rgb(0, 0, 0)', false);

		    	var circleSprite = 'cicleSprite'+i;
		    	circleSprite = this.add.sprite(this.world.centerX - widthSep + 80,-100, jumbBmd,i);	
		    	circleSprite.width = 50;
		    	circleSprite.height = 50;
	    		circleSprite.anchor.set(0.5, 0.5);

	    		jumbleWordsGroup.addChild(circleSprite);

	    		if(i == 4){
					circleSprite.x = circleSprite.x;
				} else if(i <= 6 && i > 4){
					jumbleWordsGroup.x = 80;
				}  else if(i <= 8 && i > 6){
					jumbleWordsGroup.x = 130;
				} else if(i >= 9){
					circleSprite.x = this.world.centerX * i;
				} else {

				}

				if(i >= 9){
					game.add.tween(circleSprite).to({y: 240}, 2400, Phaser.Easing.Bounce.Out, true, 500 * i);
				} else {
					game.add.tween(circleSprite).to({y: 160}, 2400, Phaser.Easing.Bounce.Out, true, 500 * i);
				}

		        // Add another rotation tween to the same character.
		        game.add.tween(circleSprite).to({angle: 360}, 2400, Phaser.Easing.Cubic.In, true, 500 * i);
	    		
			}
		}
		var glossBar = this.add.graphics();
   		glossBar.beginFill(0x000000, 0.4);
    	glossBar.drawRect(25, (this.world.centerX) + 50 , 500, 130);


    	hintText = game.add.text(35, (this.world.centerX) + 53 , 'Hint :', { font: "bold 16px Arial", fill: "#fff", align:"center", wordWrap:true, wordWrapWidth:480});

    	glossText = game.add.text(35, (this.world.centerX) + 75 , arcadeInfo.gloss, { font: "bold 16px Arial", fill: "#fff", align:"center", wordWrap:true, wordWrapWidth:480});


    	inputTranslate = this.add.inputField(95, (this.world.centerX) + 190, {
            font: '18px Arial',
            height: 24,
            fill: '#000',
            fontWeight: 'bold',
            width: 350,
            padding: 8,
            borderWidth: 3,
            borderColor: '#000',
            borderRadius: 6,
            textAlign: 'center',
            zoom: true
        });

	},
	update: function () {
		if(inputTranslate.value.length > 0){
			submitButton.inputEnabled = true;
			submitButton.input.useHandCursor = true;
			submitButton.alpha = 1;
		} else{
			submitButton.inputEnabled = false;
			submitButton.input.useHandCursor = false;
			submitButton.alpha = 0.5;
		}
	},
	start: function () {},
	backMain: function () {
		console.log('%c Back to MainScreen ', 'background:yellow;color:black;');
		optionsMusic.play();
		if(gameState == 'translate'){
			checkback = 1;
		}
		game.state.start('MainScreen');
	},
	skip: function () {
		console.log('%c Skipping ', 'background:yellow;color:black;');
		optionsMusic.play();
		callAjax("deductScore", "GET",'',function (result) { game.state.start('PlayLoad'); });	
	},
	savePlay: function(){
		console.log('%c Saving ', 'background:yellow;color:black;');
		if(inputTranslate.value != ''){
			errorText = game.add.text(185, (game.world.centerX) + 240, ' ', { font: "bold 18px Arial", fill: "red", align:"center"});
			if(gameState != 'translate'){
				errorText.setText(' ');
				//Check alphanumeric
				if(! /^[a-zA-Z\s]*$/.test(inputTranslate.value.toLowerCase())){
					failPlay.play();
					game.plugins.screenShake.shake(7);
					inputTranslate.setText('');
					errorText.setText('Letters Only');
					setTimeout(function(){ errorText.setText(' '); },1000); 
				} else{
					//Check jumblewords
					if(inputTranslate.value.toLowerCase() == arcadeInfo.synset_terms.toLowerCase() ){ //Correct Word
						gameState = 'translate';
						var blackscreen = game.add.graphics();
				   		blackscreen.beginFill(0x000000, 0.7);
				    	blackscreen.drawRect(0, 0, 550, 650);
				    	continueButton = game.add.button(game.world.centerX - 90, game.world.centerY + 190, 'continue',function(){ game.state.start('Play',true,false); });
						continueButton.scale.setTo(0.6,0.6);
						continueButton.inputEnabled = true;
				        continueButton.input.useHandCursor = true;
		        		var successText = game.add.text(game.world.centerX - 105, 30, 'Correct!', { font: "bold 58px Arial", fill: "#fff", align:"center", boundsAlignH: "center", boundsAlignV: "middle"});
		        		var successWords = game.add.text(game.world.centerX - 125, 100, "You've guessed the word.", { font: "bold 22px Arial", fill: "#fff", align:"left"});
		        		var correctText = game.add.text(game.world.centerX - 65, 250, arcadeInfo.synset_terms, { font: "bold 58px Arial", fill: "#fff", align:"center", boundsAlignH: "center", boundsAlignV: "middle"});
		        		var continueText = game.add.text(game.world.centerX - 165, game.world.centerY + 150, 'Translate the word to move next level', { font: "bold 20px Arial", fill: "#fff", align:"center", boundsAlignH: "center", boundsAlignV: "middle"});
						callAjax("saveScore", "POST",{ guessed :1 },function (result) {});	

						stageCleared.play();
						emitterLeft = game.add.emitter(70, -20, 200);

					    //  Here we're passing an array of image keys. It will pick one at random when emitting a new particle.
					    emitterLeft.makeParticles(['confet1', 'confet2', 'confet3']);

					    emitterLeft.start(false, 5000, 50);

					    emitterRight = game.add.emitter(480, -20, 200);

					    //  Here we're passing an array of image keys. It will pick one at random when emitting a new particle.
					    emitterRight.makeParticles(['confet1', 'confet2', 'confet3']);

					    emitterRight.start(false, 5000, 50);

					} else { //False
						failPlay.play();
						game.plugins.screenShake.shake(7);
						inputTranslate.setText('');
						errorText.setText('Incorrect Guess!');
						setTimeout(function(){ errorText.setText(' '); },1000); 
					}
				}	
			} else{
				if(sentiButton == 2){
					sentiText = game.add.text(game.world.centerX - 150,  game.world.centerY - 280, "Please choose sentiment", { font: "bold 12px Arial", fill: "red",wordWrap:true,wordWrapWidth:200});
					failPlay.play();
					game.plugins.screenShake.shake(7);
					sentiText.text = 'Please choose sentiment';
				} else {
					callAjax("saveTranslate", "POST",{ base_id: arcadeInfo.base_id, translated: inputTranslate.value, sentiment: sentiButton,uaTB:1,aLevel: arcadeInfo.arcade_id, phase: 1 },function (result) {
						if(result == 'success')
							successPlay.play();
							checkback = 0;
							gameState = null;
							game.state.start('PlayLoad');
					});
				}
			}
		}
		else{
			alert('Please input guess word!');
		}

	},
	checkJumble: function (){

		sentiGroup = this.add.group();

		plus = this.add.button(this.world.centerX - 115, this.world.centerY + 120, 'plus',function(){
			sentiButton = 1;
			plusText.fill = '#000';
			plus.alpha = 1;
			minusText.fill = '#cccccc';
			minus.alpha = 0.5;
		});
        plus.name = "plus";
        plus.scale.setTo(0.25,0.25);
        plus.anchor.setTo(0.5, 0.5);
		plus.inputEnabled = true;
        plus.input.useHandCursor = true;
     
     	sentiGroup.addChild(plus);

        minus = this.add.button(this.world.centerX - 115, this.world.centerY + 155, 'minus',function(){
			sentiButton = 0;
        	minusText.fill = '#000';
			minus.alpha = 1;
			plusText.fill = '#cccccc';
			plus.alpha = 0.5;
        });
        minus.name = "minus";
        minus.scale.setTo(0.25,0.25);
        minus.anchor.setTo(0.5, 0.5);
		minus.inputEnabled = true;
        minus.input.useHandCursor = true;

        sentiGroup.addChild(minus);

        plusText = this.add.text(this.world.centerX - 95,  this.world.centerY + 110, "positive sentiment", { font: "bold 18px Arial", fill: "#fff",boundsAlignH: "left", boundsAlignV: "left"});
        sentiGroup.addChild(plusText);

        minusText = this.add.text(this.world.centerX - 95,  this.world.centerY + 145, "negative sentiment", { font: "bold 18px Arial", fill: "#fff",boundsAlignH: "left", boundsAlignV: "left"});
        sentiGroup.addChild(minusText);

        sentiGroup.y = 100;
        sentiGroup.x = -50;

	},

	render: function () {
		// game.debug.spriteBounds(board);
    	// game.debug.spriteInfo(board, 32, 32);

    // 	game.debug.geom(circle,'#cfffff');
    // game.debug.text('Diameter : '+circle.diameter,50,200);
    // game.debug.text('Circumference : '+circle.circumference(),50,230);

    	// game.debug.spriteBounds(this.jumbleWordsGroup);

    	// jumbleWordsGroup.forEachAlive(this.renderGroup, this);
	},

	renderGroup: function (member) { game.debug.body(member); game.debug.spriteBounds(member);}


}
