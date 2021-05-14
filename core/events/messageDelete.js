const db = require('quick.db');
const utils = require('../utils');

exports.run = async (client, message) => {
  if (!message.author || message.author.bot || !message.content) return;
  db.set(`snipes_deleted_${message.channel.id}`, {
    username: message.author.username,
    avatarURL: message.author.displayAvatarURL({
      format: "png" || "gif",
      dynamic: true,
    }),
    message: message.content,
  });

  let executor;
  if (message.guild.me.hasPermission("ADMINISTRATOR") || message.guild.me.hasPermission("VIEW_AUDIT_LOG")) {
    const entry = await message.guild.fetchAuditLogs({type: 'MESSAGE_DELETE'}).then(audit => audit.entries.first())
    if (entry.extra.channel.id === message.channel.id
    && (entry.target.id === message.author.id)
    && (entry.createdTimestamp > (Date.now() - 5000))
    && (entry.extra.count >= 1)) executor = `<@${entry.executor.id}>`;
    else executor = `<@${message.author.id}>`;
  }

  utils.logs({
    client,
    title: `🗑️ Un message de **<@${message.author.id}>** à été supprimé dans **<#${message.channel.id}>**`,
    message: message.content,
    deletedBy: executor,
    guildId: message.guild.id,
    initiator: message.author,
  });
};