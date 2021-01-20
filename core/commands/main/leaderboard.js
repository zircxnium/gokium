const Discord = require('discord.js');
const db = require('quick.db');

exports.launch = (client, message, args) => {
  let content = "";
  if (!args[1] || (args[1] !== 'levels' && args[1] !== 'messages')) return message.reply('utilise bien la commande : `gokium leaderboard levels` ou `gokium leaderboard messages`')
 
  if (args[1] == 'levels') {
    const level = db.all().filter(a => a.ID.startsWith(`level_${message.guild.id}`)).sort((a, b) => (a.data < b.data) ? 1 : -1).splice(0, 10);

    for (let i = 0; i < level.length; i++) {
      await bot.users.fetch(level[i].ID.split('_')[2]).then(usr => {
        content += `**${i+1}.** ${usr.username} - Level: ${level[i].data}\n`;
      });
    }
  } else if(args[1] == 'messages') {
    const messages = db.all().filter(a => a.ID.startsWith(`messages_count_${message.guild.id}`)).sort((a, b) => (a.data < b.data) ? 1 : -1).splice(0, 10);

    for (let i = 0; i < messages.length; i++) {
      await bot.users.fetch(messages[i].ID.split('_')[3]).then(usr => {
        content += `**${i+1}.** ${usr.username} - Message(s): ${messages[i].data}\n`
      });
    }
  }

  const embed = new Discord.MessageEmbed()
    .setColor("#e30e0e")
    .setTitle(`Leaderboard de **${message.guild.name}**`)
    .setDescription(content)
    .setTimestamp()
    .setFooter("Gokium", client.user.displayAvatarURL({format: "png" || "gif"}));

  return message.channel.send(embed);
}

exports.commands = {
  description: "Voir le top 10 du serveur.",
  use: "leaderboard [levels ou messages]"
}