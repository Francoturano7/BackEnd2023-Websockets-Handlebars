console.log("Archivo js para la vista home")

const socketClient= io()

const inputElm = document.getElementById("inputField")

inputElm.addEventListener("keydown",(e)=>{
    console.log(e.key)
    //socketClient.emit("msgKey",e.key)
    if(e.key==="Enter"){
        socketClient.emit("msgInput",inputElm.value)
    }
})

socketClient.emit("clientMessage","Primer mensaje del cliente desde websocket ")
socketClient.on("msgServer",(data)=>{
    console.log("data desde el servidor: ",data)
})
socketClient.on("msgAllFromServer",(data)=>{
    console.log("mensaje general del servidor: ",
    data)
})

socketClient.on("msgAllNoXMe",(data)=>{
    console.log("mensaje para todos menos para el ultimo que se conecta: ",
    data)
})

socketClient.on("messages",(historyData)=>{
    console.log(historyData)
})