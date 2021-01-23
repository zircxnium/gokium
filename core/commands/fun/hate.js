const { MessageEmbed } = require("discord.js");

exports.launch = (client, message, args, lang) => {
  let user = message.mentions.users.first();
  const hate = Math.random() * 100;
  const hateIndex = Math.floor(hate / 10);
  const hateLevel = "💀".repeat(hateIndex) + "-".repeat(10 - hateIndex);

  if (!user && args[0] === "random") user = message.guild.members.cache.filter(member => !member.user.bot).random().user; 
  if (!user) return message.reply('faut peut-être me mentionner l\'utilisateur, tu penses pas ? :)');

  const embed = new MessageEmbed()
    .setColor(0x2F3136)
    .setDescription(`💀 **${message.author.username}** déteste **${user.username}** à :`)
    .addField(`☠️ **${Math.floor(hate)}%**`, `\n\n${hateLevel}`)
    .setTimestamp()
    .setFooter("gokium", client.user.displayAvatarURL({format: "png" || "gif"}));

  return message.channel.send(embed);
}

exports.commands = {
  description: "Calcule le taux de haine avec la personne mentionné.",
  use: "hate [utilisateur]"
}