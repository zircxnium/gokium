const { MessageEmbed } = require("discord.js");

/* Export our launch() function */
module.exports.launch = async (bot, config, message, args) => {
  const anoMsg = message.content.split(' ').slice(1).join(' ');
  let embed = new MessageEmbed()
    .setAuthor("Anonyme", "https://i.imgur.com/xUhKRUT.png")
    .setColor(0x6FA8DC)
    .setDescription(anoMsg)
    .setTimestamp();
    message.delete().then(() => {
      return message.channel.send(embed);
    });
}

/* Exports */
exports.commands = {
  description: 'Envoie un message en anonyme.',
  use: "ano"
}