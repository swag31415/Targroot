// For pushing items to the floor

document.querySelectorAll("circle").forEach(circ => {
  circ.id = `(${circ.cx.baseVal.value}, ${circ.cy.baseVal.value})`
})

function get_ind(docRef, item) {
  let scans = docRef.data().scans
  return scans.indexOf(item) / scans.length
}

function get_circ(docRef) {
  return document.getElementById(docRef.id)
}

const scan_target = document.getElementById("scan_target")
init_scanner(scan_target)
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
        let ind = get_ind(found.docs[0], item)
        toast(`Item is ${(ind * 100).toPrecision(4)}% from the left of the asile`)
      } else {
        let inds = found.docs
          .sort((d1, d2) => get_circ(d1).cx.baseVal.value - get_circ(d2).cx.baseVal.value)
          .map(doc => (get_ind(doc, item) * 100).toPrecision(4))
        let last = inds.pop()
        toast(`From left to right the item is ${inds.join("%, ")}, and ${last}% from the left of each asile respectivly`)
      }
    }
  })
})

scan_target.focus()