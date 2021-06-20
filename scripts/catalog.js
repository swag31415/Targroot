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

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyBtJk2iSwvh-EgybKKIFXpbdD0xa78-iqU",
  authDomain: "targroot.firebaseapp.com",
  projectId: "targroot",
  storageBucket: "targroot.appspot.com",
  messagingSenderId: "944949322357",
  appId: "1:944949322357:web:8acd94de6078d62fde0e3c",
  measurementId: "G-T36631T7LK"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

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