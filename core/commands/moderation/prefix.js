const db = require('quick.db');

exports.launch = (client, message, args) => {
  if (!message.member.hasPermission('ADMINISTRATOR')) return;
  
  const prefix = args[0];
  if (!prefix) return;

  db.set(`prefix_${message.guild.id}`, prefix);
  return message.delete().then(() => message.reply("Le préfix du bot est désormais **`" + prefix + "`** !").then(msg => msg.delete({ timeout: 3000 })));
}

/* Exports */
exports.commands = {
  description: "Set un prefix pour le bot.",
  use: "setprefix [prefix]"
}