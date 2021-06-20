const toast = (msg, classes = "") => M.toast({html: msg, classes: classes})
const succ = (msg) => toast(msg, "green")
const fail = (msg) => toast(msg, "red")

succ("Welcome!")

onScan.attachTo(document, { reactToPaste: true })

const opts = document.getElementById("opts")
function hide_opts(should_hide) {
  opts.style.display = should_hide ? "none" : ""
}

let st = document.createElement("button")
st.className = "btn col s6 m4 l2"
st.onclick = () => push.start()
st.innerText = "Start Push"
opts.append(st)