var jsonUrl = 'http://localhost/halohalo-api/public/';
window.onload = function() {
  var imported = document.createElement('script');
    callAjax("getUserLogged", "GET","",function (result) {
        if(result){
            document.getElementsByTagName("canvas")[0].style.zIndex = '100';
            new CoolElement(document.getElementById('black-screen')).remove();
            new CoolElement(document.getElementById("login-forms")).remove();
            new CoolElement(document.getElementById("register-forms")).remove();
            new CoolElement(document.getElementById("registration-dialog")).remove();
            new CoolElement(document.getElementById("logo")).remove();
            
        }
        else{ 
          document.getElementById("form-holder").style.display = 'block';
          imported.src = 'js/login_register.js';
          document.head.appendChild(imported);
        }

    });
};

//Please uncomment after developing for security purposes
window.addEventListener("beforeunload", function (e) {
  var confirmationMessage = "test";
  localStorage.clear();
  callAjax("deleteSession", "GET",'',function(result){});  //Call delete session
  (e || window.event).returnValue = confirmationMessage; //Gecko + IE

  return confirmationMessage;                            //Webkit, Safari, Chrome
});

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
