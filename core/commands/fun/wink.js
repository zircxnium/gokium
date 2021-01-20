const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch');

exports.launch = (client, message, args) => {
  const user = message.mentions.users.first();
  if (!user && args[0] === "random") user = message.guild.members.cache.filter(member => !member.user.bot).random().user;
  if (!user) return message.reply('faut peut-être me mentionner l\'utilisateur, tu penses pas ? :)');

  fetch("https://some-random-api.ml/animu/wink")
  .then(res => res.json())
  .then(body => {
    if(!body) return message.reply("Impossible de get le `body`");

    const embed = new MessageEmbed()
      .setColor(0x2F3136)
      .setDescription(`😉 **${message.author.username}** fait un clin d'oeil à **${user.username}**`)
      .setImage(body.link)
      .setTimestamp()
      .setFooter("gokium", client.user.displayAvatarURL({format: "png" || "gif"}));

    return message.channel.send(embed);
  })
}

exports.commands = {
  description: "Fais un clin d'oeil à quelqu'un.. hihi.",
  use: "wink [utilisateur]"
}