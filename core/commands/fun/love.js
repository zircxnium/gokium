const { MessageEmbed } = require("discord.js");

exports.launch = (client, message, args, lang) => {
  let user = message.mentions.users.first();
  const love = Math.random() * 100;
  const loveIndex = Math.floor(love / 10);
  const loveLevel = "💖".repeat(loveIndex) + "💔".repeat(10 - loveIndex);

  if (!user && args[0] === "random") user = message.guild.members.cache.filter(member => !member.user.bot).random().user; 
  if (!user) return message.reply(lang.mentionsomeone);

  const embed = new MessageEmbed()
    .setColor(0x2F3136)
    .setDescription(`💟 **${message.author.username}** ${lang.pourcentage} **${user.username}** ${lang.pourcentage2} :`)
    .addField(`💞 **${Math.floor(love)}%**`, `\n\n${loveLevel}`)
    .setTimestamp()
    .setFooter("gokium", client.user.displayAvatarURL({format: "png" || "gif"}));

  return message.channel.send(embed);
}