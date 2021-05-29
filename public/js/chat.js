const url = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:8080/api/auth/'
    : 'https://restserver-curso-fher.herokuapp.com/api/auth/';


let usuario  =null;
let socket  =null;

//referencias html
const txtUid = document.querySelector("#txtUid")
const txtMensaje = document.querySelector("#txtMensaje")
const ulUsuarios = document.querySelector("#ulUsuarios")
const ulMensajes = document.querySelector("#ulMensajes")
const btnSalir = document.querySelector("#btnSalir")




//validar token de local storage
const validarJWT=async()=>{
    const token = localStorage.getItem("token")|| "";

    if( token.length<=10){
        window.location="index.html";
        throw new Error("No hay token en la petición");
    }

    const resp =await fetch(url, {
        headers: {"x-token":token}
    })

    const {usuario:userDB, token:tokenDB} = await resp.json();
    localStorage.setItem("toke", tokenDB);
    usuario= userDB;
    document.title = usuario.nombre;
    
    await conectarSocket();
    
}

const conectarSocket = async()=>{

    socket=io({
        "extraHeaders": {
            "x-token": localStorage.getItem("token")
        }
    });

    socket.on("connect", ()=>{
        console.log("Sockets Online")
    })
    socket.on("disconnect", ()=>{
        console.log("Sockets Offline")
    })
    socket.on("recibir-mensajes",()=>{

    })
    socket.on("usuarios-activos",(payload)=>{
        console.log(payload)
    });
    socket.on("mensaje-privado",()=>{
     
    });


}



const main=async()=>{

    await validarJWT();

}

main();