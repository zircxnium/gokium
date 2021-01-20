const Discord = require('discord.js');

/* Export our launch() function */
module.exports.launch = async (bot, config, message, args) => {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return;

  const argsssss = args.slice(1).join(" ");
  if(!argsssss) return message.reply('Faut spécifier un message, tu penses pas :) ?');

  const embed = new Discord.MessageEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL({ format: 'png' || 'gif', dynamic: true }))
    .setColor(0x2F3136)
    .setTitle('SONDAGE')
    .setDescription(argsssss)
    .setTimestamp()
    .setFooter("Gokium", bot.user.displayAvatarURL({ format: 'png' || 'gif', dynamic: true }));
  
  await message.channel.send(embed).then(async msg => {
    await msg.react('👍').then(async () => {
      await msg.react('👎').then(async () =>{
        return message.delete();
      });
    });
  });
}

/* Exports */
exports.commands = {
  description: "Lancer un sondage.",
  use: "sondage [message]"
}