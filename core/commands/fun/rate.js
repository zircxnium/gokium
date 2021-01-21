exports.launch = (client, message, args, lang) => {
  const member = message.mentions.members.first() || message.member;
  const result = Math.floor((Math.random() * 10));
  return message.channel.send(`Je donne un **__${result}/10__** à **<@${member.user.id}>** <:thonk:702579886207926302>`);  
}

exports.commands = {
  description: "Note vous ou un utilisateur sur 10.",
  use: "rate (utilisateur optionnel)"
}