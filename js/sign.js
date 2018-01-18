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
  // ingresar con google 
  var provider = new firebase.auth.GoogleAuthProvider();
  $('#btn-google').click(function() {
    alert('hi');
    if (!firebase.auth().currentUser) {
      provider.addScope('https://www.googleapis.com/auth/plus.login');
      firebase.auth().signInWithPopup(provider).then(function(result) {
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        window.location.href = '../views/log.html';
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
  // $('#btn-google').on('click', IngresoGoogle());
});
