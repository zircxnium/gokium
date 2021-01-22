const db = require('quick.db');

exports.launch = (client, message, args, lang) => {
  if (!message.member.hasPermission('ADMINISTRATOR')) return;
  
  const prefix = args[0];
  if (!prefix) return;

  db.set(`prefix_${message.guild.id}`, prefix);
  return message.delete().then(() => message.reply(lang.newprefix + "**`" + prefix + "`** !").then(msg => msg.delete({ timeout: 3000 })));
}