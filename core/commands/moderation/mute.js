const { MessageEmbed } = require("discord.js");

exports.launch = (client, message, args) => {
  if (!message.member.hasPermission('MANAGE_ROLES')) return;

  const member = message.mentions.members.first();
  if (!member) return;
  if (member.id == message.author.id) return message.reply("Tu ne peux pas te mute.");
      
  const reason = args.slice(1).join(' ') || "Aucune raison spécifiée";

  const muteRole = message.guild.roles.cache.find(r => r.name === "Muted");
  if (!muteRole) {
    try {
      muteRole = await message.guild.roles.create({data: {
        name: "Muted",
        color: "#514f48",
        permissions: []
      }, reason: 'Create it.'});

      message.guild.channels.cache.forEach(async (channel, id) => {
        await channel.updateOverwrite(muteRole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false,
          SEND_TTS_MESSAGES: false,
          ATTACH_FILES: false,
          SPEAK: false
        });
      });
    } catch(err) {
      console.log(er.stack);
    }
  }

  const hasRole = member.roles.cache.has(muteRole.id);
  if (hasRole) return message.channel.send(`Cet utilisateur est déjà mute.`);
  
  member.roles.add(muteRole.id).then(() => {
    const embed = new MessageEmbed()
      .setColor(0x2F3136)
      .setAuthor(`__${member.user.tag}__ à été mute`, member.user.displayAvatarURL({ format: 'png' || 'gif', dynamic: true }))
      .setTimestamp()
      .setFooter("gokium", client.user.displayAvatarURL({format: "png" || "gif"}));

    if (reason)
      embed.setDescription(`**Raison:** ${reason}`);

    if (!member.bot) member.send(`T'as été mute de **${message.guild.name}** par ${message.author.tag} !\n${reason ? `**Raison:** ${reason}` : ""}`);
    message.channel.send(embed).then(() => message.delete());
  })
}

exports.commands = {
  description: "Mute un membre.",
  use: "mute [utilisateur] (raison optionnel)"
}