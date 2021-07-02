firebase.auth().onAuthStateChanged(user => {
  if (!user) window.location.href = "/Targroot/index.html"
})