const { MessageEmbed } = require("discord.js")
const fetch = require('node-fetch');

exports.launch = (client, message, args) => {
  const user = message.mentions.users.first();
  if (!user && args[1] === "random") user = message.guild.members.cache.filter(member => !member.user.bot).random().user;
  if (!user) return message.reply('faut peut-être me mentionner l\'utilisateur, tu penses pas ? :)');

  fetch("https://some-random-api.ml/animu/pat")
  .then(res => res.json())
  .then(body => {
    if(!body) return message.reply("Impossible de get le `body`");

    const embed = new MessageEmbed()
      .setColor(0x2F3136)
      .setDescription(`🐾 **${message.author.username}** caresse **${user.username}**`)
      .setImage(body.link)
      .setTimestamp()
      .setFooter("Gokium", client.user.displayAvatarURL({format: "png" || "gif"}));

    return message.channel.send(embed);
  })
}

exports.commands = {
  description: "Caresse quelqu'un.. miaoouh.",
  use: "pat [utilisateur]"
}