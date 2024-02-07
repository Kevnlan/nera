const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 8080;

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get('/', function (req, res) {
    res.sendfile('index.html');
});

const messages = [
    {name:"Tim",message:"yo"},
    {name:"Pam",message:"hi"}
  ]

app.get('/messages', (req, res) => {
    res.send(messages);
});

app.get('/users', (req, res) => {
    res.sendFile(__dirname + '/users.html');
  });

app.post('/message', (req, res) => {
    messages.push(req.body);
    res.sendStatus(200);
  });

// Generate 100 users with details
function generateUsers() {
    const users = [];
    for (let i = 1; i <= 100; i++) {
      users.push({
        first_name: `User${i}`,
        last_name: 'Doe',
        email: `user${i}@example.com`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        phone: `+123456789${i.toString().padStart(2, '0')}`,
        gender: i % 2 === 0 ? 'Male' : 'Female',
        address: {
          city: 'Anytown',
          location: 'Anywhere',
          country: 'Anyland',
          street: `${i} Main St`,
        },
      });
    }
    return users;
  }
  
  // Emit the list of 100 users when a client connects
  io.on('connection', (socket) => {
    console.log('Client connected');
    socket.emit('users', { data: generateUsers() });
  });

server.listen(port, function () {
    console.log(`Listening on port ${port}`);
});