export default {
  // ws means we're communicating over websockets
  // in production environment with SSL enabled, you'd use wss
  SERVER_URL: 'ws://localhost:3000/websocket',
  // SERVER_URL: 'ws://192.168.1.81:3000/websocket',
  errorStyles: {
    text: { color: '#fff' },
    container: { backgroundColor: '#F44336' },
  },
};
