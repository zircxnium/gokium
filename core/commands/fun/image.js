const { MessageEmbed } = require("discord.js")
const fetch = require('node-fetch');

exports.launch = (client, message, args, lang) => {
  fetch("https://picsum.photos/v2/list?page=1&limit=100")
  .then(res => res.json())
  .then(body => {
    if(!body) return message.reply("Impossible de get le `body`");

    const result = Math.floor(Math.random() * 100);
    const embed = new MessageEmbed()
      .setColor(0x2F3136)
      .setDescription(`🌆 **${message.author.username}**, voici une image pour toi !`)
      .setImage(body[result].download_url)
      .setTimestamp()
      .setFooter("gokium", client.user.displayAvatarURL({format: "png" || "gif"}));

    return message.channel.send(embed);
  })
}

exports.commands = {
  description: "Envoie une image d'un paysage.",
  use: "paysage"
}