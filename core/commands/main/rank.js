const { MessageEmbed } = require("discord.js");
const db = require('quick.db');

exports.launch = (client, message, args, lang) => {
  const user = message.mentions.users.first() || message.author;
  const xpCount = db.get(`xp_${message.guild.id}_${user.id}`);
  const messageCount = db.get(`messages_count_${message.guild.id}_${user.id}`);
  const levelCount = db.get(`level_${message.guild.id}_${user.id}`);
  const nxtLvl = levelCount * 300;

  if (xpCount == null) xpCount = '0';
  if (messageCount == null) messageCount = '0';
  if (levelCount == null) levelCount = '0';

  const embed = new MessageEmbed()
    .setColor(0x2F3136)
    .setTitle(`${lang.rank} **${user.username}**`)
    .setDescription(`**${lang.level}:** ${levelCount}\n**XP:** ${xpCount}/${nxtLvl}\n**Message(s):** ${messageCount}`)
    .setTimestamp()
    .setFooter("gokium", client.user.displayAvatarURL({format: "png" || "gif"}));

  return message.channel.send(embed);
}