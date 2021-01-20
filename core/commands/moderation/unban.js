const { MessageEmbed } = require("discord.js");

exports.launch = (client, message, args) => {
  if (!message.member.hasPermission('BAN_MEMBERS')) return;
  
  const userId = message.mentions.users.first() && message.mentions.users.first().id || args[0];
  if (!userId) return;

  const reason = args.slice(1).join(' ') || "Aucune raison spécifiée";

  message.guild.fetchBans().then(bans => {
    const banHandle = bans.find(ban => ban.user.id === userId);
    if (!banHandle) return;

    const embed = new MessageEmbed()
      .setColor(0x2F3136)
      .setAuthor(`__${banHandle.user.tag}__ à été unban`, banHandle.user.displayAvatarURL({ format: 'png' || 'gif', dynamic: true }))
      .setTimestamp()
      .setFooter("gokium", client.user.displayAvatarURL({format: "png" || "gif"}));

    if (reason)
      embed.setDescription(`**Raison:** ${reason}`);

    message.guild.members.unban(banHandle.user.id, reason).then(() => {
      message.delete();
      message.channel.send(embed);
    });
  });
}

exports.commands = {
  description: "Unban un membre.",
  use: "unban [utilisateur] (raison optionnel)"
}