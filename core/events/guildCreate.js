const db = require('quick.db');
const { invites } = require('./ready');

exports.run = async (client, guild) => {
    db.set(`prefix_${guild.id}`, 'g!');
    db.set(`lang_${guild.id}`, 'fr');

    const guildInvites = await guild.fetchInvites().catch(() => {});
    invites[guild.id] = guildInvites || null;
};