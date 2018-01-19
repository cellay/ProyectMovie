$(document).ready(function() {
  // Initialize Firebase
  /* var config = {
    apiKey: 'AIzaSyByKw_vAF4oY61I_4MraycHnBTmFJL--vk',
    authDomain: 'movie-beb0e.firebaseapp.com',
    databaseURL: 'https://movie-beb0e.firebaseio.com',
    projectId: 'movie-beb0e',
    storageBucket: 'movie-beb0e.appspot.com',
    messagingSenderId: '444403018523'
  };
  firebase.initializeApp(config);*/
    
  var database = firebase.database();
  var reference = database.ref('user');

  // variables
  var email = $('#email');
  var password = $('#password');
  var name = $('#name');
  var confirmP = $('#confirmPassword');
  
  // verificadores de variables
  var verifyEmail = false;
  var verifyPassword = false;
  
  // asociando eventos a los inputs
  email.on('input', function() {
    console.log(event.target.value);
    console.log($(this).val());
    var PATERNEMAIL = /^[a-zA-Z0-9\._-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,3}$/;
    console.log(PATERNEMAIL.test($(this).val()));
    if (PATERNEMAIL.test($(this).val())) {
      verifyEmail = true;
      activeBtn();
    } else {
      desactBtn();
    }
  });
  
  password.on('input', function() {
    if ($(this).val().length >= 6) {
      // alert('entro a password');
      verifyPassword = true;
      $('#error').hide();
      activeBtn();
    } else {
      $('#error').show();
      desactBtn();
    }
  });
  
  function activeBtn() {
    if (verifyEmail === true && verifyPassword === true) {
      $('#btnRegister').addClass('enabled');
      $('#btnRegister').removeClass('disabled');
    }
  }
  
  function desactBtn() {
    $('#btnRegister').addClass('disabled');
  }
  $('#btnRegister').on('click', function() {
    var emailRegister = email.val();
    var passwordRegister = password.val();
    var nameRegister = name.val();
    var confirmPRegister = confirmP.val();
    // registro de usuario 
    firebase.auth().createUserWithEmailAndPassword(emailRegister, passwordRegister).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        firebase.database().ref('user/' + user.uid).set({
          name: nameRegister,
          email: user.email,
          photoURL: '../assets/images/user.svg',
          uid: user.uid
        }).then(user => {
          console.log('registrado');
        });
        // ...
        window.location.href = '../index.html';
      } else {
        // User is signed out.
        // ...
        console.log(error);
      }
    });
  });
  // para verificar y enviar un mensaje al correo del usuario
  /* function verifyUser(user){
      var user = firebase.auth().currentUser;
      user.sendEmailVerification().then(function() {
        // Email sent.
        console.log('Enviando correo');
      }).catch(function(error) {
        // An error happened.
        console.log(error);
      });
    }*/
});