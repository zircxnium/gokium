const utils = require('../utils');

exports.run = async (client, emoji) => {
    const initiator = await emoji.fetchAuthor();
    utils.logs({
        client,
        title: `👨 Nouvel emoji ajouté !`,
        message: `**Nom:** ${emoji.name}\n**ID:** ${emoji.id}\n**Emoji:** <:${emoji.name}:${emoji.id}>\n**GIF:** ${emoji.animated ? "Oui" : "Non"}`,
        guildId: emoji.guild.id,
        initiator
    });
}