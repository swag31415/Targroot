let loc = null;

document.querySelectorAll("circle").forEach(circ => {
  circ.addEventListener("click", () => {
    if (loc != null) loc.classList.remove("selected")
    circ.classList.add("selected")
    loc = circ
    succ("location selected") 
  })
  // Just use their location as an id
  circ.id = `(${circ.cx.baseVal.value}, ${circ.cy.baseVal.value})`
  // Apply the orange
  db.collection("catalog").doc(circ.id).get()
  .then(doc => {
    // If it doesn't exist or it's more than a week old
    if (!doc.exists || (Date.now() - doc.data().time) > 604800000)
      circ.classList.add("stale")
  })
  .catch(() => fail("Failed to get some data from Firestore"))
})

let scanned = new Set()
document.addEventListener("scan", (item) => {
  item = item.detail
  if (scanned.has(item)) {
    toast("Already scanned item")
  } else {
    scanned.add(item)
    succ("Item scanned")
    document.getElementById("count").innerText = scanned.size
  }
})

function fire() {
  db.collection("catalog")
  .doc(loc.id)
  .set({
    scans: [...scanned],
    time: Date.now()
  })
  .then(() => succ("Successfully Cataloged"))
  .catch(() => fail("Something went wrong; Failed to Catalog"))
  // Go back to the main page after a delay
  setTimeout(() => window.location.href = "/Targroot/start.html", 2000)
}
