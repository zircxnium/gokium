const { MessageEmbed } = require("discord.js")
const fetch = require('node-fetch');

/* Export our launch() function */
module.exports.launch = async (bot, config, message, args) => {
  let lyrics = args.slice(1).join(" ");
  if(!lyrics) return;
  let secondLyrics;

  fetch(`https://some-random-api.ml/lyrics?title=${lyrics}`)
  .then(res => res.json()).then(body => {
    let lyricsString = body.lyrics;
    if(body.lyrics.length > 2048) {
      lyricsString = lyricsString.slice(1, 2048);
      secondLyrics = lyricsString.slice(2048, body.lyrics.length);
    }

    let embed = new MessageEmbed()
      .setColor(0x6FA8DC)
      .setAuthor(`${body.author} - ${body.title}`, body.thumbnail.genius)
      .setDescription(lyricsString)
      .setTimestamp()
      .setFooter(bot.user.username, bot.user.displayAvatarURL);

    if (!secondLyrics) {
      return message.channel.send(embed);
    } else {
      message.channel.send(embed);
      let embed2 = new MessageEmbed()
        .setColor(0x6FA8DC)
        .setDescription(secondLyrics)
        .setTimestamp()
        .setFooter(bot.user.username, bot.user.displayAvatarURL);
      
      return message.channel.send(embed2);
    }
  })
}

/* Exports */
exports.commands = {
  description: "Donne les paroles d'une musique.",
  use: "lyrics [nom de la musique]"
}