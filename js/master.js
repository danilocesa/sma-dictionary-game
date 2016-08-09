var jsonUrl = 'http://localhost/halohalo-api/public/',game;

window.onload = function() {
    if (!window.chrome){
        document.getElementById('fox-no').style.display = 'block';  
        throw new Error("Google Chrome only!");
    }
    console.log('%c Halo-halo game <3','background:black;color:white;');    
  var imported = document.createElement('script');
    callAjax("getUserLogged", "GET","",function (result) {
        if(result){
           
            new CoolElement(document.getElementById('black-screen')).remove();
            new CoolElement(document.getElementById("login-forms")).remove();
            new CoolElement(document.getElementById("register-forms")).remove();
            new CoolElement(document.getElementById("registration-dialog")).remove();
            new CoolElement(document.getElementById("logo")).remove();

            game = new Phaser.Game(550, 650, Phaser.AUTO, 'main-content');
            Phaser.Device.whenReady(function () {
                game.plugins.add(Fabrique.Plugins.InputField);
                this.game.stateTransition = game.plugins.add(Phaser.Plugin.StateTransition);
                game.plugins.screenShake = game.plugins.add(Phaser.Plugin.ScreenShake);
            });
            // this.game.stateTransition.configure({
            //   duration: Phaser.Timer.SECOND * 0.8,
            //   ease: Phaser.Easing.Exponential.InOut,
            //   properties: {
            //     alpha: 0,
            //     scale: {
            //       x: 1.4,
            //       y: 1.4
            //     }
            //   }
            // });
            game.state.add('MainScreen',MainScreen); //Main Screen State
            game.state.add('Play',PlayScreen); //Play Screen State
            game.state.add('PlayLoad',PlayLoad); //Play Screen Load State
            game.state.add('Direct Translate',DirectTranslate); //Direct Translation Screen State
            game.state.add('DirectLoad',DirectLoad); //Direct Translation Screen State
            game.state.add('Leader Board',LeaderBoard); //Leader Board Screen State
            game.state.add('BootState',BootState);
            game.state.start('BootState');
        }
        else{ 
          document.getElementById("form-holder").style.display = 'block';
          imported.src = 'js/login_register.js';
          document.head.appendChild(imported);
        }

    });
};

//Please uncomment after developing for security purposes
// window.addEventListener("beforeunload", function (e) {
//   var confirmationMessage = "test";
//   localStorage.clear();
//   callAjax("deleteSession", "GET",'',function(result){});  //Call delete session
//   (e || window.event).returnValue = confirmationMessage; //Gecko + IE

//   return confirmationMessage;                            //Webkit, Safari, Chrome
// });

function CoolElement(element) {
    this.element = element;
}

CoolElement.prototype = {
    remove: function() {
        if (this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
    }
};
