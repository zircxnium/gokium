const Discord = require('discord.js');

/* Export our launch() function */
module.exports.launch = async (bot, config, message, args) => {
  if (!message.member.hasPermission('BAN_MEMBERS')) return;
  
  let User = args[1];
  if (!User) return;

  const argsssss = message.content.split(' ').slice(1);
  const reason = argsssss.slice(1).join(' ') || "Aucune raison spécifiée";

  message.guild.fetchBans().then(bans => {
    if (bans.some(u => User.includes(u.user.id))) {
      const data = bans.find(u => User.includes(u.user.id));
      const theEmbed = new Discord.MessageEmbed()
        .setColor(0x6FA8DC)
        .setAuthor(`${data.user.tag} à été unban`, data.user.displayAvatarURL({ format: 'png' || 'gif', dynamic: true }))
        .setDescription(`**Raison:** ${reason}`)
        .setTimestamp()
        .setFooter("Gokium", bot.user.displayAvatarURL({ format: 'png' || 'gif', dynamic: true }));
  
      message.guild.members.unban(data.user.id, reason).then(() => {
        message.delete();
        message.channel.send(theEmbed);
      });
    }
  });
}

/* Exports */
exports.commands = {
  description: "Unban un membre.",
  use: "unban [utilisateur] (raison optionnel)"
}