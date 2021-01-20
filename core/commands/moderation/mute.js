const Discord = require('discord.js');

/* Export our launch() function */
module.exports.launch = async (bot, config, message, args) => {
  if (!message.member.hasPermission('MANAGE_ROLES')) return;

  let toMute = message.mentions.members.first();
  if (!toMute) return;
  if (toMute.id == message.author.id) return message.reply("toi t'es débile..");
      
  const argsssss = message.content.split(' ').slice(1);
  let reason = argsssss.slice(1).join(' ') || "Aucune raison spécifiée";

  let muteRole = message.guild.roles.cache.find(r => r.name === "Muted");
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
    } catch(e) {
      console.log(e.stack);
    }
  }

  let hasRole = toMute.roles.cache.has(muteRole.id);
  if (hasRole) return message.channel.send(`Cet utilisateur est déjà mute..`);
  
  toMute.roles.add(muteRole.id).then(async () => {
    const theEmbed = new Discord.MessageEmbed()
      .setColor(0x6FA8DC)
      .setAuthor(`${toMute.user.tag} à été mute`, toMute.user.displayAvatarURL({ format: 'png' || 'gif', dynamic: true }))
      .setDescription(`**Raison:** ${reason}`)
      .setTimestamp()
      .setFooter("Gokium", bot.user.displayAvatarURL({ format: 'png' || 'gif', dynamic: true }));

    if (!toMute.bot) toMute.send(`T'as été mute de **${message.guild.name}** par ${message.author.tag} !\n**Raison:** ${reason}`).catch(err => console.log(err));
    await message.channel.send(theEmbed).then(() => {
      message.delete();
    });
  })
}

/* Exports */
exports.commands = {
  description: "Mute un membre.",
  use: "mute [utilisateur] (raison optionnel)"
}