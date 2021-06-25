var scanning = false

function init_scanner(input_elem) {
  input_elem.addEventListener("input", e => {
    if (!scanning) {
      scanning = true
      setTimeout(() => {
        if (input_elem.value.length > 6) {
          input_elem.dispatchEvent(new CustomEvent('scan', {
            bubbles: true,
            detail: input_elem.value
          }))
        }
        input_elem.value = ""
        scanning = false
      }, 100)
    }
  })
}