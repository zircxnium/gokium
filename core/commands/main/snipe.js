const { MessageEmbed } = require("discord.js");
const db = require('quick.db');

exports.launch = (client, message, args) => {
  const snipes = db.get(`snipes_${args[0] == "edit" ? "edited" : "deleted"}_${message.channel.id}`);
  const embed = new MessageEmbed()
    .setColor(0x2F3136)
    .setAuthor(snipes.username, snipes.avatarURL)
    .addField(`**${snipes.newMessage ? "Ancien " : ""}Message**`, snipes.message, true)
    .setTimestamp()
    .setFooter("gokium", client.user.displayAvatarURL({format: "png" || "gif"}));

  if (snipes.newMessage) embed.addField("**Nouveau Message**", snipes.newMessage, true);
  return message.channel.send(embed);
}

exports.commands = {
  description: "Snipe le dernier message supprimé ou édité.",
  use: "snipe ['edit' optionnel]"
}