const { MessageEmbed } = require("discord.js");
const util = require('util');

exports.launch = async (client, message, args, lang) => {
  if (!message.member.hasPermission('KICK_MEMBERS')) return;

  const member = message.mentions.members.first();
  if (!member) return;
  if (!member.kickable) return message.reply(lang.cantkick);

  const reason = args.slice(1).join(' ') || lang.noreason;

  await member.kick(reason).then(async () => {
    const embed = new MessageEmbed()
      .setColor(0x2F3136)
      .setAuthor(util.format(lang.beenkicked, member.user.tag), member.user.displayAvatarURL({ format: 'png' || 'gif', dynamic: true }))
      .setDescription(`**${lang.reason}:** ${reason}`)
      .setTimestamp()
      .setFooter("gokium", client.user.displayAvatarURL({format: "png" || "gif"}));

    if (!member.user.bot) member.user.send(`${util.format(lang.kickedmsg, message.guild.name, message.author.tag)}\n${reason ? `**${lang.reason}:** ${reason}` : ""}`);
    message.channel.send(embed).then(() => message.delete());
  });
}