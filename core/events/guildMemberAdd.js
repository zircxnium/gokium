const utils = require('../utils');
const { invites } = require('./ready');

exports.run = (client, member) => {
    if (member.guild.me.hasPermission("ADMINISTRATOR") || member.guild.me.hasPermission("VIEW_AUDIT_LOG")) {
        member.guild.fetchInvites().then(guildInvites => {
            // This is the *existing* invites for the guild.
            const ei = invites[member.guild.id];
            // Update the cached invites for the guild.
            invites[member.guild.id] = guildInvites;
            // Look through the invites, find the one for which the uses went up.
            const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
            // This is just to simplify the message being sent below (inviter doesn't have a tag property)
            const inviter = client.users.cache.get(invite.inviter.id);

            utils.logs({
                client,
                title: "Quelqu'un à rejoint le serveur 😮",
                message: `🙎‍♂️ **<@${member.id}>** à rejoint le serveur avec l'invite https://discord.gg/${invite.code} de <@${inviter.id}>\nInvitation utilisée **${invite.uses}x** depuis sa création`,
                guildId: member.guild.id,
                initiator: member
            });
        });
    }
}