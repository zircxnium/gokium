const utils = require('../utils');
const { invites } = require('./ready');

exports.run = async (client, member) => {
    if (member.guild.me.hasPermission("ADMINISTRATOR") || member.guild.me.hasPermission("VIEW_AUDIT_LOG")) {
        let invite = null;
        let vanity = false;
        
        // Fetch the current invites of the guild
        const guildInvites = await member.guild.fetchInvites().catch(() => {});
        // Fetch the invites of the guild BEFORE that the member has joined
        const oldGuildInvites = invites[member.guild.id];
            
        if (guildInvites && oldGuildInvites) {
            // Update the cache
            invites[member.guild.id] = guildInvites;
            // Find the invitations which doesn't have the same number of use
            let inviteUsed = guildInvites.find((i) => oldGuildInvites.get(i.code) && ((Object.prototype.hasOwnProperty.call(oldGuildInvites.get(i.code), "uses") ? oldGuildInvites.get(i.code).uses : "Infinite") < i.uses));
            if ((utils.isEqual(oldGuildInvites.map((i) => `${i.code}|${i.uses}` ).sort(), guildInvites.map((i) => `${i.code}|${i.uses}` ).sort())) && !inviteUsed && member.guild.features.includes("VANITY_URL")){
                vanity = true;
            } else if (!inviteUsed){
                const newAndUsed = guildInvites.filter((i) => !oldGuildInvites.get(i.code) && i.uses === 1);
                if (newAndUsed.size === 1){
                    inviteUsed = newAndUsed.first();
                }
            }
            if (inviteUsed && !vanity) invite = inviteUsed;
        } else if (guildInvites && !oldGuildInvites) {
            invites[member.guild.id] = guildInvites;
        }
        
        if (!invite && guildInvites) {
            const targetInvite = guildInvites.some((i) => i.targetUser && (i.targetUser.id === member.id));
            if (targetInvite.uses === 1) {
                invite = targetInvite;
            }
        }

        const inviter = invite && invite.inviter && client.users.cache.get(invite.inviter.id).id;

        // if invite == null, most likely cause it's a custom invite.
        if (vanity) {
            // Fetch invite data
            await member.guild.fetchVanityData()
            .then(res => invite = res);
        }

        utils.logs({
            client,
            title: "Quelqu'un à rejoint le serveur 😮",
            message: `🙎‍♂️ **<@${member.id}>** à rejoint le serveur avec l'invite https://discord.gg/${(invite.code)} ${inviter && `de <@${inviter}>` || ""}\nInvitation utilisée **${invite.uses}x** depuis sa création`,
            guildId: member.guild.id,
            initiator: member
        });
    }
}