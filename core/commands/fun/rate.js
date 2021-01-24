exports.launch = (client, message, args, lang) => {
  const member = message.mentions.members.first() || message.member;
  const result = Math.floor((Math.random() * 10));
  return message.channel.send(`${lang.illsay} **__${result}/10__** à **<@${member.user.id}>** <:thonk:702579886207926302>`);  
}