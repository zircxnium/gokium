const { MessageEmbed } = require("discord.js");

exports.launch = (client, message, args, lang) => {
  const time = (new Date()).getTime() - 1;
  const embed = new MessageEmbed()
    .setColor(0x2F3136)
    .setTitle('🏓 Pong')
    .setDescription(`${lang.apiLatency}: **${Math.round(client.ws.ping)}ms**\n${lang.botLatency}: **${(new Date()).getTime() - time}ms**`)
    .setTimestamp()
    .setFooter("gokium", client.user.displayAvatarURL({format: "png" || "gif"}));

  return message.channel.send(embed);
}