const { MessageEmbed } = require("discord.js");
const { checkDays } = require('../../utils');

exports.launch = (client, message, args) => {
  const member = message.mentions.members.first() || message.member;

  const status = {
    online: "En ligne",
    idle: "Absent",
    dnd: "Ne pas déranger",
    offline: "Offline/Invisible"
  };

  const embed = new MessageEmbed()
    .setColor(0x2F3136)
    .setTitle(`Infos de ${member.user.username}`)
    .setThumbnail(member.user.displayAvatarURL({ format: 'png' || 'gif', dynamic: true }))
    .addField("**Tag**", `${member.user.tag}`, true)
    .addField("**ID**", `${member.user.id}`, true, true)
    .addField("**Bot**", `${member.user.bot ? `Oui` : `Non`}`, true)
    .addField("**Status**", `${status[member.user.presence.status]}`, true, true)
    .addField("**Joue à**", `${member.user.presence.activities.find(a => a.type === "PLAYING") ? `🎮 **${member.presence.activities.find(a => a.type === "PLAYING").name}** - ${member.user.presence.activities.find(a => a.type === "PLAYING").details}` : "Rien"}`, true, true)
    .addField("**Roles**", `${member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `<@&${roles.id}>`).join(" **|** ") || "Aucun Roles"}`, true)
    .addField("**Création**", `${member.user.createdAt.toUTCString().substr(0, 16)} (${checkDays(user.createdAt)})`, true)
    .addField("**A rejoint le serveur**", `${member.joinedAt.toUTCString().substr(0, 16)} (${checkDays(member.joinedAt)})`, true)
    .setTimestamp()
    .setFooter("Gokium", client.user.displayAvatarURL({format: "png" || "gif"}));

  return message.channel.send(embed);
}

exports.commands = {
  description: "Afficher vos infos ou ceux d'un utilisateur.",
  use: "userinfo (utilisateur optionnel)"
}