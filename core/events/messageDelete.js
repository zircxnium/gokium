const Discord = require('discord.js');
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

  // https://stackoverflow.com/a/62936212
  // Add latency as audit logs aren't instantly updated, adding a higher latency will result in slower logs, but higher accuracy.
  await Discord.Util.delayFor(900);

  // Fetch a couple audit logs than just one as new entries could've been added right after this event was emitted.
  const fetchedLogs = await message.guild
    .fetchAuditLogs({
      limit: 6,
      type: "MESSAGE_DELETE",
    })
    .catch(() => ({
      entries: [],
    }));

  const auditEntry = fetchedLogs.entries.find(
    (a) =>
      // Small filter function to make use of the little discord provides to narrow down the correct audit entry.
      a.target.id === message.author.id &&
      a.extra.channel.id === message.channel.id &&
      // Ignore entries that are older than 20 seconds to reduce false positives.
      Date.now() - a.createdTimestamp < 20000
  );

  // If entry exists, grab the user that deleted the message and display username + tag, if none, display 'Unknown'.
  const executor = auditEntry ? `<@${auditEntry.executor.id}>` : "Inconnu";

  utils.logs({
    client,
    title: `🗑️ Un message de **<@${message.author.id}>** à été supprimé dans **<#${message.channel.id}>**`,
    message: message.content,
    deletedBy: executor,
    guildId: message.guild.id,
    initiator: message.author,
  });
};