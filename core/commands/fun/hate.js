const { MessageEmbed } = require("discord.js");

/* Export our launch() function */
module.exports.launch = async (bot, config, message, args) => {
  let user = message.mentions.users.first();
  var love = Math.random() * 100;
  if (!user && args[1] === "random") user = message.guild.members.cache.filter(member => !member.user.bot).random().user; 
  if (!user) return message.reply('faut peut-être me mentionner l\'utilisateur, tu penses pas ? :)');

  const loveIndex = Math.floor(love / 10);
  const loveLevel = "💀".repeat(loveIndex) + "-".repeat(10 - loveIndex);

  const embed = new MessageEmbed()
    .setColor("#ffb6c1")
    .setDescription(`☁ **${message.author.username}** déteste **${user.username}**`)
    .addField(`☠️ **${Math.floor(love)}%**`, `\n\n${loveLevel}`);

  message.channel.send(embed);
}

/* Exports */
exports.commands = {
  description: "Calcule le taux de haine avec la personne mentionné.",
  use: "hate [utilisateur]"
}