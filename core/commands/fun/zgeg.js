const { MessageEmbed } = require("discord.js");

exports.launch = (client, message, args, lang) => {
  let user = message.mentions.users.first() || message.author;
  const zgeg = Math.random() * 100;
  const zgegIndex = Math.floor(zgeg / 10);
  const zgegLevel = "=".repeat(zgegIndex);
  
  if (!user && args[0] === "random") user = message.guild.members.cache.filter(member => !member.user.bot).random().user;

  const embed = new MessageEmbed()
    .setColor(0x2F3136)
    .setDescription(`🍆 **${user.username}**, ZgegoMachine :)`)
    .addField(lang.size, `8=${zgegLevel}D`)
    .setTimestamp()
    .setFooter("gokium", client.user.displayAvatarURL({format: "png" || "gif"}));

  return message.channel.send(embed);
}