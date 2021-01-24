const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch');

exports.launch = (client, message, args, lang) => {
  fetch("https://apis.duncte123.me/meme")
  .then(res => res.json())
  .then(body => {
    if(!body) return;

    const embed = new MessageEmbed()
      .setColor(0x2F3136)
      .setAuthor(`${message.author.username}`, message.author.displayAvatarURL({format: "png" || "gif"}))
      .setDescription(`😀 **${message.author.username}**, ${lang.heresameme} !`)
      .setImage(body.data.image)
      .setTimestamp()
      .setFooter("gokium", client.user.displayAvatarURL({format: "png" || "gif"}));
      
    return message.channel.send(embed);
  })
}