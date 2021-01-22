const { MessageEmbed } = require("discord.js");

exports.launch = async (client, message, args, lang) => {
  if (!message.member.hasPermission('KICK_MEMBERS')) return;

  const member = message.mentions.members.first();
  if (!member) return;
  if (!member.kickable) return message.reply(lang.cantkick);

  const reason = args.slice(1).join(' ') || lang.noreason;

  await member.kick(reason).then(async () => {
    const embed = new MessageEmbed()
      .setColor(0x2F3136)
      .setAuthor(`__${member.user.tag}__ ${lang.beenkicked}`, member.user.displayAvatarURL({ format: 'png' || 'gif', dynamic: true }))
      .setTimestamp()
      .setFooter("gokium", client.user.displayAvatarURL({format: "png" || "gif"}));

    if (reason)
      embed.setDescription(`**${lang.reason}:** ${reason}`);

    if (!member.user.bot) member.user.send(`${lang.kickedMsg} **${message.guild.name}** par **${message.author.tag}** !\n${reason ? `**${lang.reason}:** ${reason}` : ""}`);
    message.channel.send(embed).then(() => message.delete());
  });
}