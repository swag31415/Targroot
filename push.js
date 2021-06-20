// For pushing items to the floor

const push = {
  to_push: new Set(),
  add_to_push: function(item) {
    let panel = document.createElement("p")
    panel.className = "flow-text center-align col s6 m4 l3"
    panel.innerText = item
    document.getElementById("scanned_push").prepend(panel)
    this.to_push.add(item)
    succ(`Added ${item} to push`)
  },
  show_route: function() {
    // TODO
    fail("not yet implemented")
  },
  start: function() {
    console.log(this)
    hide_opts(true)
    document.getElementById("push").style.display = ""
    this.to_push.clear()
    document.addEventListener("scan", this.add_to_push.bind(this))
  },
  end: function() {
    document.getElementById("push").display = "none"
    hide_opts(false)
  }
}