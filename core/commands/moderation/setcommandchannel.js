const db = require('quick.db');

/* Export our launch() function */
module.exports.launch = async (bot, config, message, args) => {
  if (!message.member.hasPermission('ADMINISTRATOR')) return;
  
  const commandChannel = args[1];
  if (!commandChannel) {
    if (db.get(`commandchannel_${message.guild.id}`)) {
      message.delete().then(() => {
        db.delete(`commandchannel_${message.guild.id}`);
        return message.reply(`le CommandChannel-Only à été désactivé avec succès !`).then(msg => { msg.delete({ timeout: 3000 })});
      });
    }
    return
  }

  if (commandChannel.includes('#')) commandChannel = commandChannel.replace(/<|#|>/g, '');
  if (!message.guild.channels.cache.has(commandChannel)) return message.reply('ce channel n\'existe pas..');

  db.set(`commandchannel_${message.guild.id}`, commandChannel);
  await message.delete().then(() => {
    return message.reply(`le channel CommandChannel-Only à été set sur <#${commandChannel}> !`).then(msg => { msg.delete({ timeout: 3000 })});
  });
}

/* Exports */
exports.commands = {
  description: "Set un channel pour executer les commandes. ATTENTION, vous ne pourrez utiliser les commandes du bot que dans ce channel !",
  use: "setcommandchannel [channel]"
}