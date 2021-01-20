const utils = require('../utils');

exports.run = (client, member) => utils.logs({
    client,
    title: "Quelqu'un à rejoint le serveur 😮",
    message: `🙎‍♂️ **<@${member.id}>** à rejoint le serveur !`,
    guildId: member.guild.id,
    initiator: member
});