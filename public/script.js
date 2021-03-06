const socket = io('/');
const videogrid = document.getElementById('video-grid');
const myPeer = new Peer(undefined,{
    path: '/peerjs',
    host:"/",
    port: '443'
}); 

const myVideo = document.createElement('video')
myVideo.muted = true;
const peers = {};

navigator.mediaDevices.getUserMedia({
    video:true,
    audio:true
}).then(stream=>{
    addVideo(myVideo,stream);
     
myPeer.on('call',call=>{
    call.answer(stream);
const video =document.createElement('video')
    call.on('stream',userVideoStream=>{
addVideo(video,userVideoStream);
    })
})

    socket.on('user-connected',userId=>{
     connectToNewUser(userId,stream)
    })
})
socket.on('user-disconnected',userId=>{
   if(peers[userId]){peers[userId].close()}
})

myPeer.on('open',id=>{
    socket.emit('join-room',RoomId,id);
})


function addVideo(video,stream){
    video.srcObject = stream;
    video.addEventListener('loadedmetadata',()=>{
        video.play();
    })
    videogrid.append(video);
}
function connectToNewUser(userId,stream){
    const call = myPeer.call(userId,stream);
    const video = document.createElement('video');
    call.on('stream',userVideoStream=>{
        addVideo(video,userVideoStream)
    })
    call.on('close',()=>{
        video.remove();
    })
    peers[userId] = call;
}