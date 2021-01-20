const { MessageEmbed } = require("discord.js");

exports.launch = (client, message, args) => {
  const user = message.mentions.users.first();
  const zgeg = Math.random() * 100;
  const zgegIndex = Math.floor(zgeg / 10);
  const zgegLevel = "=".repeat(zgegIndex);
  if (!user && args[1] === "random") user = message.guild.members.cache.filter(member => !member.user.bot).random().user;
  if (!user) user = message.author;

  const embed = new MessageEmbed()
    .setColor("#e30e0e")
    .setDescription(`🍆 **${user.username}** Zgego-machine :)`)
    .addField(`Taille de ton zgegos`, `8=${zgegLevel}D`)
    .setTimestamp()
    .setFooter("Gokium", client.user.displayAvatarURL({format: "png" || "gif"}));

  return message.channel.send(embed);
}

exports.commands = {
  description: "Calcule la taille de votre zgeg.",
  use: "zgeg (utilisateur optionnel)"
}