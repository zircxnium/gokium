const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch');

exports.launch = (client, message, args, lang) => {
  fetch("https://www.reddit.com/r/memes/random/.json")
  .then(res => res.json())
  .then(response => {
    console.log(response);
    const [list] = response;
    const [post] = list.data.children;

    const permalink = post.data.permalink;
    const memeUrl = `https://reddit.com${permalink}`;
    const memeImage = post.data.url;
    const memeTitle = post.data.title;

    const embed = new MessageEmbed()
      .setTitle(memeTitle)
      .setURL(memeUrl)
      .setImage(memeImage)
      .setColor(0x2F3136)
      .setTimestamp()
      .setFooter("gokium", client.user.displayAvatarURL({format: "png" || "gif"}));
      
    return message.channel.send(embed);
  })
}