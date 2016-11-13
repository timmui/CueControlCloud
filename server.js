const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const routes = require('./routes')(io);
const port = 3030;

// Body parsing middleware
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  next();
});

io.on('connection', function(client){
  client.on('event', function(data){});
  client.on('disconnect', function(){});
});

app.use('/', routes);
// Configure Port
if (port) {
  app.listen(port, error => {
    if (error) {
      console.error(error);
    }
    console.info(`Running on port ${port}.`);
  });
}
else {
  console.error('No port specified in config.');
}
