var backButton,level = 1,arcadeInfo,levelText,jumbleWordsGroup,sentiGroup,gameState = null,continueButton,dialectText,sentiButton = 2,checkback = 0,sentiText,
	PlayScreen = function(){};

PlayScreen.prototype = {
	preload : function() {
		arcadeInfo = this.cache.getJSON('arcadeInfo'); 	
		this.load.image('mapBG', './images/arcades/'+arcadeInfo.arcade_map);
	},
	create: function () { 
		if(checkback == 1){
			checkback = 0;
			gameState = null;
			game.state.restart();
		}
		optionsMusic = game.add.audio('optionsMusic');
		failPlay = game.add.audio('failPlay');
		successPlay = game.add.audio('successPlay');
		stageCleared = game.add.audio('stageCleared');
		flipMS = game.add.audio('flipMS');
		console.log(arcadeInfo);
		this.add.sprite(0, 0, 'mapBG');// Add background

		backButton = this.add.button(10, 5, 'backButton',this.backMain);
		backButton.scale.setTo(0.4,0.4);
		backButton.inputEnabled = true;
        backButton.input.useHandCursor = true;

        submitButton = this.add.button(this.world.centerX + 70, this.world.centerY + 210, 'submit',this.savePlay);
		submitButton.scale.setTo(0.6,0.6);
		submitButton.inputEnabled = false;
        submitButton.alpha = 0.5;
		

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
        	document.getElementById('inputPlay').style.display = 'block';
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

    	glossText = game.add.text(35, (this.world.centerX) + 75 , arcadeInfo.gloss, { font: "bold 16px Arial", fill: "#fff", align:"center", wordWrap:true, wordWrapWidth:480});

    	if(document.getElementById('inputPlay') != null){
    		document.getElementById('inputPlay').style.display = '';
    		document.getElementById('inputPlay').value = '';
    	} else{
	    	var inputTranslate = document.createElement('input');
			inputTranslate.type = 'text';
			inputTranslate.id = 'inputPlay';
	        var main_content = document.getElementById('main-content'); 
	        main_content.appendChild(inputTranslate);
	        document.getElementsByTagName("canvas")[0].style.zIndex = '1';
	        document.getElementById('inputPlay').style.zIndex = '2';
	        document.getElementById('inputPlay').style.position = 'relative';
	        document.getElementById('inputPlay').style.top = '475px';
	        document.getElementById('inputPlay').style.left = '108px';
	        document.getElementById('inputPlay').style.width = '320px';
	        document.getElementById('inputPlay').style.paddingLeft = '10px';
	        document.getElementById('inputPlay').style.height = '30px';
	        document.getElementById('inputPlay').style.fontSize = '24px';
    	}

	},
	update: function () {
		document.getElementById("inputPlay").onkeyup = function() {
			if(this.value.length >= 2){
				submitButton.inputEnabled = true;
				submitButton.input.useHandCursor = true;
				submitButton.alpha = 1;
			} else{
				submitButton.inputEnabled = false;
				submitButton.input.useHandCursor = false;
				submitButton.alpha = 0.5;
			}
		};
	},
	start: function () {},
	backMain: function () {
		optionsMusic.play();
		document.getElementById('inputPlay').style.display = 'none';
		if(gameState == 'translate'){
			checkback = 1;
		}
		game.state.start('MainScreen');
	},
	savePlay: function(){
		if(document.getElementById('inputPlay').value != ''){

			if(gameState != 'translate'){
				//Check jumblewords
				if(document.getElementById('inputPlay').value.toLowerCase() == arcadeInfo.synset_terms.toLowerCase() ){ //Correct Word
					gameState = 'translate';
					var blackscreen = game.add.graphics();
			   		blackscreen.beginFill(0x000000, 0.7);
			    	blackscreen.drawRect(0, 0, 550, 650);
			    	document.getElementById('inputPlay').style.display = 'none';
			    	continueButton = game.add.button(game.world.centerX - 90, game.world.centerY + 190, 'continue',function(){ game.state.start('Play',true,false); });
					continueButton.scale.setTo(0.6,0.6);
					continueButton.inputEnabled = true;
			        continueButton.input.useHandCursor = true;
	        		var successText = game.add.text(game.world.centerX - 105, 30, 'Correct!', { font: "bold 58px Arial", fill: "#fff", align:"center", boundsAlignH: "center", boundsAlignV: "middle"});
	        		var successWords = game.add.text(game.world.centerX - 125, 100, "You've guessed the word.", { font: "bold 22px Arial", fill: "#fff", align:"left"});
	        		var correctText = game.add.text(game.world.centerX - 65, 250, arcadeInfo.synset_terms, { font: "bold 58px Arial", fill: "#fff", align:"center", boundsAlignH: "center", boundsAlignV: "middle"});
	        		var continueText = game.add.text(game.world.centerX - 165, game.world.centerY + 150, 'Translate the word to move next level', { font: "bold 20px Arial", fill: "#fff", align:"center", boundsAlignH: "center", boundsAlignV: "middle"});
					callAjax("saveScore", "POST",{ guessed :1 },function (result) {});	
					bgMusic.volume = 0.4;
					stageCleared.play();
				} else { //False
					failPlay.play();
					document.getElementById('inputPlay').value = 'Incorrect guess!';
				}
			} else{
				if(sentiButton == 2){
					// alert('Please select sentiment!');
					sentiText = game.add.text(game.world.centerX - 150,  game.world.centerY + 280, "Please choose sentiment", { font: "bold 12px Arial", fill: "red",wordWrap:true,wordWrapWidth:200});
					sentiText.text = 'Please choose sentiment';
					failPlay.play();
				} else {
					callAjax("saveTranslate", "POST",{ base_id: arcadeInfo.base_id, translated: document.getElementById('inputPlay').value, sentiment: sentiButton,uaTB:1,aLevel: arcadeInfo.arcade_id, translated: 1 },function (result) {
						if(result == 'success')
							bgMusic.volume = 0.4;
							successPlay.play();
							checkback = 0;
							gameState = null;
							game.state.start('PlayLoad');
					});
				}
			}
		}
		else{
			
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

        plusText = this.add.text(this.world.centerX - 95,  this.world.centerY + 110, "positive sentiment", { font: "bold 18px Arial", fill: "#fff", boundsAlignH: "left", boundsAlignV: "left"});
        sentiGroup.addChild(plusText);

        minusText = this.add.text(this.world.centerX - 95,  this.world.centerY + 145, "negative sentiment", { font: "bold 18px Arial", fill: "#fff", boundsAlignH: "left", boundsAlignV: "left"});
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
