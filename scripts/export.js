document.getElementById("export").addEventListener("click", e => {
  db.collection("catalog").get().then(res => {
    let data = Object.fromEntries(res.docs.map(doc => [doc.id, doc.data()]))
    let dstr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data))
    e.target.setAttribute("href", dstr)
    e.target.setAttribute("download", `Targroot_${moment().format("MM-DD-YY")}_export.json`)
    e.target.click()
  })
}, { once: true })