const Discord = require('discord.js');

/* Export our launch() function */
module.exports.launch = (bot, config, message, args) => {
  function checkDays(date) {
    let now = new Date();
    let diff = now.getTime() - date.getTime();
    let days = Math.floor(diff / 86400000);
    return days + (days == 1 ? " jour" : " jours");
  };
  const date = message.channel.guild.createdAt;
  const theEmbed = new Discord.MessageEmbed()
    .setColor(0x6FA8DC)
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
    .setFooter("Gokium", bot.user.displayAvatarURL({ format: 'png' || 'gif', dynamic: true }));

  return message.channel.send({embed: theEmbed});
}

/* Exports */
exports.commands = {
  description: "Afficher les infos du serveur.",
  use: "serverinfo"
}