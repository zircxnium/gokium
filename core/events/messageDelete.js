const db = require('quick.db');
const utils = require('../utils');

exports.run = (client, message) => {
    if (!message.author || message.author.bot || !message.content) return;
    
    db.set(`snipes_deleted_${message.channel.id}`, {
        username: message.author.username,
        avatarURL: message.author.displayAvatarURL({ format: 'png' || 'gif', dynamic: true }),
        message: message.content
    });
    
    utils.logs({
        client,
        title: `🗑️ Un message de **<@${message.author.id}>** à été supprimé dans **<#${message.channel.id}>**`,
        message: message.content,
        guildId: message.guild.id,
        initiator: message.author
    });
};