const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');

const port = process.env.PORT || 3000;
const mongodb_url = process.env.MONGODB_URL || 'mongodb://mongou:mongop@localhost:27017';
const app = express();

app.use(express.json());

// models
fs.readdirSync(`${__dirname}/app/models`).map(file => {
  require(`${__dirname}/app/models/${file}`);
});

// routes
fs.readdirSync(`${__dirname}/app/routes`).map(file => {
  const routeName = file.split('.')[0];
  const route = `./app/routes/${file}`;
  app.use(`/${routeName}`, require(route));
});

connect();

function listen() {
  app.listen(port);
  console.log(`Express app started on port ${port}`);
}

function connect() {
  mongoose.connection
    .on('error', console.log)
    .on('disconnected', connect)
    .once('open', listen);
  return mongoose.connect(mongodb_url, {
    keepAlive: 1,
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}