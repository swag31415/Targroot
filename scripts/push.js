// For pushing items to the floor

document.querySelectorAll("circle").forEach(circ => {
  circ.id = `(${circ.cx.baseVal.value}, ${circ.cy.baseVal.value})`
})

function get_circ(docRef) {
  return document.getElementById(docRef.id)
}

document.addEventListener("scan", (item) => {
  item = item.detail
  db.collection("catalog")
  .where("scans", "array-contains", item)
  .get().then(found => {
    if (found.empty) fail("item not found")
    else {
      document.querySelectorAll("circle.current").forEach(circ => {
        circ.classList.remove("current")
        circ.classList.add("route")
      })
      found.docs.forEach(doc => get_circ(doc).classList.add("current"))
      succ("Item added to push")
      if (found.size == 1) {
        toast(`Item is ${doc.data().scans.indexOf(item)} items from the left of the asile`)
      } else {
        let inds = found.docs
          .sort((d1, d2) => get_circ(d1).cx.baseVal.value - get_circ(d2).cx.baseVal.value)
          .map(doc => doc.data().scans.indexOf(item))
        let last = inds.pop()
        toast(`From left to right the item is ${inds.join(", ")}, and ${last} items from the left of each asile respectivly`)
      }
    }
  })
})