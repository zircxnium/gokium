const { MessageEmbed } = require("discord.js");

exports.launch = (client, message, args, lang) => {
  const anoMsg = args.join(' ');
  if (!anoMsg) return;

  const embed = new MessageEmbed()
    .setAuthor(lang.author, "https://i.imgur.com/xUhKRUT.png")
    .setColor(0x2F3136)
    .setDescription(anoMsg)
    .setTimestamp()
    .setFooter("gokium", client.user.displayAvatarURL({format: "png" || "gif"}));

  return message.delete().then(() => message.channel.send(embed));
}