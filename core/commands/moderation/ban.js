const Discord = require('discord.js');

/* Export our launch() function */
module.exports.launch = async (bot, config, message, args) => {
  if (!message.member.hasPermission('BAN_MEMBERS')) return;
  
  const member = message.mentions.members.first();
  if (!member) return;
  if (!member.bannable) return message.reply('Tu ne peux pas ban ce membre.');

  const argsssss = message.content.split(' ').slice(1);
  const reason = argsssss.slice(1).join(' ') || "Aucune raison spécifiée";
      
  message.guild.members.ban(user.id, {reason: reason}).then(async () => {
    const theEmbed = new Discord.MessageEmbed()
      .setColor(0x6FA8DC)
      .setAuthor(`${member.user.tag} à été ban`, member.user.displayAvatarURL({ format: 'png' || 'gif', dynamic: true }))
      .setDescription(`**Raison:** ${reason}`)
      .setTimestamp()
      .setFooter("Gokium", bot.user.displayAvatarURL({ format: 'png' || 'gif', dynamic: true }));

    if (!member.user.bot) user.send(`T'as été ban de **${message.guild.name}** par **${message.author.tag}** !\n**Raison:** ${reason}`);
    await message.channel.send(theEmbed).then(() => {
      message.delete();
    });
  }).catch(err => console.error(err));
}

/* Exports */
exports.commands = {
  description: "Bannir un membre.",
  use: "ban [utilisateur] (raison optionnel)"
}