const { MessageEmbed } = require("discord.js")
const fetch = require('node-fetch');

exports.launch = (client, message, args, lang) => {
  fetch("https://some-random-api.ml/img/panda")
  .then(res => res.json())
  .then(body => {
    if(!body) return message.reply("Impossible de get le `body`");

    const embed = new MessageEmbed()
      .setColor(0x2F3136)
      .setDescription(`🐼 **${message.author.username}**, voici un panda pour toi !`)
      .setImage(body.link)
      .setTimestamp()
      .setFooter("gokium", client.user.displayAvatarURL({format: "png" || "gif"}));

    return message.channel.send(embed);
  })
}

exports.commands = {
  description: "Envoie des photos de panda.",
  use: "panda"
}