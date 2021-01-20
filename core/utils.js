const Discord = require('discord.js');
const fs = require('fs');
const db = require('quick.db');

exports.Write = (fileName, toWrite) => {
  fs.writeFileSync(fileName, JSON.stringify(toWrite, null, 2), (error) => {
    if (error) return console.log(error);
  });

  return;
}

exports.SendToLogs = (Type, client, title, author, msg, newMsg = null) => {
  let theEmbed;
  let logsChannel;
  
  if (Type !== "guildJoinAndLeft") {
    if (!msg.guild || !msg.guild.id) return;
    logsChannel = db.get(`logs_${msg.guild.id}`);
    if (!logsChannel) return;
    if (!msg.guild.channels.cache.has(logsChannel)) return;
  } else {
    if (!author.guild || !author.guild.id) return;
    logsChannel = db.get(`logs_${author.guild.id}`);
    if (!logsChannel) return;
    if (!author.guild.channels.cache.has(logsChannel)) return;
    author = author.user;
  }

  theEmbed = new Discord.MessageEmbed()
    .setTimestamp()
    .setFooter(`ID: ${author.id}`, client.user.displayAvatarURL({ format: 'png' || 'gif', dynamic: true }))
    .setAuthor(author.username, author.displayAvatarURL({ format: 'png' || 'gif', dynamic: true }))
    .setColor(0x6FA8DC);

  if (Type === "delete") {
    theEmbed.setDescription(title);

    if (msg.content) theEmbed.addField("**Message**", msg.content, true);
    var dAttachment = (msg.attachments).array();
    if (dAttachment.length > 0) {
      theEmbed.setImage(dAttachment[0].proxyURL);
      theEmbed.addField("**Attachment Name**", dAttachment[0].name, true);
    }
  } else if (Type === "guildJoinAndLeft") {
    theEmbed
      .setDescription(msg)
      .addField("**Message**", `${title}`, true);
  } else if (Type === "edit") {
    theEmbed
      .setDescription(title)
      .addField("**Ancien message**", `${msg.content}`, true)
      .addField("**Nouveau message**", `${newMsg.content}`, true);
  }

  client.channels.cache.get(logsChannel).send(theEmbed);
}