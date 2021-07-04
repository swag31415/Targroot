document.querySelectorAll("circle").forEach(circ => {
  circ.addEventListener("click", () => {
    circ.classList.toggle("selected")
  })
})

document.getElementById("submit").addEventListener("click", () => {
  db.collection("requests").doc().set({
    request: document.getElementById("request").value,
    locations: Array.from(document.querySelectorAll("circle.selected"))
      .map(c => `(${c.cx.baseVal.value}, ${c.cy.baseVal.value})`),
    time: Date.now()
  })
  .then(() => succ("Request Submitted"))
  .catch(() => fail("Something went wrong; Failed to Submit Request"))
  // Go back to the main page after a delay
  setTimeout(() => window.location.href = "/Targroot/start.html", 2000)
})