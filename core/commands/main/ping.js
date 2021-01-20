const { MessageEmbed } = require("discord.js");

exports.launch = (client, message, args) => {
  const time = (new Date()).getTime() - 1;
  const embed = new MessageEmbed()
    .setColor(0x2F3136)
    .setTitle('🏓 Pong')
    .setDescription(`API Latency: **${Math.round(client.ws.ping)}ms**\nBot Latency: **${(new Date()).getTime() - time}ms**`)
    .setImage(body.link)
    .setTimestamp()
    .setFooter("gokium", client.user.displayAvatarURL({format: "png" || "gif"}));


  return message.channel.send(embed);
}

exports.commands = {
  description: "Renvoie les latences du bot (API&Client).",
  use: "ping"
}