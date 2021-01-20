const db = require('quick.db');

/* Export our launch() function */
module.exports.launch = async (bot, config, message, args) => {
  if (!message.member.hasPermission('ADMINISTRATOR')) return;
  
  const logsChannel = args[1];
  if (!logsChannel) {
    if (db.get(`logs_${message.guild.id}`)) {
      message.delete().then(() => {
        db.delete(`logs_${message.guild.id}`);
        return message.reply(`les logs ont été désactivés avec succès !`).then(msg => { msg.delete({ timeout: 3000 })});
      });
    }
    return
  }
  if (logsChannel.includes('#')) logsChannel = logsChannel.replace(/<|#|>/g, '');
  if (!message.guild.channels.cache.has(logsChannel)) return message.reply('ce channel n\'existe pas..');

  db.set(`logs_${message.guild.id}`, logsChannel);
  await message.delete().then(() => {
    return message.reply(`le channel logs à été set sur <#${logsChannel}> !`).then(msg => { msg.delete({ timeout: 3000 })});
  });
}

/* Exports */
exports.commands = {
  description: "Set un channel pour les logs.",
  use: "setlogs [channel]"
}