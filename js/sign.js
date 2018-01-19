$(document).ready(function() {
  // Initialize Firebase
  var config = {
    apiKey: 'AIzaSyByKw_vAF4oY61I_4MraycHnBTmFJL--vk',
    authDomain: 'movie-beb0e.firebaseapp.com',
    databaseURL: 'https://movie-beb0e.firebaseio.com',
    projectId: 'movie-beb0e',
    storageBucket: 'movie-beb0e.appspot.com',
    messagingSenderId: '444403018523'
  };
  firebase.initializeApp(config);

  var $email = $('#inputEmail');
  var $password = $('#inputPassword');
  // verificadores de variables
  var verifyEmail = false;
  var verifyPassword = false;

  // asociando eventos a los inputs
  $email.on('input', function() {
    // console.log(event.target.value);
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

  $password.on('input', function() {
    if ($(this).val().length >= 6) {
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
      $('#btnSignIn').addClass('ensabled');
      $('#btnSignIn').removeClass('disabled');
      // $('#btnSignIn').attr('href', 'profileUser.html');       
    }
  }

  function desactBtn() {
    $('#btnSignIn').addClass('disabled');       
  }

  // validación dentro del firebase
  $('#btnSignIn').on('click', function(event) {
    // que el usuario ingrese con un correo y contraseña 
    var emailLogin = $email.val();
    var passwordLogin = $password.val();
    
    firebase.auth().signInWithEmailAndPassword(emailLogin, passwordLogin).catch(function(error) {
      // Handle Errors here.
      console.log('Usuario y/o contraseña incorrecta');
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
    // observador
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        window.location.href = '../index.html';
        // ...
      } else {
        // User is signed out.
        // ...
        console.log(error);
      }
    });
  });

  // ---------> Ingresa con Google <-------------
  var provider = new firebase.auth.GoogleAuthProvider();
  $('#btn-Google').click(function() {
    if (!firebase.auth().currentUser) {
      provider.addScope('https://www.googleapis.com/auth/plus.login');
      firebase.auth().signInWithPopup(provider).then(function(result) {
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log(user);
        firebase.database().ref('user/' + user.uid).set({
          name: user.displayName,
          email: user.email,
          uid: user.uid,
          profilePhoto: user.photoURL
        }).then(user => {
          console.log('Registrado!');
        });
        window.location.href = '../index.html';
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        
        if (errorCode === 'auth/account-exists-with-different-credential') {
          alert('Es el mismo usuario');
        }
      });
    } else {
      firebase.auth().signOut();
    }  
  });
});
