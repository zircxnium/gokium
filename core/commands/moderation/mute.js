const { MessageEmbed } = require("discord.js");
const util = require('util');

exports.launch = async (client, message, args, lang) => {
  if (!message.member.hasPermission('MANAGE_ROLES')) return;

  const member = message.mentions.members.first();
  if (!member) return;
  if (member.id == message.author.id) return message.reply(lang.cantmuteuself);
      
  const reason = args.slice(1).join(' ') || lang.noreason;

  const muteRole = message.guild.roles.cache.find(r => r.name === "Muted");
  if (!muteRole) {
    try {
      muteRole = await message.guild.roles.create({data: {
        name: "Muted",
        color: "#a3a2a2",
        permissions: []
      }, reason: 'Creating Muted Role for Gokium'});

      message.guild.channels.cache.forEach(async (channel, id) => {
        await channel.updateOverwrite(muteRole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false,
          SEND_TTS_MESSAGES: false,
          ATTACH_FILES: false,
          SPEAK: false
        });
      });
    } catch(err) {
      console.log(err.stack);
    }
  }

  const hasRole = member.roles.cache.has(muteRole.id);
  if (hasRole) return message.channel.send(lang.alreadymuted);
  
  member.roles.add(muteRole.id).then(() => {
    const embed = new MessageEmbed()
      .setColor(0x2F3136)
      .setAuthor(util.format(lang.beenmuted, member.user.tag), member.user.displayAvatarURL({ format: 'png' || 'gif', dynamic: true }))
      .setDescription(`**${lang.reason}** ${reason}`)
      .setTimestamp()
      .setFooter("gokium", client.user.displayAvatarURL({format: "png" || "gif"}));

    if (!member.bot) member.send(`${util.format(lang.mutedmsg, message.guild.name, message.author.tag)}\n${reason ? `**${lang.reason}** ${reason}` : ""}`);
    message.channel.send(embed).then(() => message.delete());
  })
}

exports.commands = {
  description: "Mute un membre.",
  use: "mute [utilisateur] (raison optionnel)"
}