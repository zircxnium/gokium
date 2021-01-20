const db = require('quick.db');
const utils = require('../utils');

exports.run = (client, message) => {
    if (!message.author || message.author.bot || !message.content) return;
    
    //   const snipes = require("./db/snipe.json");
    //   snipes[`${message.channel.id}`] = [`${message}`, `${message.author.username}`, `${message.author.displayAvatarURL({format: "png" || "gif"})}`];
    
    //   const fileName = './db/snipe.json';
    //   fs.writeFile(fileName, JSON.stringify(snipes, null, 2), function(error) {
    //     if (error) return console.log('oops');
    //   });
  
    utils.logs({
        client,
        title: `🗑️ Un message de **<@${message.author.id}>** à été supprimé dans **<#${message.channel.id}>**`,
        message: message.content,
        guildId: message.guild.id,
        initiator: message.author
    });
};