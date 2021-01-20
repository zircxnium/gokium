const Discord = require('discord.js');
let inline = true;

/* Export our launch() function */
module.exports.launch = (bot, config, message, args) => {
  const member = message.mentions.members.first() || message.member;
  let user = message.mentions.users.first() || message.author;

  function checkDays(date) {
    let now = new Date();
    let diff = now.getTime() - date.getTime();
    let days = Math.floor(diff / 86400000);
    return days + (days <= 1 ? " jour" : " jours");
  };

  const status = {
    online: "En ligne",
    idle: "Absent",
    dnd: "Ne pas déranger",
    offline: "Offline/Invisible"
  };

  let theEmbed = new Discord.MessageEmbed()
    .setColor(0x6FA8DC)
    .setTitle(`Infos de ${user.username}`)
    .setThumbnail(user.displayAvatarURL({ format: 'png' || 'gif', dynamic: true }))
    .addField("**Tag**", `${user.tag}`, true)
    .addField("**ID**", `${user.id}`, inline, true)
    .addField("**Bot**", `${member.user.bot ? `Oui` : `Non`}`, true)
    .addField("**Status**", `${status[member.user.presence.status]}`, inline, true)
    .addField("**Joue à**", `${member.user.presence.activities.find(a => a.type === "PLAYING") ? `🎮 **${member.presence.activities.find(a => a.type === "PLAYING").name}** - ${member.user.presence.activities.find(a => a.type === "PLAYING").details}` : "Rien"}`, inline, true)
    .addField("**Roles**", `${member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `<@&${roles.id}>`).join(" **|** ") || "Aucun Roles"}`, true)
    .addField("**Création**", `${user.createdAt.toUTCString().substr(0, 16)} (${checkDays(user.createdAt)})`, true)
    .addField("**A rejoint le serveur**", `${member.joinedAt.toUTCString().substr(0, 16)} (${checkDays(member.joinedAt)})`, true)
    .setTimestamp()
    .setFooter("Gokium", bot.user.displayAvatarURL({ format: 'png' || 'gif', dynamic: true }));

  return message.channel.send({embed: theEmbed});
}

/* Exports */
exports.commands = {
  description: "Afficher vos infos ou ceux d'un utilisateur.",
  use: "userinfo (utilisateur optionnel)"
}