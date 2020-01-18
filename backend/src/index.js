const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');
const { setupWebSocket } = require('./websocket.js');

const app = express();

const server = http.Server(app);
setupWebSocket(server);

mongoose.connect("MONGO_URI", { 
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.use(cors());
app.use(express.json());
app.use('/api', routes);
app.listen(3333);