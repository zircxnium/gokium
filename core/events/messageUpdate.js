const db = require('quick.db');
const utils = require('../utils');

exports.run = (client, oldMessage, newMessage) => {
    if ((oldMessage.content == newMessage.content) || !oldMessage.author || oldMessage.author.bot) return;
    
    // const snipes = require("./db/snipeedit.json");
    // snipes[`${newMessage.channel.id}`] = [`${oldMessage}`, `${newMessage}`, `${newMessage.author.username}`, `${newMessage.author.displayAvatarURL({format: "png" || "gif"})}`];
  
    // const fileName = './db/snipeedit.json';
    // fs.writeFile(fileName, JSON.stringify(snipes, null, 2), function(error) {
    //   if (error) return console.log('oops');
    // });

    utils.logs({
        client,
        title: `✏️ Un message de **<@${newMessage.author.id}>** à été édité dans **<#${newMessage.channel.id}>**`,
        message: oldMessage,
        newMessage,
        guildId: newMessage.guild.id,
        initiator: newMessage.author
    });
};