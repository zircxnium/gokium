const { MessageEmbed } = require("discord.js")
const fetch = require('node-fetch');

exports.launch = (client, message, args) => {
  fetch("https://some-random-api.ml/img/dog")
  .then(res => res.json())
  .then(body => {
    if(!body) return message.reply("Impossible de get le `body`");

    const embed = new MessageEmbed()
      .setColor(0x2F3136)
      .setDescription(`🐶 ${message.author.username}, voici un p'tit chien pour toi !`)
      .setImage(body.link)
      .setTimestamp()
      .setFooter("Gokium", client.user.displayAvatarURL({format: "png" || "gif"}));

    return message.channel.send(embed);
  })
}

exports.commands = {
  description: "Envoie des photos de chien.",
  use: "dog"
}