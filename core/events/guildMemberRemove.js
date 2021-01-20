const utils = require('../utils');

exports.run = (client, member) => utils.logs({
    client,
    title: "Quelqu'un à quitté le serveur 😮",
    message: `🙎‍♂️ **<@${member.id}>** à quitté le serveur !`,
    guildId: member.guild.id,
    initiator: member
});