// For pushing items to the floor

let to_push = new Set()

onScan.attachTo(document, { reactToPaste: true })
document.addEventListener("scan", (item) => {
  item = item.detail.scanCode
  if (to_push.has(item)) {
    fail(`Already pushing ${item}`)
  } else {
    to_push.add(item)
    succ(`Added ${item} to push`)
  }
})