const { MessageEmbed } = require("discord.js")

exports.launch = (client, message, args, lang) => {
  const pepes = [
    "https://cdn.discordapp.com/emojis/428556352915505165.png?v=1",
    "https://cdn.discordapp.com/emojis/428556352915505165.png?v=1",
    "https://cdn.discordapp.com/emojis/428556486235389973.png?v=1",
    "https://cdn.discordapp.com/emojis/428556308929576960.png?v=1",
    "https://cdn.discordapp.com/emojis/428556295218659329.png?v=1",
    "https://cdn.discordapp.com/emojis/428556467021545473.png?v=1",
    "https://cdn.discordapp.com/emojis/428556448507625474.png?v=1",
    "https://cdn.discordapp.com/emojis/428556377754042378.png?v=1",
    "https://cdn.discordapp.com/emojis/428556281767526405.png?v=1",
    "https://cdn.discordapp.com/emojis/428556266366042112.png?v=1",
  ];

  const rolledPepe = Math.floor(Math.random() * pepes.length);

  const embed = new MessageEmbed()
    .setColor(0x2F3136)
    .setDescription(`**${message.author.username}**, ${lang.heresapepe} !`)
    .setImage(pepes[rolledPepe])
    .setTimestamp()
    .setFooter("gokium", client.user.displayAvatarURL({format: "png" || "gif"}));

  return message.channel.send(embed);
}