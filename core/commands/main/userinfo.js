const { MessageEmbed } = require("discord.js");
const { checkDays } = require('../../utils');

exports.launch = (client, message, args, lang) => {
  const member = message.mentions.members.first() || message.member;

  const status = {
    online: lang.online,
    idle: lang.idle,
    dnd: lang.dnd,
    offline: lang.offline
  };

  const embed = new MessageEmbed()
    .setColor(0x2F3136)
    .setTitle(`${lang.title} **${member.user.username}**`)
    .setThumbnail(member.user.displayAvatarURL({ format: 'png' || 'gif', dynamic: true }))
    .addField("**Tag**", member.user.tag, true)
    .addField("**ID**", member.user.id, true, true)
    .addField("**Bot**", `${member.user.bot ? 'Oui' : 'Non'}`, true)
    .addField("**Status**", status[member.user.presence.status], true, true)
    .addField(`**${lang.playing}**`, `${member.user.presence.activities.find(a => a.type === "PLAYING") ? `🎮 **${member.presence.activities.find(a => a.type === "PLAYING").name}** - ${member.user.presence.activities.find(a => a.type === "PLAYING").details}` : "Rien"}`, true, true)
    .addField(`**${lang.roles}**`, `${member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `<@&${roles.id}>`).join(" **|** ") || "Aucun Role"}`, true)
    .addField(`**${lang.createdAt}**`, `${member.user.createdAt.toUTCString().substr(0, 16)} (${checkDays(member.user.createdAt)})`, true)
    .addField(`**${lang.joinedAt}**`, `${member.joinedAt.toUTCString().substr(0, 16)} (${checkDays(member.joinedAt)})`, true)
    .setTimestamp()
    .setFooter("gokium", client.user.displayAvatarURL({format: "png" || "gif"}));

  return message.channel.send(embed);
}