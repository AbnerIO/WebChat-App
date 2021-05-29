const { Socket } = require("socket.io"); //evento para on connect en modelo de server
const {comprobarJWT} = require("../helpers");
const { ChatMensajes} = require("../models")

const chatMensajes = new ChatMensajes();

const socketController = async(socket = new Socket(), io)=>{
    
    const usuario = await comprobarJWT(socket.handshake.headers["x-token"]);
    if(!usuario){
        return socket.disconnect();
    }
    //agregar al usuario conectado
    chatMensajes.agregarUsuario(usuario);
    io.emit("usuarios-activos", chatMensajes.usuariosArr);
    
    //limpiar cuando alguien se deconecta
    socket.on("disconnect", ()=>{
        chatMensajes.desconectarUsuario(usuario.id)
        io.emit("usuarios-activos", chatMensajes.usuariosArr);
   })
    
}

module.exports={
    socketController
}