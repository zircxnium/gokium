const { MessageEmbed } = require("discord.js");

exports.launch = async (client, message, args) => {
  if (!message.member.hasPermission('KICK_MEMBERS')) return;

  const member = message.mentions.members.first();
  if (!member) return;
  if (!member.kickable) return message.reply('Tu ne peux pas kick ce membre.');

  const reason = args.slice(1).join(' ') || "Aucune raison spécifiée";

  await member.kick(reason).then(async () => {
    const embed = new MessageEmbed()
      .setColor(0x2F3136)
      .setAuthor(`__${member.user.tag}__ à été kick`, member.user.displayAvatarURL({ format: 'png' || 'gif', dynamic: true }))
      .setTimestamp()
      .setFooter("Gokium", client.user.displayAvatarURL({format: "png" || "gif"}));

    if (reason)
      embed.setDescription(`**Raison:** ${reason}`);

    if(!member.user.bot) member.user.send(`T'as été kick de **${message.guild.name}** par **${message.author.tag}** !\n${reason ? `**Raison:** ${reason}` : ""}`);
    message.channel.send(embed).then(() => message.delete());
  });
}

exports.commands = {
  description: "Kick un membre.",
  use: "kick [utilisateur] (raison optionnel)"
}