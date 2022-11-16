const socket = io();

// socket.on('countUpdated',(count)=>{
//     console.log("Count Updated...",count);
// })

// document.querySelector("#increment").addEventListener("click",()=> {
//     console.log("Clicked");
//     socket.emit("increment")
// })

socket.on('message',(msg)=>{
    console.log(msg);
})

// document.querySelector("#textInputBtn").addEventListener("click",()=> {
//     let txt = document.getElementById("message").value;
//     socket.emit("sendMessage",txt)
// })

document.querySelector("#message_form").addEventListener("submit",(e)=> {
    e.preventDefault();
    let msg = e.target.elements.message.value;
    socket.emit("sendMessage",msg, (err)=>{
        if(err) {
            return console.log("ERROR:",err);
        }
        console.log("Message Delivered.");
    });
})


document.querySelector("#send-location").addEventListener("click",()=> {
    if(!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.')
    }
    navigator.geolocation.getCurrentPosition((position)=>{
        socket.emit("sendLocation",{
            lat: position.coords.latitude,
            lng: position.coords.longitude
        });
    },(err)=>{
        if(err) {
            return console.log("ERROR:",err);
        }
        console.log('Location Shared');
    })

})
