const { MessageEmbed } = require("discord.js");
const db = require('quick.db');

exports.defaultPrefix = "gokium";

exports.commandsFolder = `${__dirname}/../commands`;

exports.commandsCategories = ['main', 'fun', 'moderation'];

exports.langs = ["fr", "en"];

exports.formatString = str => str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

exports.capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);


exports.getCommands = (guildId) => {
  exports.commandsCategories.forEach(category => {
    const getLang = db.get(`lang_${guildId}`);
    if (!getLang) return;
    const commandsLocale = require(`../locales/${getLang}.json`)["commands"][category];
    if (!commandsLocale) return;
    console.log(commandsLocale);
    return commandsLocale;
  });

  return;
}

exports.checkDays = date => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / 86400000);

  return days + (days > 1 ? " jours" : " jour");
}

exports.logs = (data) => {
  const logsChannel = db.get(`logs_${data.guildId}`);
  if (!logsChannel) return;

  const embed = new MessageEmbed()
    .setColor(0x2F3136)
    .setAuthor(data.initiator.username ? data.initiator.username : data.initiator.displayName, data.initiator.avatarURL ? data.initiator.displayAvatarURL({ format: 'png' || 'gif', dynamic: true }) : data.initiator.user.displayAvatarURL({ format: 'png' || 'gif', dynamic: true }))
    .setDescription(data.title)
    .addField(`**${data.newMessage ? "Ancien " : ""}Message**`, data.message, true)
    .setTimestamp()
    .setFooter(`ID: ${data.initiator.id}`, data.client.user.displayAvatarURL({ format: 'png' || 'gif', dynamic: true }));

  if (data.newMessage) embed.addField("**Nouveau Message**", data.newMessage, true);
  data.client.channels.cache.get(logsChannel).send(embed);
}