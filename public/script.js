const socket = io('http://127.0.0.1:3000');
const joinRoomButton = document.getElementById('room-button');
const messageInput = document.getElementById('message-input');
const roomInput = document.getElementById('room-input');
const form = document.getElementById('form');
const room = roomInput.value || 'global';
let currentUser = null;

async function loadMessageHistory(room = 'global') {
    try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        displayMessage(`Loading message history for room: ${room}... in 4 seconds`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        displayMessage(`Loading message history for room: ${room}... in 3 seconds`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        displayMessage(`Loading message history for room: ${room}... in 2 seconds`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        displayMessage(`Loading message history for room: ${room}... in 1 seconds`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        const response = await fetch(`/api/messages/${room}`);
        const messages = await response.json();
        
        // Clear existing messages
        document.getElementById('message-container').innerHTML = '';
        
        // Display each message
        messages.forEach(msg => {
            displayMessage(`${msg.user_name}: ${msg.message}`);
        });
        
    } catch (error) {
        console.error('Error loading messages:', error);
    }
}

fetch('/auth/user')
    .then(res => res.json())
    .then(user => {
        currentUser = user;
        if (user) {
            showChatInterface();
        } else {
            showLoginInterface();
        }
    });

document.getElementById('loginGoogleButton').addEventListener('click', () => {
    window.location.href = '/auth/google';
});
document.getElementById('logoutButton').addEventListener('click', () => {
    window.location.href = '/auth/logout';
});
document.getElementById('loginGuestButton').addEventListener('click', () => {
    showChatInterfaceGuest();
    currentUser = { displayName: 'Anonymous', isGuest: true };
});

function showChatInterface() {
    document.getElementById('message-container').style.display = 'block';
    document.getElementById('form').style.display = 'flex';
    document.getElementById('loginGoogleButton').style.display = 'none';
    document.getElementById('loginGuestButton').style.display = 'none';
    document.getElementById('alert').style.display = 'none';
    document.getElementById('logoutButton').style.display = 'block';
    loadMessageHistory('global');
    const userName = currentUser?.displayName || 'Anonymous';
    displayMessage(`Welcome, ${userName}!`);
}
function showChatInterfaceGuest() {
    document.getElementById('message-container').style.display = 'block';
    document.getElementById('form').style.display = 'flex';
    document.getElementById('loginGuestButton').style.display = 'none';
    document.getElementById('alert').style.display = 'none';
    loadMessageHistory('global');
    const userName = currentUser?.displayName || 'Anonymous';
    displayMessage(`Welcome, ${userName}!`);
}

function showLoginInterface() {
    document.getElementById('message-container').style.display = 'none';
    document.getElementById('form').style.display = 'none';
    document.getElementById('loginGoogleButton').style.display = 'block';
    document.getElementById('alert').style.display = 'block';
    document.getElementById('logoutButton').style.display = 'none';
}

socket.on('connect', () => {
    displayMessage(`Connected to server, You connected with id: ${socket.id}`);
    displayMessage("You Joined Global Chat Room, To Chat Personally - Join a Room");
});


socket.on('receive-message', message => {
    displayMessage(message);
});

form.addEventListener("submit", e => {
    e.preventDefault();
    const message = messageInput.value;
    const room = roomInput.value;

    if (message.trim() === "") return;
    displayMessage(`You: ${message}`);
    socket.emit('send-chat-message', { message, room, name: currentUser?.displayName || 'Anonymous' });


    messageInput.value = "";
})

joinRoomButton.addEventListener("click", () => {
    const room = roomInput.value;
    if (room) {
        socket.emit('join-room', room);
        displayMessage(`Joined room: ${room}`);
        loadMessageHistory(room);
    }
});

socket.on('chat-message', data => {
    displayMessage(`${data.name}: ${data.message}`);
});

function displayMessage(message) {
    const div = document.createElement('div');
    div.textContent = message;
    document.getElementById('message-container').appendChild(div);
    div.className = 'p-3 bg-gray-50 rounded-lg border-l-4 border-blue-400';
}

