exports.invites = {};

// A pretty useful method to create a delay without blocking the whole script.
const wait = require('util').promisify(setTimeout);

exports.run = async client => {
    // "ready" isn't really ready. We need to wait a spell.
    await wait(1000);
    // Load all invites for all guilds and save them to the cache.
    client.guilds.cache.forEach(g => {
        g.fetchInvites().then(guildInvites => this.invites[g.id] = guildInvites);
    });

    client.user.setActivity("gokium help");
    console.log("gokium is running.");
}