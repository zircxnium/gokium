const Discord = require('discord.js');

/* Export our launch() function */
module.exports.launch = async (bot, config, message, args) => {
  if(!message.member.hasPermission("MANAGE_ROLES")) return;

  let toMute = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  if(!toMute) return;

  const argsssss = message.content.split(' ').slice(1);
  let reason = argsssss.slice(1).join(' ');
  if(!reason) reason = "Aucune raison spécifiée";

  let muteRole = message.guild.roles.cache.find(r => r.name === "Muted");
  if(!muteRole) return message.channel.send(`Le role n'existe pas, gokium mute (utilisateur) pour le créer`);
  let hasRole = toMute.roles.cache.has(muteRole.id);
  if(!hasRole) return message.channel.send(`Cet utilisateur n'est pas mute..`);

  toMute.roles.remove(muteRole.id).then(() => {
      message.delete();
      if(!toMute.bot) toMute.send(`Yo mec t'as été unmute de **${message.guild.name}** par ${message.author.tag} !\n**Raison:** ${reason}`).catch(err => console.log(err));
      if(reason) {
        let theEmbed = new Discord.MessageEmbed()
        .setColor(0x6FA8DC)
        .setAuthor(`${toMute.user.tag} à été unmute`, toMute.user.displayAvatarURL({ format: 'png' || 'gif', dynamic: true }))
        .setDescription(`**Raison:** ${reason}`)
        .setTimestamp()
        .setFooter("Gokium", bot.user.displayAvatarURL({ format: 'png' || 'gif', dynamic: true }));
  
        message.channel.send({embed: theEmbed});
      }
  })
}

/* Exports */
exports.commands = {
  description: "Unmute un membre.",
  use: "unmute [utilisateur] (raison optionnel)"
}