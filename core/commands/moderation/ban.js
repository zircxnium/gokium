const { MessageEmbed } = require("discord.js");

exports.launch = async (client, message, args) => {
  if (!message.member.hasPermission('BAN_MEMBERS')) return;
  
  const member = message.mentions.members.first();
  if (!member) return;
  if (!member.bannable) return message.reply('Tu ne peux pas ban ce membre.');

  const reason = args.slice(1).join(' ') || "Aucune raison spécifiée";
      
  await message.guild.members.ban(member.id, { reason }).then(() => {
    const embed = new MessageEmbed()
      .setColor(0x2F3136)
      .setAuthor(`__${member.user.tag}__ à été ban`, member.user.displayAvatarURL({ format: 'png' || 'gif', dynamic: true }))
      .setTimestamp()
      .setFooter("Gokium", client.user.displayAvatarURL({format: "png" || "gif"}));

    if (reason)
      embed.setDescription(`**Raison:** ${reason}`);

    if (!member.user.bot) user.send(`T'as été ban de **${message.guild.name}** par **${message.author.tag}** !\n${reason ? `**Raison:** ${reason}` : ""}`);
    message.channel.send(embed).then(() => message.delete());
  }).catch(err => console.error(err.message));
}

exports.commands = {
  description: "Bannir un membre.",
  use: "ban [utilisateur] (raison optionnel)"
}