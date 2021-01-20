const utils = require('../utils');

exports.run = (client, guild, user) => utils.logs({
    client,
    title: "Quelqu'un à été ban du serveur 🚫",
    message: `🙎‍♂️ **<@${user.id}>** à été ban du serveur !`,
    guildId: guild.id,
    initiator: user
});