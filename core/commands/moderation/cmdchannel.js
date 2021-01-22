const db = require('quick.db');

exports.launch = (client, message, args, lang) => {
  if (!message.member.hasPermission('MANAGE_CHANNELS')) return;
  
  const commandChannel = args[0].replace(/<|#|>/g, '');
  if (!commandChannel) {
    if (db.get(`commandchannel_${message.guild.id}`)) {
      message.delete().then(() => {
        db.delete(`commandchannel_${message.guild.id}`);
        message.reply(lang.deactivated).then(msg => msg.delete({ timeout: 3000 }));
      });
    }

    return;
  }

  if (!message.guild.channels.cache.has(commandChannel)) return message.reply(lang.channeldoesntexist);

  db.set(`commandchannel_${message.guild.id}`, commandChannel);
  return message.delete().then(() => message.reply(`${lang.activated} **<#${commandChannel}>** !`).then(msg => { msg.delete({ timeout: 3000 })}));
}