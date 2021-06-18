const toast = (msg) => M.toast({html: msg})
toast('Welcome!')

Quagga.init({
  numOfWorkers: 8,
  inputStream: {
    name: "Live",
    type: "LiveStream", 
    target: "#outp"
  },
  decoder: {
    readers: ["upc_reader", "upc_e_reader", "ean_reader", "ean_8_reader"]
  },
  constraints: {
    width: 3468,
    height: 4624
  },
  locator: {
    patchsize: "small"
  }
}, (err) => {
  if (err) {
    toast(err)
    return
  }
  toast("Initialization finished. Ready to start");
  Quagga.start();
})

Quagga.onDetected((data) => toast(data.codeResult.code))