/* Export our launch() function */
module.exports.launch = async (bot, config, message, args) => {
  const ratus = message.mentions.members.first() || message.member;
  
  const rates = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  const result = Math.floor((Math.random() * rates.length));
  
  return message.channel.send(`Je donne un **__${result}/10__** à **<@${ratus.user.id}>** <:thonk:702579886207926302>`);  
}

/* Exports */
exports.commands = {
  description: "Note vous ou un utilisateur sur 10.",
  use: "rate (utilisateur optionnel)"
}