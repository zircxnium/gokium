const { MessageEmbed } = require("discord.js");

/* Export our launch() function */
exports.launch = (client, message, args, lang) => {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return;

  const msg = args.join(" ");
  if (!msg) return message.reply(lang.putamsg);

  const embed = new MessageEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL({ format: 'png' || 'gif', dynamic: true }))
    .setColor(0x2F3136)
    .setDescription(`**${msg}**`)
    .setTimestamp()
    .setFooter("gokium", client.user.displayAvatarURL({format: "png" || "gif"}));
  
  message.channel.send(embed).then(msg => {
    msg.react('👍').then(() => {
      msg.react('👎').then(() => {
        message.delete();
      })
    });
  }); 
}