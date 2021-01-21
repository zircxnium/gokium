exports.launch = (client, message, args, lang) => {
  const member = message.mentions.members.first() || message.member;
  const status = member.user.presence.activities.find(status => status.type === "CUSTOM_STATUS") ? `${member.presence.activities.find(status => status.type === "CUSTOM_STATUS").emoji ? member.presence.activities.find(status => status.type === "CUSTOM_STATUS").emoji : null} ${member.user.presence.activities.find(status => status.type === "CUSTOM_STATUS").state ? member.presence.activities.find(status => status.type === "CUSTOM_STATUS").state : null}` : null;
  if (!status) return;

  return message.channel.send(status);
}

exports.commands = {
  description: "Afficher votre status ou celui d'un utilisateur.",
  use: "status (utilisateur optionnel)"
}