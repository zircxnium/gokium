const db = require('quick.db');

/* Export our launch() function */
module.exports.launch = async (bot, config, message, args) => {
  if (!message.member.hasPermission('ADMINISTRATOR')) return;
  
  const prefix = args[1];
  if (!prefix) return;

  db.set(`prefix_${message.guild.id}`, prefix);
  await message.delete().then(() => {
    return message.reply("Le préfix du bot est désormais **`" + prefix + "`** !").then(msg => { msg.delete({ timeout: 3000 })});
  });
}

/* Exports */
exports.commands = {
  description: "Set un prefix pour le bot.",
  use: "setprefix [prefix]"
}