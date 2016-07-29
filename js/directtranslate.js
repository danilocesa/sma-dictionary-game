var backButton, dialectText,tweenBoard,board,boardGroup,grossText,plus,minus,plusText,minusText,randText,sentiButton = 2,submitButton,
	DirectTranslate = function(){};

DirectTranslate.prototype = {
	preload: function() {  
		randText = this.cache.getJSON('getRandomText'); 
	},
	create: function () {
		
		this.add.sprite(0, 0, 'mainBG');// Add background
		backButton = this.add.button(10, 5, 'backButton',this.backMain);
		backButton.scale.setTo(0.4,0.4);
		backButton.inputEnabled = true;
        backButton.input.useHandCursor = true;

        submitButton = this.add.button(this.world.centerX - 70, this.world.centerY + 190, 'submit',this.saveTranslate);
		submitButton.scale.setTo(0.6,0.6);
		submitButton.inputEnabled = true;
        submitButton.input.useHandCursor = true;

        boardGroup = this.add.group();
        // boardGroup.width = 10;
        board = this.add.sprite(275 , -50, 'board');
       	board.width = 310;
        board.anchor.setTo(0.5, 0.5);

        boardGroup.addChild(board);

        var dialectStyle = { font: "bold 24px Arial", fill: "#000", align:"center",boundsAlignH: "center", boundsAlignV: "center",wordWrap:true, wordWrapWidth:220 };
        var grossStyle = { font: "bold 14px Arial", fill: "#000", align:"left",boundsAlignH: "left", boundsAlignV: "left", wordWrap:true, wordWrapWidth:250 };
        dialectText = game.add.text((board.width / 2) + 50, 65, randText.synset_terms, dialectStyle);
    	dialectText.setTextBounds(0, 0, (board.width / 2), (board.height / 2 ) + 20);
    	boardGroup.addChild(dialectText);
    	grossText = game.add.text((board.width / 2), 130, randText.gloss, grossStyle);
        boardGroup.addChild(grossText);

        tweenBoard = game.add.tween(boardGroup).to( { y: 75 }, 2400, Phaser.Easing.Bounce.Out, true);

        var bar = this.add.graphics();
   		bar.beginFill(0x000000, 0.2);
    	bar.drawRect(115, (this.world.centerX) + 100 , 310, 130);
    	if(document.getElementById('inputDirectTrans') != null){
    		// new CoolElement(document.getElementById('inputDirectTrans')).remove();
    		document.getElementById('inputDirectTrans').style.display = '';
    		document.getElementById('inputDirectTrans').value = '';
    	} else{
    		var inputTranslate = document.createElement('input');
			inputTranslate.type = 'text';
			inputTranslate.id = 'inputDirectTrans';
	        var main_content = document.getElementById('main-content'); 
	        main_content.appendChild(inputTranslate);
	        document.getElementsByTagName("canvas")[0].style.zIndex = '1';
	        document.getElementById('inputDirectTrans').style.zIndex = '2';
	        document.getElementById('inputDirectTrans').style.position = 'relative';
	        document.getElementById('inputDirectTrans').style.top = '385px';
	        document.getElementById('inputDirectTrans').style.left = '128px';
	        document.getElementById('inputDirectTrans').style.width = '270px';
	        document.getElementById('inputDirectTrans').style.paddingLeft = '10px';
	        document.getElementById('inputDirectTrans').style.height = '30px';
	        document.getElementById('inputDirectTrans').style.fontSize = '24px';
    	}
		

        plus = this.add.button(this.world.centerX - 115, this.world.centerY + 120, 'plus',this.sentiButton);
        plus.name = "plus";
        plus.scale.setTo(0.25,0.25);
        plus.anchor.setTo(0.5, 0.5);
		plus.inputEnabled = true;
        plus.input.useHandCursor = true;
        // plus.events.onInputOver.add(this.overAlpha, this);
        // plus.events.onInputOut.add(this.outAlpha, this);

        minus = this.add.button(this.world.centerX - 115, this.world.centerY + 155, 'minus',this.sentiButton);
        minus.name = "minus";
        minus.scale.setTo(0.25,0.25);
        minus.anchor.setTo(0.5, 0.5);
		minus.inputEnabled = true;
        minus.input.useHandCursor = true;
        // minus.events.onInputOver.add(this.overAlpha, this);
        // minus.events.onInputOut.add(this.outAlpha, this);

        var plusStyle = { font: "bold 18px Arial", fill: "#fff", boundsAlignH: "left", boundsAlignV: "left"};
        plusText = this.add.text(this.world.centerX - 95,  this.world.centerY + 110, "positive sentiment", plusStyle);

        var minusStyle = { font: "bold 18px Arial", fill: "#fff", boundsAlignH: "left", boundsAlignV: "left"};
        minusText = this.add.text(this.world.centerX - 95,  this.world.centerY + 145, "negative sentiment", plusStyle);
       
	},
	update: function () {}, // for realtime
	backMain: function () {
		document.getElementById('inputDirectTrans').style.display = 'none';
		game.state.start('MainScreen');
	},
	sentiButton: function (button) {
		sentiButton = (button.name == 'plus') ? 1 : 0;
		if(sentiButton == 1){
			plusText.fill = '#000';
			plus.alpha = 1;
			minusText.fill = '#cccccc';
			minus.alpha = 0.5;
		} else {
			minusText.fill = '#000';
			minus.alpha = 1;
			plusText.fill = '#cccccc';
			plus.alpha = 0.5;
		}
	},
	saveTranslate: function (button) {
		if(document.getElementById('inputDirectTrans').value != ''){
			if(sentiButton != 2){
				callAjax("saveTranslate", "POST",{ base_id: randText.base_id, translated: document.getElementById('inputDirectTrans').value, sentiment: sentiButton },function (result) {
				if(result == 'success')
					game.state.start('Direct Translate',true,false);
				});	
			} else{
				alert('Please select sentiment!');
			}
			
		} else{
			alert('Please fill up the text before submitting!');
		}
	},

	render: function () {
		 // game.debug.geom(dialectText.textBounds, 'rgba(255,0,0,0.5)');
	}



}


