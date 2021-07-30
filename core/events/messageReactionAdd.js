const db = require('quick.db');
const utils = require('../utils');

exports.run = async (client, reaction, user) => {
    if (reaction.partial) {
        try {
            await reaction.fetch();
        } catch (error) {
            console.log('Something went wrong when fetching the message: ', error);
            return;
        }
    }

    if (reaction.message.id === "821200754424807425" && reaction.emoji.name === "✅") {
        const memberRole = reaction.message.guild.roles.cache.find(r => r.id === "821180872501493780");
        if(!memberRole) return;
        reaction.message.guild.members.fetch(user).then(guildmember => guildmember.roles.add("821180872501493780"));
    }
};