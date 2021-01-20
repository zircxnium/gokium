const { MessageEmbed } = require("discord.js");

exports.launch = (client, message, args) => {
  const anoMsg = args.join(' ');
  const embed = new MessageEmbed()
    .setAuthor("Anonyme", "https://i.imgur.com/xUhKRUT.png")
    .setColor(0x2F3136)
    .setDescription(anoMsg)
    .setTimestamp()
    .setFooter("Gokium", client.user.displayAvatarURL({format: "png" || "gif"}));

  return message.delete().then(() => message.channel.send(embed));
}

exports.commands = {
  description: 'Envoie un message en anonyme.',
  use: "ano"
}