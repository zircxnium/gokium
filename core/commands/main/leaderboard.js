const { MessageEmbed } = require("discord.js");
const db = require('quick.db');

// to refactor
exports.launch = async (client, message, args, lang) => {
  let content = "";
  if (!args[0] || (args[0] !== 'levels' && args[0] !== 'messages')) return message.reply(lang.replyMsg);
 
  if (args[0] == 'levels') {
    const level = db.all().filter(a => a.ID.startsWith(`level_${message.guild.id}`)).sort((a, b) => (a.data < b.data) ? 1 : -1).splice(0, 10);

    for (let i = 0; i < level.length; i++) {
      await client.users.fetch(level[i].ID.split('_')[2]).then(usr => {
        content += `**${i+1}.** ${usr.username} - ${lang.level}: ${level[i].data}\n`;
      });
    }
  } else if(args[0] == 'messages') {
    const messages = db.all().filter(a => a.ID.startsWith(`messages_count_${message.guild.id}`)).sort((a, b) => (a.data < b.data) ? 1 : -1).splice(0, 10);

    for (let i = 0; i < messages.length; i++) {
      await client.users.fetch(messages[i].ID.split('_')[3]).then(usr => {
        content += `**${i+1}.** ${usr.username} - Message(s): ${messages[i].data}\n`
      });
    }
  }

  const embed = new MessageEmbed()
    .setColor(0x2F3136)
    .setTitle(`${lang.title} **${message.guild.name}**`)
    .setDescription(content)
    .setTimestamp()
    .setFooter("gokium", client.user.displayAvatarURL({format: "png" || "gif"}));

  return message.channel.send(embed);
}