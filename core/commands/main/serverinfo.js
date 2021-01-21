const { MessageEmbed } = require("discord.js");
const { checkDays } = require('../../utils');

exports.launch = (client, message, args, lang) => {
  const date = message.channel.guild.createdAt;
  const embed = new MessageEmbed()
    .setColor(0x2F3136)
    .setThumbnail(message.guild.iconURL({ format: 'png' || 'gif', dynamic: true }))
    .setAuthor(`${message.guild.name}`, message.guild.iconURL({ format: 'png' || 'gif', dynamic: true }))
    .addField(`**${lang.name}**`, message.guild.name, true)
    .addField("**ID**", message.guild.id, true)
    .addField(`**${lang.owner}**`, message.guild.owner, true, true)
    .addField(`**${lang.members}**`, message.guild.memberCount, true, true)
    .addField(`**${lang.humans}**`, message.guild.members.cache.filter(member => !member.user.bot).size, true, true)
    .addField("**Bots**", message.guild.members.cache.filter(member => member.user.bot).size, true, true)
    .addField(`**${lang.roles}**`, message.guild.roles.cache.size, true, true)
    .addField("**Channels**", message.guild.channels.cache.size, true, true)
    .addField(`**${lang.region}**`, message.guild.region.charAt(0).toUpperCase() + message.guild.region.slice(1), true, true)
    .addField(`**${lang.createdAt}**`, `${date.toLocaleDateString('fr-FR')} - ${date.getUTCHours()}:${date.getUTCMinutes()} (${checkDays(message.channel.guild.createdAt)})`, true)
    .setTimestamp()
    .setFooter("gokium", client.user.displayAvatarURL({ format: 'png' || 'gif', dynamic: true }));

  return message.channel.send(embed);
}