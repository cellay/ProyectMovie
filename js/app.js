$(document).ready(function() {
  // ---------> Imprime foto y datos usuario <-------------
  // database
  var database = firebase.database();
  var reference = database.ref('user');

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      var uid = user.uid;
      reference.on('value', function(datos) {
        users = datos.val();
        var arrayUser = Object.values(users);
        for (i = 0; i < arrayUser.length; i++) {
          if (arrayUser[i].uid === uid) {
            var id = arrayUser[i];
            $('#logout').show();
            $('#register').hide();
            $('#user-name').text(id.name);
            $('#user-email').text(id.email);
            // console.log(id.profilePhoto);
            $('#user-profile').attr('src', id.profilePhoto);
          }
        }
      });
    }
  });

  $('#logout').click(function() {
    firebase.auth().signOut().then(function() {
      console.log('Cerrando sesión...');
      $(location).attr('href','index.html');
    }).catch(function(error) {
      console.log(error);
    });
 });
});