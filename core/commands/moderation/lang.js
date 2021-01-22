const db = require('quick.db');
const utils = require('../../utils');

exports.launch = (client, message, args, lang) => {
  if (!message.member.hasPermission('MANAGE_CHANNELS')) return;
  
  const language = utils.langs.find(lang => lang === args[0].toLowerCase());
  if (!language) return;

  db.set(`lang_${message.guild.id}`, language);
  return message.delete().then(() => message.reply(`${lang.hasbeenset} **${language}** !`).then(msg => { msg.delete({ timeout: 3000 })}));
}