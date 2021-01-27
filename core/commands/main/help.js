const { MessageEmbed } = require("discord.js");
const { commandsCategories, capitalize } = require('../../utils');
const db = require('quick.db');

// can be optimised and simplified
exports.launch = (client, message, args, lang) => {
    const prefix = db.get(`prefix_${message.guild.id}`);
    if (!prefix) return;

    const embed = new MessageEmbed()
        .setColor(0x2F3136)
        .setThumbnail(client.user.displayAvatarURL({ format: 'png' || 'gif', dynamic: true }))
        .setAuthor(lang.commands)
        .setTimestamp()
        .setFooter("gokium", client.user.displayAvatarURL({ format: 'png' || 'gif', dynamic: true }));

    commandsCategories.forEach(category => embed.addField(`**${capitalize(category)}**`, lang[`${category}-emoji`], true));

    const getLang = db.get(`lang_${message.guild.id}`);
    if (!getLang) return;
    const commandsLocale = require(`../../locales/${getLang}.json`)["commands"];
    if (!commandsLocale) return;

    message.channel.send(embed).then(msg => {
        const filter = (reaction, user) => ['🔴', '🟠', '🟡'].includes(reaction.emoji.name) && user.id === message.author.id;

        let newembed;        
        const collector = msg.createReactionCollector(filter, { time: 30000 });
        collector.on('collect', (reaction, collector) => {
            if (reaction.emoji.name === '🔴') {
                newembed = new MessageEmbed()
                    .setColor(0x2F3136)
                    .setThumbnail(client.user.displayAvatarURL({ format: 'png' || 'gif', dynamic: true }))
                    .setTimestamp()
                    .setFooter("gokium", client.user.displayAvatarURL({ format: 'png' || 'gif', dynamic: true }));
                for (const command in commandsLocale["main"]) if (commandsLocale["main"][command].use && commandsLocale["main"][command].description) newembed.addField(commandsLocale["main"][command].use, commandsLocale["main"][command].description);
                newembed.setAuthor('Main');
            } else if (reaction.emoji.name === '🟠') {
                newembed = new MessageEmbed()
                    .setColor(0x2F3136)
                    .setThumbnail(client.user.displayAvatarURL({ format: 'png' || 'gif', dynamic: true }))
                    .setTimestamp()
                    .setFooter("gokium", client.user.displayAvatarURL({ format: 'png' || 'gif', dynamic: true }));
                for (const command in commandsLocale["fun"]) if (commandsLocale["fun"][command].use && commandsLocale["fun"][command].description) newembed.addField(commandsLocale["fun"][command].use, commandsLocale["fun"][command].description);
                newembed.setAuthor('Fun');
            } else if (reaction.emoji.name === '🟡') {
                newembed = new MessageEmbed()
                    .setColor(0x2F3136)
                    .setThumbnail(client.user.displayAvatarURL({ format: 'png' || 'gif', dynamic: true }))
                    .setTimestamp()
                    .setFooter("gokium", client.user.displayAvatarURL({ format: 'png' || 'gif', dynamic: true }));
                for (const command in commandsLocale["moderation"]) if (commandsLocale["moderation"][command].use && commandsLocale["moderation"][command].description) newembed.addField(commandsLocale["moderation"][command].use, commandsLocale["moderation"][command].description);
                newembed.setAuthor('Moderation');
            }
            
            msg.edit(newembed);
        });

        msg.react('🔴')
        .then(() => msg.react('🟠'))
        .then(() => msg.react('🟡'));
    });
}