const { MessageEmbed } = require("discord.js")
const fetch = require('node-fetch');

/* Export our launch() function */
module.exports.launch = async (bot, config, message, args) => {
  let user = message.mentions.users.first();
  if (!user && args[1] === "random") user = message.guild.members.cache.filter(member => !member.user.bot).random().user;
  if (!user) return message.reply('faut peut-être me mentionner l\'utilisateur, tu penses pas ? :)');

  fetch("https://some-random-api.ml/animu/pat")
  .then(res => res.json()).then(body => {
    if(!body) return message.reply("whoops. ya eu un prob!")

    let embed = new MessageEmbed()
      .setColor(0x6FA8DC)
      .setDescription(`🐾 **${message.author.username}** caresse **${user.username}**`)
      .setImage(body.link)
      .setTimestamp()
      .setFooter(bot.user.username, bot.user.displayAvatarURL({format: "png" || "gif"}));

    return message.channel.send(embed);
  })
}

/* Exports */
exports.commands = {
  description: "Caresse quelqu'un.. miaoouh.",
  use: "pat [utilisateur]"
}