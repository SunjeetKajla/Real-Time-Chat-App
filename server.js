const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

console.log('Socket.IO server initialized');

app.use(express.static(path.join(__dirname, 'public/')));

app.use(session({
    secret: 'MyNameIsSunjeetKajla',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
    clientID: '1049229979991-gskp9rrpbkpukes0831djjc5ff50sjmq.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => res.redirect('/')
);

app.get('/auth/user', (req, res) => {
    res.json(req.user || null);
});

app.get('/auth/logout', (req, res) => {
    req.logout(() => res.redirect('/'));
});

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('send-chat-message', (data) => {
    console.log('Received chat message:', data);
    const messageWithName = `${data.name}: ${data.message}`;
    if (data.room === "") {
        socket.broadcast.emit('receive-message', messageWithName);
    } else {
        socket.to(data.room).emit('receive-message', messageWithName);
    }
});

    socket.on('join-room', (room) => {
        socket.join(room);
        console.log(`User ${socket.id} joined room: ${room}`);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });

    socket.on('error', (error) => {
        console.error('Socket error:', error);
    });
});

server.on('error', (error) => {
    console.error('Server error:', error);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, '127.0.0.1', () => {
    console.log(`Server running on http://127.0.0.1:${PORT}`);
    console.log('Socket.IO endpoint available at /socket.io/');
});