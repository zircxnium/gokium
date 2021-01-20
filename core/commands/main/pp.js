exports.launch = (client, message, args) => {
  const target = message.mentions.users.first() || message.author;
  const avatarURL = target.displayAvatarURL({format: "png" || "gif", dynamic: true, size: 4096});

  return message.channel.send(`**${message.author.username}**, voici l'avatar de <@${target.id}>:\n${avatarURL}`);
}

exports.commands = {
  description: "Affiche votre avatar ou celui de l'utilisateur mentionné.",
  use: "pp (utilisateur optionnel)"
}