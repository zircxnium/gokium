const utils = require('../utils');
const { invites } = require('./ready');

exports.run = async (client, invite) => {
    if (invite.guild.me.hasPermission("ADMINISTRATOR") || invite.guild.me.hasPermission("VIEW_AUDIT_LOG")) {
        if (!invites[invite.guild.id]) return;
        delete invites[invite.guild.id][inviteode];

        // logs ?
    }
}