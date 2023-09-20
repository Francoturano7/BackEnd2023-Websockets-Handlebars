import express from "express"
import { engine } from "express-handlebars";
import { __dirname } from "./utils.js";
import  path  from "path"
import { Server } from "socket.io";

import { viewsRouter } from "./routes/views.routes.js";

const port=8080
const app=express()

const httpServer = app.listen(port,()=>{console.log("Server ok")})

const socketsServer= new Server(httpServer)


app.use(express.static(path.join(__dirname,"/public")))


app.engine(".hbs",engine({extname:".hbs"}))
app.set("view engine",".hbs")
app.set("views",path.join(__dirname,"/views"))


app.use(viewsRouter)

let msgHistory=[]

socketsServer.on("connection",(socket)=>{
    console.log("Cliente conectado", socket.id)
    socket.on("clientMessage",(data)=>{
        console.log("Data desde el cliente: ",data)
    })

    setTimeout(() => {
        socket.emit("msgServer","canal abierto")
    },4000);

    // setTimeout(() => {
    //     socketsServer.emit("msgAllFromServer","nueva promocion")
    // },8000);

    // setTimeout(() => {
    //     socket.broadcast.emit("msgAllNoXMe","nuevo usuario conectado")
    // },8000);

    // socket.on("msgKey",(data)=>{
    //     console.log("Tecla desde el cliente: ",
    //     data)
    // })

    socket.on("msgInput",(data)=>{
        const msgItem={
            socketid: socket.id,
            mensaje:data
        }
        msgHistory.push(msgItem)
      //  console.log("msgItem: ",msgItem)
    })

    socket.emit("messages",msgHistory)

})


