// This will check if the node version your are running is the required
// Node version, if it isn't it throw the following error to inform
// you.

if (Number(process.version.slice(1).split('.')[0]) < 10)
  throw new Error(
    'Node 10.0.0 or higher is required. Update Node on your system.',
  );

const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

const path = require('path');

const { Client } = require('discord.js');
const { Handler } = require('./handler');
require('dotenv').config();

const client = new Client({ disableEveryone: true });
const handler = new Handler(client, '!');
const mongoose = require("mongoose");

handler.load(path.join(__dirname, './modules'), {
  client,
  commandHandler: handler,
});

// Database
mongoose.connect(process.env.MONGODB_SRV, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).then(()=> {
  console.log(`Connected to database!`);
}).catch((err) => {
  console.log(err);
});

client.login(process.env.TOKEN);
