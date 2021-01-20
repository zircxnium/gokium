const Discord = require('discord.js');
const db = require('quick.db');

/* Export our launch() function */
exports.launch = (bot, config, message, args) => {
  let user = message.mentions.users.first();
  if (!user) user = message.author;

  let xpCount = db.fetch(`xp_${message.guild.id}_${user.id}`);
  let messageCount = db.fetch(`messages_count_${message.guild.id}_${user.id}`);
  let levelCount = db.fetch(`level_${message.guild.id}_${user.id}`);
  let nxtLvl = levelCount * 300;

  if (xpCount == null) xpCount = '0';
  if (messageCount == null) messageCount = '0';
  if (levelCount == null) levelCount = '0';

  const embed = new Discord.MessageEmbed()
    .setColor("#e30e0e")
    .setTitle(`Stats de **${user.username}**`)
    .setDescription(`**Level:** ${levelCount}\n**XP:** ${xpCount}/${nxtLvl}\n**Message(s):** ${messageCount}`)
    .setTimestamp()
    .setFooter(bot.user.username, bot.user.displayAvatarURL({format: "png" || "gif"}));

  message.channel.send(embed);
}

/* Exports */
exports.commands = {
  description: "Voir votre rank ou celui de quelqu'un.",
  use: "rank (utilisateur optionnel)"
}