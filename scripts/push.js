// For pushing items to the floor

document.querySelectorAll("circle").forEach(circ => {
  circ.id = `(${circ.cx.baseVal.value}, ${circ.cy.baseVal.value})`
})

onScan.attachTo(document, { reactToPaste: true })
document.addEventListener("scan", (item) => {
  item = item.detail.scanCode
  db.collection("catalog")
  .where("scans", "array-contains", item)
  .get().then(found => {
    if (found.empty) fail("item not found")
    else {
      document.querySelectorAll("circle.current").forEach(circ => {
        circ.classList.remove("current")
        circ.classList.add("route")
      })
      found.docs.forEach(doc => document.getElementById(doc.id).classList.add("current"))
      succ("Item added to push")
    }
  })
})