const db = require('quick.db');
const utils = require('../utils');

exports.run = (client, oldMessage, newMessage) => {
    if (oldMessage.content == newMessage.content || !oldMessage.author || oldMessage.author.bot) return;
    
    db.set(`snipes_edited_${newMessage.channel.id}`, {
        username: newMessage.author.username,
        avatarURL: newMessage.author.displayAvatarURL({ format: 'png' || 'gif', dynamic: true }),
        message: oldMessage.content,
        newMessage: newMessage.content
    });

    utils.logs({
        client,
        title: `✏️ Un message de **<@${newMessage.author.id}>** à été édité dans **<#${newMessage.channel.id}>**`,
        message: oldMessage,
        newMessage,
        guildId: newMessage.guild.id,
        initiator: newMessage.author
    });
};