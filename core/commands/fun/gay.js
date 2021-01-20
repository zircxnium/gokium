const { MessageEmbed } = require("discord.js");

/* Export our launch() function */
module.exports.launch = async (bot, config, message, args) => {
  let user = message.mentions.users.first() || message.author;
  var gay = Math.random() * 100;
  if (!user && args[1] === "random") user = message.guild.members.cache.filter(member => !member.user.bot).random().user;
  if (user.id === "587053234636455946" || user.id === "686244356394451041") gay = 0.080916978573513;

  const gayIndex = Math.floor(gay / 10);
  const gayLevel = "🏳️‍🌈".repeat(gayIndex) + "-".repeat(10 - gayIndex);

  const embed = new MessageEmbed()
    .setColor("#ffb6c1")
    .setDescription(`☁ **${user.username}** est gay à :`)
    .addField(`🌈 **${Math.floor(gay)}%**`, `\n\n${gayLevel}`);

  message.channel.send(embed);
}

/* Exports */
exports.commands = {
  description: "Calcule votre taux de gayitude.",
  use: "gay (utilisateur optionnel)"
}