var socket = io.connect('http://localhost:3000');

// Get DOM elements in respective Js variables
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
// const messageContainer = document.querySelector(".container")
const messageContainer = document.getElementById('list-chats');

// Message Audio
var audio = new Audio('audio/ting.mp3');

// Function which will append event info to the contaner
const append = (message, position)=>{
    const messageElement = document.createElement('li');
    messageElement.classList.add('d-flex');
    messageElement.classList.add('justify-content-between');
    messageElement.classList.add('mb-4');
    if (position == 'left'){
    messageElement.innerHTML = `<img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp" alt="avatar"   class="rounded-circle d-flex align-self-start me-3 shadow-1-strong" width="60"> <div class="card mask-custom">    <div class="card-header d-flex justify-content-between p-3" style="border-bottom: 1px solid rgba(255,255,255,.3);">      <p class="fw-bold mb-0"> User</p>   <p class="text-light small mb-0"><i class="far fa-clock"></i> 12 mins ago</p> </div>  <div class="card-body"> <p class="mb-0">  ${message} </p> </div> </div>`;
    }
    else {
        messageElement.innerHTML = `<div class="card mask-custom w-100">
        <div class="card-header d-flex justify-content-between p-3"
          style="border-bottom: 1px solid rgba(255,255,255,.3);">
          <p class="fw-bold mb-0">Lara Croft</p>
          <p class="text-light small mb-0"><i class="far fa-clock"></i> 13 mins ago</p>
        </div>
        <div class="card-body">
          <p class="mb-0">
            ${message}
          </p>
        </div>
      </div>
      <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-5.webp" alt="avatar"
        class="rounded-circle d-flex align-self-start ms-3 shadow-1-strong" width="60">`;
    }
    messageContainer.append(messageElement);

    // const messageElement = document.createElement('div');
    // messageElement.innerText = message;
    // messageElement.classList.add('message');
    // messageElement.classList.add(position);
    // messageContainer.append(messageElement);
    if(position =='left'){ 
        audio.play();
    }
}

// Ask new user for his/her name and let the server know
const name = prompt("Please enter your preferred name");
socket.emit('new-user-joined', name);

// If a new user joins, receive his/her name from the server
// No-longer being used
socket.on('user-joined', name =>{
    append(`${name} joined the chat`, 'right')
})

// If server sends a message, receive it
socket.on('receive', data =>{
    append(data.message, 'left')
})

// If a user leaves the chat, append the info to the container
// No-longer being used
socket.on('left', name =>{
    append(`${name} left the chat`, 'left');
})

// If the form gets submitted, send server the message
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You : ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = ''
})