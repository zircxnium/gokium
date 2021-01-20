const discord = require('discord.js');
const client = new discord.Client();
const fs = require('fs');
require('dotenv').config();

fs.readdir(__dirname + '/events', (err, files) => {
  if(err) throw err;

  files.forEach(file => {
    const eventName = file.replace('.js', '');
    const eventFunction = require(`${__dirname}/events/${file}`);
    client.on(eventName, (...args) => eventFunction.run(client, ...args));
  })
})

client.login(process.env.TOKEN);