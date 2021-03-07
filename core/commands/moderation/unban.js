const { MessageEmbed } = require("discord.js");
const util = require('util');

exports.launch = (client, message, args, lang) => {
  if (!message.member.hasPermission('BAN_MEMBERS')) return;
  
  const userId = message.mentions.users.first() && message.mentions.users.first().id || args[0];
  if (!userId) return;
  console.log(userId);

  const reason = args.slice(1).join(' ') || lang.noreason;

  message.guild.fetchBans().then(bans => {
    const banHandle = bans.find(ban => ban.user.id === userId);
    if (!banHandle) return;

    const embed = new MessageEmbed()
      .setColor(0x2F3136)
      .setAuthor(util.format(lang.beenunban, banHandle.user.tag), banHandle.user.displayAvatarURL({ format: 'png' || 'gif', dynamic: true }))
      .setDescription(`**${lang.reason}:** ${reason}`)
      .setTimestamp()
      .setFooter("gokium", client.user.displayAvatarURL({format: "png" || "gif"}));

    message.guild.members.unban(banHandle.user.id, reason).then(() => message.delete().then(() => message.channel.send(embed)));
  });
}