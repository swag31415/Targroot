function scan(target_elem, value) {
  target_elem.dispatchEvent(
    new CustomEvent('scan', { bubbles: true, detail: value })
  )
}

const scan_target = document.getElementById("scan_target")
const barcode_form = document.getElementById("barcode_form")

var last_state = scan_target.value

// Autofocus the scanner
scan_target.focus()
scan_target.addEventListener("blur", () => {
  setTimeout(() => scan_target.focus(), 100)
})
// Handle Manual Input
barcode_form.addEventListener("submit", e => {
  if (e.preventDefault) e.preventDefault()
  scan(scan_target, scan_target.value)
  return false
})
// Handle Scans
scan_target.addEventListener("input", e => {
  if (last_state == "") {
    setTimeout(() => {
      if (scan_target.value.length > 6) {
        scan(scan_target, scan_target.value)
        scan_target.value = ""
        last_state = ""
      }
    })
  }
  last_state = scan_target.value
})