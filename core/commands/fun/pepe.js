const { MessageEmbed } = require("discord.js")

/* Export our launch() function */
module.exports.launch = async (bot, config, message, args) => {
  const pepe1 = "https://cdn.discordapp.com/emojis/428556352915505165.png?v=1";
  const pepe2 = "https://cdn.discordapp.com/emojis/428556326482739230.png?v=1";
  const pepe3 = "https://cdn.discordapp.com/emojis/428556486235389973.png?v=1";
  const pepe4 = "https://cdn.discordapp.com/emojis/428556308929576960.png?v=1";
  const pepe5 = "https://cdn.discordapp.com/emojis/428556295218659329.png?v=1";
  const pepe6 = "https://cdn.discordapp.com/emojis/428556467021545473.png?v=1";
  const pepe7 = "https://cdn.discordapp.com/emojis/428556448507625474.png?v=1";
  const pepe8 = "https://cdn.discordapp.com/emojis/428556377754042378.png?v=1";
  const pepe9 = "https://cdn.discordapp.com/emojis/428556281767526405.png?v=1";
  const pepe10 = "https://cdn.discordapp.com/emojis/428556266366042112.png?v=1";

  let pepes = [pepe1, pepe2, pepe3, pepe4, pepe5, pepe6, pepe7, pepe8, pepe9, pepe10];
  let dapepe = Math.floor(Math.random() * pepes.length);

  let pepe = new MessageEmbed()
    .setColor("#00ff00")
    .setImage(pepes[dapepe]);

  return message.channel.send(pepe);
}

/* Exports */
exports.commands = {
  description: "Envoie un pepe.",
  use: "pepe"
}