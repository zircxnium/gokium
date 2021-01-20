const { MessageEmbed } = require("discord.js")
const fetch = require('node-fetch');

exports.launch = (client, message, args) => {
  fetch("https://picsum.photos/v2/list?page=1&limit=100")
  .then(res => res.json())
  .then(body => {
    if(!body) return message.reply("Impossible de get le `body`");

    const result = Math.floor(Math.random() * 100);
    const embed = new MessageEmbed()
      .setColor(0x2F3136)
      .setAuthor(`${message.author.username}`, message.author.displayAvatarURL({format: "png" || "gif"}))
      .setImage(body[result].download_url)
      .setTimestamp()
      .setFooter("Gokium", client.user.displayAvatarURL({format: "png" || "gif"}));

    return message.channel.send(embed);
  })
}

exports.commands = {
  description: "Envoie une image d'un paysage.",
  use: "paysage"
}