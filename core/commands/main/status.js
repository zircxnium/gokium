const Discord = require('discord.js');
let inline = true;

/* Export our launch() function */
module.exports.launch = (bot, config, message, args) => {
  const member = message.mentions.members.first() || message.member;
  let user = message.mentions.users.first() || message.author;

  let theEmbed = new Discord.MessageEmbed()
    .setColor(0x6FA8DC)
    .setAuthor(user.username, user.displayAvatarURL({ format: 'png' || 'gif', dynamic: true }))
    .setDescription(`${member.user.presence.activities.find(a => a.type === "CUSTOM_STATUS") ? `${member.presence.activities.find(a => a.type === "CUSTOM_STATUS").emoji ? member.presence.activities.find(a => a.type === "CUSTOM_STATUS").emoji : ""} ${member.user.presence.activities.find(a => a.type === "CUSTOM_STATUS").state ? member.presence.activities.find(a => a.type === "CUSTOM_STATUS").state : ""}` : "Aucun status."}`)
  return message.channel.send({embed: theEmbed});
}

/* Exports */
exports.commands = {
  description: "Afficher votre status ou celui d'un utilisateur.",
  use: "status (utilisateur optionnel)"
}