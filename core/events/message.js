const fs = require('fs');
const defaultPrefix = "gokium";
const dbPrefix =  "aa"// db.get(`prefix_${guild.id}`);
const commandsFolder = `${__dirname}/../commands`;
const commandsCategories = ['main', 'fun', 'moderation', 'musique'];

exports.run = (client, message) => {
    const { guild, content, author, channel } = message;
    // Ignore messages that aren't from a guild
    if (!guild) return;

    // // Delete message if member is muted
    // const muteRole = message.guild.roles.cache.find(r => r.name === "Muted");
    // if (message.guild.me.hasPermission("MANAGE_MESSAGES") && message.member && message.member.roles && muteRole && message.member.roles.cache.has(muteRole.id) && message.guild.owner && message.guild.owner.id !== message.author.id) return message.delete();
    
    // Return if message is sent by bot.
    if (author.bot) return;
    
    // if (message.guild.me.hasPermission("MANAGE_MESSAGES")) {
    //   // Stick
    //   const stick = require("./commands/moderation/stick.js");
    //   if (stick.getStickState() && message.channel.id === stick.getStickChannelID()) {
    //     if (stick.getStickState() && stick.getStickID() && stick.getStickMessage() && stick.getStickChannelID()){
    //       const newChannel = message.guild.channels.cache.get(stick.getStickChannelID());
        
    //       newChannel.messages.fetch(stick.getStickID()).then(msg => {
    //         msg.delete();
    //         if (!stick.getStickMessage()) return;
    //         newChannel.send(stick.getStickMessage()).then(msg => {
    //           stick.setStickID(msg.id);
    //         });
    //       })
    //     }
    //   }
        
    //   // Blacklist words
    //   const bannedWords = [`discord.gg`, `.gg/`, `.gg /`, `. gg /`, `. gg/`, `discord .gg /`, `discord.gg /`, `discord .gg/`, `discord .gg`, `discord . gg`, `discord. gg`, `discord gg`, `discordgg`, `discord gg /`];
    //   try {
    //     if (bannedWords.some(word => message.content.toLowerCase().includes(word))) {
    //       if (message.member.hasPermission("ADMINISTRATOR")) return;
    //       message.delete();
    //     }
    //   } catch(e) {
    //     console.log(e);
    //   }
    // }
  
    // XP & Levels
    // const xpAdd = Math.floor(Math.random() * 7) + 8;
    // db.add(`xp_${message.guild.id}_${message.author.id}`, xpAdd);
    // db.add(`messages_count_${message.guild.id}_${message.author.id}`, 1);
  
    // const levelCount = db.get(`level_${message.guild.id}_${message.author.id}`);
    // if (!levelCount) {
    //   db.add(`level_${message.guild.id}_${message.author.id}`, 1);
    // }
  
    // const nxtLvl = levelCount * 300;
    // const xpCount = db.get(`xp_${message.guild.id}_${message.author.id}`);
    // if (nxtLvl <= xpCount) {
    //   db.add(`level_${message.guild.id}_${message.author.id}`, 1);
    // }
  
    // Get Prefix
    const currentPrefix = content.startsWith(defaultPrefix) ? defaultPrefix : (content.startsWith(dbPrefix) ? dbPrefix : null);
    if(!currentPrefix) return;

    // if (!getPrefix) {
    //     db.set(`prefix_${guild.id}`, 'g!');
    //     return;
    // }
  
    // Get if command channel only
    // const commandChannelId = db.get(`commandchannel_${message.guild.id}`);
    // if (commandchannel && message.channel.id !== commandChannelId && !message.member.hasPermission("ADMINISTRATOR")) return;
  
    const args = content.slice(currentPrefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    commandsCategories.forEach(category => {
        const fileCommandExists = fs.existsSync(`${commandsFolder}/${category}/${command}.js`);
        if(!fileCommandExists) return;

        const commandFile = require(`${commandsFolder}/${category}/${command}.js`);
        commandFile.launch(client, message, args);
    });
};