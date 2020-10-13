const io = require('socket.io-client');
const socket = io('ws://localhost:10088?userId=7fa6baf0-bb81-11ea-a330-dfd57992fd01');

socket.on('connect', () => {
  // either with send()
  socket.send('Hello!');
  socket.emit('join', { username: '张三' });
  // Or with emit() and custom event names
  socket.emit('salutations', 'Hello!', { 'mr': 'john' }, Uint8Array.from([1, 2, 3, 4]));
});

// Handle the event sent with socket.send()
socket.on('message', (data) => {
  console.log(data);
});

socket.on('notification', (data) => {
  console.log('notification: ', data);
});
// Handle the event sent with socket.emit()
socket.on('greetings', (elem1, elem2, elem3) => {
  console.log(elem1, elem2, elem3);
});
