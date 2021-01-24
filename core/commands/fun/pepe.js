const { MessageEmbed } = require("discord.js")

exports.launch = (client, message, args, lang) => {
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

  const pepes = [pepe1, pepe2, pepe3, pepe4, pepe5, pepe6, pepe7, pepe8, pepe9, pepe10];
  const dapepe = Math.floor(Math.random() * pepes.length);

  const pepe = new MessageEmbed()
    .setColor(0x2F3136)
    .setDescription(`**${message.author.username}**, ${lang.heresapepe} !`)
    .setImage(pepes[dapepe])
    .setTimestamp()
    .setFooter("gokium", client.user.displayAvatarURL({format: "png" || "gif"}));

  return message.channel.send(pepe);
}