# Real-Time Chat Application

A modern, real-time chat application built with Node.js, Socket.IO, and Supabase. Features Google OAuth authentication, guest login, room-based messaging, and persistent message storage.

## Features

- **Real-time messaging** using Socket.IO
- **Google OAuth authentication** with Passport.js
- **Guest login** for anonymous users
- **Room-based chat** - join specific rooms or use global chat
- **Message persistence** with Supabase database
- **Message history** loading for each room
- **Responsive design** with Tailwind CSS
- **Session management** with Express sessions

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Socket.IO** - Real-time bidirectional communication
- **Supabase** - Database and backend services
- **Passport.js** - Authentication middleware
- **Express Session** - Session management

### Frontend
- **HTML5** - Markup
- **Vanilla JavaScript** - Client-side logic
- **Tailwind CSS** - Styling framework
- **Socket.IO Client** - Real-time communication

## Project Structure

```
├── public/
│   ├── index.html          # Main HTML file
│   └── script.js           # Client-side JavaScript
├── server/                 # Empty directory
├── .gitignore             # Git ignore rules
├── package.json           # Dependencies and scripts
├── package-lock.json      # Dependency lock file
└── server.js              # Main server file
```

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd real-time-chat-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   - The application uses hardcoded credentials (not recommended for production)
   - For production, create a `.env` file with:
     ```
     SUPABASE_URL=your_supabase_url
     SUPABASE_KEY=your_supabase_key
     GOOGLE_CLIENT_ID=your_google_client_id
     GOOGLE_CLIENT_SECRET=your_google_client_secret
     SESSION_SECRET=your_session_secret
     ```

## Database Setup

The application uses Supabase with a `messages` table structure:
```sql
CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  message TEXT NOT NULL,
  user_name TEXT NOT NULL,
  room TEXT DEFAULT 'global',
  created_at TIMESTAMP DEFAULT NOW()
);
```

## Usage

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

The server will start on `http://127.0.0.1:3000`

## API Endpoints

### Authentication
- `GET /auth/google` - Initiate Google OAuth
- `GET /auth/google/callback` - Google OAuth callback
- `GET /auth/user` - Get current user info
- `GET /auth/logout` - Logout user

### Messages
- `GET /api/messages/:room` - Get message history for a room

## Socket.IO Events

### Client to Server
- `send-chat-message` - Send a new message
- `join-room` - Join a specific chat room

### Server to Client
- `receive-message` - Receive new messages
- `connect` - Connection established
- `disconnect` - Connection lost

## Features in Detail

### Authentication System
- **Google OAuth**: Full authentication with user profile
- **Guest Mode**: Anonymous access without registration
- **Session Management**: Persistent login sessions

### Chat Functionality
- **Global Chat**: Default room for all users
- **Private Rooms**: Create/join specific rooms
- **Message History**: Load previous messages when joining rooms
- **Real-time Updates**: Instant message delivery

### User Interface
- **Responsive Design**: Works on desktop and mobile
- **Login Interface**: Clean authentication options
- **Chat Interface**: Intuitive messaging layout
- **Room Management**: Easy room switching

## Security Considerations

⚠️ **Important**: This application contains hardcoded credentials and is intended for educational purposes only.

For production deployment:
- Use environment variables for all sensitive data
- Implement proper CORS policies
- Add rate limiting
- Validate and sanitize all inputs
- Use HTTPS
- Implement proper error handling

## Development Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

## Dependencies

### Production
- `@supabase/supabase-js` - Supabase client
- `express` - Web framework
- `express-session` - Session middleware
- `passport` - Authentication middleware
- `passport-google-oauth20` - Google OAuth strategy
- `socket.io` - Real-time communication

### Development
- `nodemon` - Development server with auto-restart

## Browser Compatibility

- Modern browsers with WebSocket support
- Chrome, Firefox, Safari, Edge (latest versions)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is for educational purposes. Please check with the original course provider for licensing terms.

## Troubleshooting

### Common Issues

1. **Connection Issues**
   - Ensure server is running on correct port
   - Check firewall settings
   - Verify Socket.IO client version compatibility

2. **Authentication Problems**
   - Verify Google OAuth credentials
   - Check callback URL configuration
   - Ensure session secret is set

3. **Database Issues**
   - Verify Supabase connection
   - Check table structure
   - Ensure proper permissions

### Support

For issues related to this educational project, please refer to the course materials or create an issue in the repository.