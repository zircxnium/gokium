const Discord = require('discord.js');

/* Export our launch() function */
module.exports.launch = async (bot, config, message, args) => {
  if (!message.member.hasPermission('KICK_MEMBERS')) return;

  const member = message.mentions.members.first();
  if (!member) return;
  if (!member.kickable) return message.reply('Tu ne peux pas kick ce membre.');

  const argsssss = message.content.split(' ').slice(1);
  const reason = argsssss.slice(1).join(' ') || "Aucune raison spécifiée";

  member.kick(reason).then(async () => {
    const theEmbed = new Discord.MessageEmbed()
      .setColor(0x2F3136)
      .setAuthor(`${member.user.tag} à été kick`, member.user.displayAvatarURL({ format: 'png' || 'gif', dynamic: true }))
      .setDescription(`**Raison:** ${reason}`)
      .setTimestamp()
      .setFooter("Gokium", bot.user.displayAvatarURL({ format: 'png' || 'gif', dynamic: true }));

    if(!member.user.bot) member.user.send(`T'as été kick de **${message.guild.name}** par **${message.author.tag}** !\n**Raison:** ${reason}`);
    await message.channel.send(theEmbed).then(() => {
      message.delete();
    });
  }).catch(err => console.error(err));
}

/* Exports */
exports.commands = {
  description: "Kick un membre.",
  use: "kick [utilisateur] (raison optionnel)"
}