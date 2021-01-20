const db = require('quick.db');

/* Export our launch() function */
module.exports.launch = async (bot, config, message, args) => {
  if (!message.member.hasPermission('ADMINISTRATOR')) return;
  
  let statsChannelArg = args[1];
  if (!statsChannelArg) return;
  if (statsChannelArg.includes('#')) statsChannelArg = statsChannelArg.replace(/<|#|>/g, '');
  if (!message.guild.channels.cache.has(statsChannelArg)) return message.reply('ce channel n\'existe pas..');
  const statsChannel = message.guild.channels.cache.get(statsChannelArg);
  if (statsChannel.type !== "voice") return message.reply('vous devez spécifier un channel vocal..');
  if (!message.guild.me.hasPermission('MANAGE_CHANNELS' | 'ADMINISTRATOR')) return message.reply('le bot n\'a pas la permission d\'éditer le channel en question.');
  
  statsChannel.setName("Membres : " + message.guild.memberCount).then(() => {
    statsChannel.overwritePermissions([
      {
        id: message.guild.id,
        deny: ['CONNECT'],
      },
    ], 'Updated Members Count').then(() => {
      db.set(`stats_${message.guild.id}`, statsChannelArg);

      message.delete().then(() => {
        return message.reply(`le channel stats à été update !`).then(msg => { msg.delete({ timeout: 3000 })});
      });
    });
  });
}

/* Exports */
exports.commands = {
  description: "Set un channel pour les stats.",
  use: "setstats [channel]"
}