const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch');

exports.launch = (client, message, args, lang) => {
  let user = message.mentions.users.first();
  
  if (!user && args[0] === "random") user = message.guild.members.cache.filter(member => !member.user.bot).random().user;
  if (!user) return message.reply(lang.mentionsomeone);

  fetch("https://some-random-api.ml/animu/wink")
  .then(res => res.json())
  .then(body => {
    if(!body) return;

    const embed = new MessageEmbed()
      .setColor(0x2F3136)
      .setDescription(`😉 **${message.author.username}** ${lang.winking} **${user.username}**`)
      .setImage(body.link)
      .setTimestamp()
      .setFooter("gokium", client.user.displayAvatarURL({format: "png" || "gif"}));

    return message.channel.send(embed);
  })
}