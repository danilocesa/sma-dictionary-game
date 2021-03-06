var $registerShow = document.getElementsByClassName('register-show'),
   $registerForms = document.getElementById('register-forms'),
   $loginForms = document.getElementById('login-forms'),
   $fpword = document.getElementById('fpword'),
   $textLogin = document.getElementById('textLogin'),
   $forgotForms = document.getElementById('forgot-forms'),
   $regsiterCancel = document.getElementById('register-cancel'),
   $submitRegister = document.getElementById('submit-register'),
   $submitForgot = document.getElementById('submit-forgot'),
   $submitLogin = document.getElementById('submit-login'),
   $logo = document.getElementById('logo'),
   $regDialog = document.getElementById('registration-dialog'),
   $forDialog = document.getElementById('forgot-success'),
   $regSuccessDialog = document.getElementById('regSuccessDialog'),
   $forSuccessDialog = document.getElementById('forSuccessDialog'),
   $regExistsDialog = document.getElementById('regExistsDialog'),
   $regSuccesButton = document.getElementById('regSuccesButton');
   $regExistsButton = document.getElementById('regExistsButton');

  callAjax("getDialects", "GET","",function (result) {
    var $sel = document.getElementById("dialect_select");
    Object.keys(result).reverse().forEach(function(key) { 
      var $option = document.createElement("option");
      $option.value = result[key].dialect_id;
      $option.text = result[key].dialect;
      $sel.insertBefore($option, $sel.options[1]);
    });
  });

  /* Show registration*/
  for (var i = 0; i < $registerShow.length; i++) {
      $registerShow[i].addEventListener('click', function() {
        $registerForms.style.display = 'block';
        document.getElementById('register-form').reset();
        $loginForms.style.display = 'none';
        $forgotForms.style.display = 'none';
        [].slice.call( document.getElementsByClassName('error-message')).forEach(function ( p ) {
          p.innerHTML = '';
        });
      }, false);
  }
   /* Show forgot forms*/
  $fpword.addEventListener('click', function() {
    $forgotForms.style.display = 'block';
    document.getElementById('forgot-form').reset();
    $loginForms.style.display = 'none';
    [].slice.call( document.getElementsByClassName('error-message')).forEach(function ( p ) {
      p.innerHTML = '';
    });
  }, false);

  /* Cancel forgot */
  $textLogin.addEventListener('click', function() {
       $forgotForms.style.display = 'none';
       $loginForms.style.display = 'block';
       document.getElementById('login-form').reset();
  }, false); 

  /* Cancel registration */
  $regsiterCancel.addEventListener('click', function() {
       $registerForms.style.display = 'none';
       $loginForms.style.display = 'block';
       document.getElementById('login-form').reset();
  }, false); 

  /* Okay Registration Success */
  $regSuccesButton.addEventListener('click', function() {
       $regDialog.style.display = 'none';
       $loginForms.style.display = 'block';
       document.getElementById('login-form').reset();
       document.getElementById('forgot-form').reset();
       $logo.style.display = 'block';
  }, false); 

  /* Account Exists */
  $regExistsButton.addEventListener('click', function() {
       $regDialog.style.display = 'none';
       $registerForms.style.display = 'block';
       $logo.style.display = 'block';
  }, false); 
 
  /* On click submit register */
  $submitRegister.addEventListener('click', function() {
    var $formData = form2js('register-forms','.',true);
    callAjax("register", "POST" ,$formData,function (result) {
       if(result == 'success'){
        $logo.style.display = 'none';
        $registerForms.style.display = 'none';
        $regDialog.style.display = 'block';
        $regSuccessDialog.style.display = 'block';
        $regSuccesButton.style.display = 'block';
        $regExistsDialog.style.display = 'none';
        $regExistsButton.style.display = 'none';
       }
       else{  //Errors
        /** Display Already Exists **/
        if(result == 'exists'){
          $logo.style.display = 'none';
          $registerForms.style.display = 'none';
          $regDialog.style.display = 'block';
          $regExistsDialog.style.display = 'block';
          $regExistsButton.style.display = 'block';
          $regSuccessDialog.style.display = 'none';
           $regSuccesButton.style.display = 'none';
        }
        /** Display Validation Error **/
        var myForm = document.getElementById("register-form"),
            formName = [];
        /** Array for list of form name **/    
        for (var i = 0; i < myForm.elements.length; i++) {
          formName[i] = myForm.elements[i].name;
        }
        /** Error Message and Input Notification **/
        for (var a = 0; a < formName.length; a++) {
          var $checkDualInput = (document.getElementsByName(formName[a])[1]) ? document.getElementsByName(formName[a])[1] : document.getElementsByName(formName[a])[0];
          Object.keys(result).forEach(function(key) {                
            if(key == formName[a]){
              if(formName[a] == 'terms_con'){
                $checkDualInput.nextElementSibling.nextElementSibling.innerHTML = result['terms_con']; 
                $checkDualInput.nextElementSibling.style.border = '5px solid red';
               }  
              else{
                $checkDualInput.nextElementSibling.innerHTML = result[key]; 
                $checkDualInput.style.border = '5px solid red';
              }
            }
            else{
              if(formName[a] != '_token')
                if(formName[a] == 'terms_con'){
                  $checkDualInput.nextElementSibling.nextElementSibling.innerHTML = ''; 
                  $checkDualInput.nextElementSibling.style.border = '5px solid black';
                }else{
                  $checkDualInput.nextElementSibling.innerHTML = ''; 
                  $checkDualInput.style.border = '5px solid black';
                }
            }     
          });
        }
       }
    });
  }, false); 

  /* On click submit forgot */
  $submitForgot.addEventListener('click', function() {
    var $formData = form2js('forgot-forms','.',true);
    callAjax("forgot", "POST" ,$formData,function (result) {
       if(result == 'success'){
          $logo.style.display = 'none';
          $forgotForms.style.display = 'none';
          $regDialog.style.display = 'block';
          $forSuccessDialog.style.display = 'block';
          $regExistsDialog.style.display = 'none';
          $regExistsButton.style.display = 'none';
          $regSuccessDialog.style.display = 'none';
          $regSuccesButton.style.display = 'block';
       }
       else{  //Errors

        if(result == 'nope'){
         document.getElementById('forgot-errors').style.visibility ="visible";
        }
        /** Display Validation Error **/
        var myForm = document.getElementById("forgot-form"),
            formName = [];
        /** Array for list of form name **/    
        for (var i = 0; i < myForm.elements.length; i++) {
          formName[i] = myForm.elements[i].name;
        }


        /** Error Message and Input Notification **/
        for (var a = 0; a < formName.length; a++) {
          $doc = document.getElementsByName(formName[a])[0];
          Object.keys(result).forEach(function(key) {              
            if(key == formName[a]){
              $doc.nextElementSibling.innerHTML = result[key]; 
              $doc.style.border = '5px solid red';
            }
            else{
              if(formName[a] != '_token')
                $doc.nextElementSibling.innerHTML = ''; 
                $doc.style.border = '5px solid black';
            }     
          });
        }
       }
    });
  }, false);

  /* On click submit login */
  $submitLogin.addEventListener('click', function() {
    var $formData = form2js('login-forms','.',true);
    callAjax("login", "POST" ,$formData,function(result){
     if(result.response != 'success'){
         var $elements = document.querySelectorAll('.login-input');
        Array.prototype.forEach.call($elements, function(el, i){
          el.getElementsByTagName('input')[0].style.border = '5px solid red';
        });
        document.getElementById('login-errors').style.visibility ="visible";
      }
      else{
        new CoolElement(document.getElementById('black-screen')).remove();
        new CoolElement(document.getElementById("login-forms")).remove();
        new CoolElement(document.getElementById("register-forms")).remove();
        new CoolElement(document.getElementById("registration-dialog")).remove();
        new CoolElement(document.getElementById("logo")).remove();
        // document.getElementsByTagName("canvas")[0].style.zIndex = '100';
       location.reload();
      }

    });
  }, false); 