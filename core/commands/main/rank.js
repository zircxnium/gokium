const Discord = require('discord.js');
const db = require('quick.db');

exports.launch = (bot, config, message, args) => {
  const user = message.mentions.users.first() || message.author;
  const xpCount = db.fetch(`xp_${message.guild.id}_${user.id}`);
  const messageCount = db.fetch(`messages_count_${message.guild.id}_${user.id}`);
  const levelCount = db.fetch(`level_${message.guild.id}_${user.id}`);
  const nxtLvl = levelCount * 300;

  if (xpCount == null) xpCount = '0';
  if (messageCount == null) messageCount = '0';
  if (levelCount == null) levelCount = '0';

  const embed = new Discord.MessageEmbed()
    .setColor(0x2F3136)
    .setTitle(`Stats de **${user.username}**`)
    .setDescription(`**Level:** ${levelCount}\n**XP:** ${xpCount}/${nxtLvl}\n**Message(s):** ${messageCount}`)
    .setTimestamp()
    .setFooter("Gokium", client.user.displayAvatarURL({format: "png" || "gif"}));

  return message.channel.send(embed);
}

/* Exports */
exports.commands = {
  description: "Voir votre rank ou celui de quelqu'un.",
  use: "rank (utilisateur optionnel)"
}