(function(){
  var init = function() {
    var TEXT_USERNAME = 'Username';
    var TEXT_PASSWORD = 'Password';
    var INPUT_CSS_DEFAULT = 'default';
    
    var inputUsername = document.getElementById('lr_username');
    var inputPassword = document.getElementById('lr_password');
    
    var addEvent = function(el, type, handler) {
      if(document.addEventListener) {
        el.addEventListener(type, handler, false);
      } else {
        el["on" + type] = handler;
      }
    };
    
    var showPasswordLabel = function() {
      labelPassword.style.display = 'block';
    };
    
    var hidePasswordLabel = function() {
      labelPassword.style.display = 'none';
    };
    
    var setInputDefault = function() {
      inputUsername.value = TEXT_USERNAME;
      inputUsername.className = INPUT_CSS_DEFAULT;
    };
    
    var clearInputDefault = function() {
      inputUsername.value = '';
      inputUsername.className = '';
    };  
    
    var labelPassword = document.createElement('div');
    var testInput = document.createElement('input');
    
    //if placeholder exists, just use it, otherwise older legacy code will run
    if ('placeholder' in testInput) {
      inputUsername.setAttribute('placeholder', TEXT_USERNAME);
      inputPassword.setAttribute('placeholder', TEXT_PASSWORD);
      return;
    }
    
    //add the fake password label
    labelPassword.className = 'password';
    labelPassword.innerHTML = TEXT_PASSWORD;
    inputPassword.parentNode.appendChild(labelPassword);
    
    //initial checks for fields
    if (inputUsername.value == TEXT_USERNAME || !inputUsername.value.length) {
      setInputDefault();
    }
    
    if (inputPassword.value.length) {
      hidePasswordLabel();
    } else {
      showPasswordLabel();
    }
    
    //input events
    addEvent(inputUsername, 'focus', function(){
      if (this.value == TEXT_USERNAME) {
        clearInputDefault();
      }
    });
    
    addEvent(inputUsername, 'blur', function(){
      if (!this.value) {
        setInputDefault();
      }
    });
    
    //password input events
    addEvent(inputPassword, 'focus', function(){
      hidePasswordLabel();
    });
    
    addEvent(inputPassword, 'blur', function(){
      if (!this.value) {
        showPasswordLabel();
      }
    });  
    
    addEvent(inputPassword, 'change', function(){
      if (this.value.length) {
        hidePasswordLabel();
      } else {
        showPasswordLabel(); 
      }
    }); 
    
    //password label event
    addEvent(labelPassword, 'click', function(){
      hidePasswordLabel();
      inputPassword.focus();
    });
  };
  
  if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', init, false);
  } else if (window.addEventListener) {
    window.addEventListener('load', init, false);
  } else if (window.attachEvent) {
    window.attachEvent('onload', init);
  }  
})();