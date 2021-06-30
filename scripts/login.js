document.getElementById("login").addEventListener("click", e => {
  let pwd = document.getElementById("pass").value
  // The login
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
  .then(() => firebase.auth().signInWithEmailAndPassword("anon@example.com", pwd))
  .then(() => window.location.href = "/Targroot/start.html")
  .catch(() => fail("Invalid Login"))
})