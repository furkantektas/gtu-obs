var loginLogin;
var loginPassword;

function init() {
  loginLogin = document.querySelector('#login');
  loginPassword = document.querySelector('#password');

  loadCredentials();
}

function saveCredentials() {
  localStorage.setItem('login',loginLogin.value);
  localStorage.setItem('password',loginPassword.value);
}

function loadCredentials() {
  var loginVal = localStorage.getItem('login');
  if(loginVal === null)
    return;
  var passwordVal = localStorage.getItem('password');
  loginLogin.value = loginVal;
  loginPassword.value = passwordVal;
}

if (window.addEventListener){
  window.addEventListener('load', init, false);
} else if (window.attachEvent){
  window.attachEvent('onload', init );
}

