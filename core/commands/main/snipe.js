const { MessageEmbed } = require("discord.js");
const db = require('quick.db');

exports.launch = (client, message, args, lang) => {
  const snipes = db.get(`snipes_${args[0] == "edit" ? "edited" : "deleted"}_${message.channel.id}`);
  if (!snipes) return;

  const embed = new MessageEmbed()
    .setColor(0x2F3136)
    .setAuthor(snipes.username, snipes.avatarURL)
    .addField(`**${snipes.newMessage ? lang.old : ""}Message**`, snipes.message, true)
    .setTimestamp()
    .setFooter("gokium", client.user.displayAvatarURL({format: "png" || "gif"}));

  if (snipes.newMessage) embed.addField(`**${lang.new} Message**`, snipes.newMessage, true);
  return message.channel.send(embed).then(() => db.set(`snipes_${args[0] == "edit" ? "edited" : "deleted"}_${message.channel.id}`, null));
}