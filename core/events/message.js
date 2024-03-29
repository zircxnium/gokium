const fs = require('fs');
const db = require('quick.db');
const { defaultPrefix, commandsFolder, commandsCategories } = require('../utils');

// maybe manage this with db to have custom banned words ?
const bannedWords = [`discord.gg`, `.gg/`, `.gg /`, `. gg /`, `. gg/`, `discord .gg /`, `discord.gg /`, `discord .gg/`, `discord .gg`, `discord . gg`, `discord. gg`, `discord gg`, `discordgg`, `discord gg /`];
exports.run = (client, message) => {
    const { guild, content, author, channel } = message;
    
    // Ignore messages that aren't from a guild
    if (!guild) return;

    // Delete message if member is muted
    const mutedRole = guild.roles.cache.find(role => role.name === "Muted");
    if (guild.me.hasPermission("MANAGE_MESSAGES") && message.member && message.member.roles && mutedRole && message.member.roles.cache.has(mutedRole.id) && guild.owner && guild.owner.id !== author.id) return message.delete();

    // Return if message is sent by bot.
    if (author.bot) return;

    const canBypassCmd = message.member.hasPermission("ADMINISTRATOR") || author.id == "686244356394451041" || author.id == "841216621066190868";
    
    // Blacklist words
    if (bannedWords.some(word => message.content.toLowerCase().includes(word)) && (!canBypassCmd)) message.delete();
  
    // XP
    const xpAdd = Math.floor(Math.random() * 7) + 8;
    db.add(`xp_${guild.id}_${author.id}`, xpAdd);
    db.add(`messages_count_${guild.id}_${author.id}`, 1);
    
    // Levels
    const levelCount = db.get(`level_${guild.id}_${author.id}`);
    if (!levelCount) db.add(`level_${guild.id}_${author.id}`, 1);
  
    const nxtLvl = levelCount * 300;
    const xpCount = db.get(`xp_${guild.id}_${author.id}`);
    if (nxtLvl <= xpCount) db.add(`level_${guild.id}_${author.id}`, 1);
  
    // Get Prefix
    const dbPrefix = db.get(`prefix_${guild.id}`);
    if (!dbPrefix) return db.set(`prefix_${guild.id}`, 'g!');
    const currentPrefix = content.startsWith(defaultPrefix) ? defaultPrefix : (content.startsWith(dbPrefix) ? dbPrefix : null);
    if (!currentPrefix) return;
  
    // Get if command channel only
    const commandChannelId = db.get(`commandchannel_${guild.id}`);
    if (commandChannelId && channel.id !== commandChannelId && (!canBypassCmd)) return;
  
    const args = content.slice(currentPrefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    
    commandsCategories.forEach(category => {
        const fileCommandExists = fs.existsSync(`${commandsFolder}/${category}/${command}.js`);
        if(!fileCommandExists) return;

        const getLang = db.get(`lang_${guild.id}`);
        if (!getLang) return db.set(`lang_${guild.id}`, 'fr');
        const lang = require(`../locales/${getLang}.json`)["commands"][category][command];
        if (!lang) return;

        const commandFile = require(`${commandsFolder}/${category}/${command}.js`);
        commandFile.launch(client, message, args, lang);
    });
};