let loc = null;

document.querySelectorAll("circle").forEach(circ => {
  circ.addEventListener("click", () => {
    if (loc != null) loc.classList.remove("selected")
    circ.classList.add("selected")
    loc = circ
    succ("location selected") 
  })
})

let scanned = new Set()

onScan.attachTo(document, { reactToPaste: true })
document.addEventListener("scan", (item) => {
  item = item.detail.scanCode
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
  .doc(`(${loc.cx.baseVal.value}, ${loc.cy.baseVal.value})`)
  .set({
    scans: [...scanned],
    time: Date.now()
  })
  .then(() => succ("Successfully Cataloged"))
  .catch(() => fail("Something went wrong; Failed to Catalog"))
  // Go back to the main page after a delay
  setTimeout(() => window.location.href = "/Targroot/index.html", 2000)
}