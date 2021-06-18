const toast = (msg, classes = "") => M.toast({html: msg, classes: classes})
const succ = (msg) => toast(msg, "green")
const fail = (msg) => toast(msg, "red")

succ("Welcome!")

function hide_opts(should_hide) {
  document.getElementById("opts").style.display = should_hide ? "none" : ""
}

const push = document.getElementById("push")
function start_push() {
  hide_opts(true)
  push.style.display = ""
}

const scanned_push = document.getElementById("scanned_push")
function add_to_push(item) {
  let panel = document.createElement("p")
  panel.className = "flow-text center-align col s6 m4 l3"
  panel.innerText = item
  scanned_push.prepend(panel)
  succ(`Added ${item} to push`)
}

function show_route() {
  // TODO
  fail("not yet implemented")
}