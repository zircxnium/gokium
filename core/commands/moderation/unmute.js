const { MessageEmbed } = require("discord.js");

exports.launch = (client, message, args, lang) => {
  if(!message.member.hasPermission("MANAGE_ROLES")) return;

  const member = message.mentions.members.first();
  if(!member) return;

  const reason = args.slice(1).join(' ') || "Aucune raison spécifiée";

  const muteRole = message.guild.roles.cache.find(r => r.name === "Muted");
  if(!muteRole) return;
  const hasRole = member.roles.cache.has(muteRole.id);
  if(!hasRole) return message.channel.send(`Cet utilisateur n'est pas mute..`);

  member.roles.remove(muteRole.id).then(() => {
    const embed = new MessageEmbed()
      .setColor(0x2F3136)
      .setAuthor(`__${member.user.tag}__ à été unmute`, member.user.displayAvatarURL({ format: 'png' || 'gif', dynamic: true }))
      .setTimestamp()
      .setFooter("gokium", client.user.displayAvatarURL({format: "png" || "gif"}));
    
    if(!member.bot) toMute.send(`T'as été unmute de **${message.guild.name}** par ${message.author.tag} !\n${reason ? `**Raison:** ${reason}` : ""}`);
    message.channel.send(embed).then(() => message.delete());
  })
}

exports.commands = {
  description: "Unmute un membre.",
  use: "unmute [utilisateur] (raison optionnel)"
}