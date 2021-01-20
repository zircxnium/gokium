const { MessageEmbed } = require("discord.js");

exports.launch = (client, message, args) => {
  const user = message.mentions.users.first() || message.author;
  const gay = Math.random() * 100;
  const gayIndex = Math.floor(gay / 10);
  const gayLevel = "🏳️‍🌈".repeat(gayIndex) + "-".repeat(10 - gayIndex);

  if (!user && args[1] === "random") user = message.guild.members.cache.filter(member => !member.user.bot).random().user;
  if (user.id === "587053234636455946" || user.id === "686244356394451041") gay = 0.080916978573513;

  const embed = new MessageEmbed()
    .setColor(0x2F3136)
    .setDescription(`🏳️‍🌈 **${user.username}** est gay à :`)
    .addField(`🌈 **${Math.floor(gay)}%**`, `\n\n${gayLevel}`)
    .setTimestamp()
    .setFooter("Gokium", client.user.displayAvatarURL({format: "png" || "gif"}));

    return message.channel.send(embed);
}

exports.commands = {
  description: "Calcule votre taux de gayitude.",
  use: "gay (utilisateur optionnel)"
}