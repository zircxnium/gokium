const { MessageEmbed } = require("discord.js")
const fetch = require('node-fetch');

/* Export our launch() function */
module.exports.launch = async (bot, config, message, args) => {
  fetch("https://some-random-api.ml/img/dog")
  .then(res => res.json()).then(body => {
    if(!body) return message.reply("whoops. ya eu un prob!");

    let embed = new MessageEmbed()
      .setColor(0x6FA8DC)
      .setAuthor(`${message.author.username}`, message.author.displayAvatarURL({format: "png" || "gif"}))
      .setImage(body.link)
      .setTimestamp()
      .setFooter(bot.user.username, bot.user.displayAvatarURL({format: "png" || "gif"}));

      return message.channel.send(embed);
  })
}

/* Exports */
exports.commands = {
  description: "Envoie des photos de chien.",
  use: "dog"
}