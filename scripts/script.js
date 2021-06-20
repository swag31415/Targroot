const toast = (msg, classes = "") => M.toast({html: msg, classes: classes})
const succ = (msg) => toast(msg, "green")
const fail = (msg) => toast(msg, "red")