const { MessageEmbed } = require("discord.js");
const db = require('quick.db');

exports.defaultPrefix = "gokium";

exports.commandsFolder = `${__dirname}/../commands`;

exports.commandsCategories = ['main', 'fun', 'moderation'];

exports.langs = ["fr", "en"];

exports.formatString = str => str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

exports.capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

exports.getCommands = (guildId) => {
  this.commandsCategories.forEach(category => {
    const getLang = db.get(`lang_${guildId}`);
    if (!getLang) return;
    const commandsLocale = require(`../locales/${getLang}.json`)["commands"][category];
    if (!commandsLocale) return;
    
    return commandsLocale;
  });
}

exports.checkDays = date => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / 86400000);

  return days + (days > 1 ? " jours" : " jour");
}

exports.isEqual = (value, other) => {
  const type = Object.prototype.toString.call(value);
  if (type !== Object.prototype.toString.call(other)) return false;
  if (["[object Array]", "[object Object]"].indexOf(type) < 0) return false;
  const valueLen = type === "[object Array]" ? value.length : Object.keys(value).length;
  const otherLen = type === "[object Array]" ? other.length : Object.keys(other).length;
  if (valueLen !== otherLen) return false;
  const compare = (item1, item2) => {
    const itemType = Object.prototype.toString.call(item1);
    if (["[object Array]", "[object Object]"].indexOf(itemType) >= 0) {
      if (!isEqual(item1, item2)) return false;
    }
    else {
      if (itemType !== Object.prototype.toString.call(item2)) return false;
      if (itemType === "[object Function]") {
        if (item1.toString() !== item2.toString()) return false;
      } else {
        if (item1 !== item2) return false;
      }
    }
  };
  if (type === "[object Array]") {
    for (var i = 0; i < valueLen; i++) {
        if (compare(value[i], other[i]) === false) return false;
    }
  } else {
    for (var key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        if (compare(value[key], other[key]) === false) return false;
      }
    }
  }
  return true;
};

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
  if (data.deletedBy) embed.addField("**Supprimé par**", data.deletedBy, false);
  if (data.bannedBy) embed.addField("**Banni par**", data.bannedBy, true);
  if (data.unbannedBy) embed.addField("**Unban par**", data.unbannedBy, true);
  data.client.channels.cache.get(logsChannel).send(embed);
}