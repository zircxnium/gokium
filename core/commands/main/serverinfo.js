const Discord = require('discord.js');
const { checkDays } = require('../../utils');

exports.launch = (client, message, args) => {
  const date = message.channel.guild.createdAt;
  const embed = new Discord.MessageEmbed()
    .setColor(0x2F3136)
    .setThumbnail(message.guild.iconURL({ format: 'png' || 'gif', dynamic: true }))
    .setAuthor(`${message.guild.name}`, message.guild.iconURL({ format: 'png' || 'gif', dynamic: true }))
    .addField("**Nom**", `${message.guild.name}`, true)
    .addField("**ID**", `${message.guild.id}`, true)
    .addField("**Propriétaire**", `${message.guild.owner}`, true, true)
    .addField("**Membres**", `${message.guild.memberCount}`, true, true)
    .addField("**Humains**", `${message.guild.members.cache.filter(member => !member.user.bot).size}`, true, true)
    .addField("**Bots**", `${message.guild.members.cache.filter(member => member.user.bot).size}`, true, true)
    .addField("**Rôles**", `${message.guild.roles.cache.size}`, true, true)
    .addField("**Channels**", `${message.guild.channels.cache.size}`, true, true)
    .addField("**Région**", `${message.guild.region.charAt(0).toUpperCase() + message.guild.region.slice(1)}`, true, true)
    .addField("**Création**", `${date.toLocaleDateString('fr-FR')} - ${date.getUTCHours()}:${date.getUTCMinutes()} (${checkDays(message.channel.guild.createdAt)})`, true)
    .setTimestamp()
    .setFooter("gokium", bot.user.displayAvatarURL({ format: 'png' || 'gif', dynamic: true }));

  return message.channel.send(embed);
}

exports.commands = {
  description: "Afficher les infos du serveur.",
  use: "serverinfo"
}