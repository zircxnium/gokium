const { MessageEmbed } = require("discord.js");

exports.launch = (client, message, args, lang) => {
  let user = message.mentions.users.first() || message.author;
  let gay = Math.random() * 100;

  if (!user && args[0] === "random") user = message.guild.members.cache.filter(member => !member.user.bot).random().user;
  if (user.id === "587053234636455946" || user.id === "686244356394451041" || user.id === "841216621066190868") gay = 0.080916978573513;
  
  const gayIndex = Math.floor(gay / 10);
  const gayLevel = "🏳️‍🌈".repeat(gayIndex) + "-".repeat(10 - gayIndex);

  const embed = new MessageEmbed()
    .setColor(0x2F3136)
    .setDescription(`🏳️‍🌈 **${user.username}** ${lang.pourcentage} :`)
    .addField(`🌈 **${Math.floor(gay)}%**`, `\n\n${gayLevel}`)
    .setTimestamp()
    .setFooter("gokium", client.user.displayAvatarURL({format: "png" || "gif"}));

    return message.channel.send(embed);
}