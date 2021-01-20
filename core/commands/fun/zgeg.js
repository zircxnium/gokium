const { MessageEmbed } = require("discord.js");

/* Export our launch() function */
module.exports.launch = async (bot, config, message, args) => {
  let user = message.mentions.users.first();
  var love = Math.random() * 100;
  if (!user && args[1] === "random") user = message.guild.members.cache.filter(member => !member.user.bot).random().user;
  if (!user) user = message.author;

  const loveIndex = Math.floor(love / 10);
  const loveLevel = "=".repeat(loveIndex);

  const embed = new MessageEmbed()
    .setColor("#e30e0e")
    .setDescription(`🍆 **${user.username}** Zgeg Machine :)`)
    .addField(`Taille de ton zgegos`, `8=${loveLevel}D`)
    .setTimestamp()
    .setFooter(bot.user.username, bot.user.displayAvatarURL({format: "png" || "gif"}));

  message.channel.send(embed);
}

/* Exports */
exports.commands = {
  description: "Calcule la taille de votre zgeg.",
  use: "zgeg (utilisateur optionnel)"
}