const { MessageEmbed } = require("discord.js")
const fetch = require('node-fetch');

exports.launch = (client, message, args, lang) => {
  let user = message.mentions.users.first();

  if (!user && args[0] === "random") user = message.guild.members.cache.filter(member => !member.user.bot).random().user;
  if (!user) return message.reply(lang.mentionsomeone);

  fetch("https://nekos.life/api/v2/img/kiss")
  .then(res => res.json())
  .then(body => {
    if(!body) return;
    
    const embed = new MessageEmbed()
      .setColor(0x2F3136)
      .setDescription(`😘 **${message.author.username}** ${lang.kissing} **${user.username}**`)
      .setImage(body.url)
      .setTimestamp()
      .setFooter("gokium", client.user.displayAvatarURL({format: "png" || "gif"}));

    return message.channel.send(embed);
  })
}