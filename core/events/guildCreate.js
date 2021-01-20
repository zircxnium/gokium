const db = require('quick.db');

exports.run = (client, guild) => db.set(`prefix_${guild.id}`, 'g!');