exports.launch = (client, message, args, lang) => {
  const target = message.mentions.users.first() || message.author;
  const avatarURL = target.displayAvatarURL({format: "png" || "gif", dynamic: true, size: 4096});

  return message.channel.send(`**${message.author.username}**, ${lang.avatarMsg} <@${target.id}>:\n${avatarURL}`);
}