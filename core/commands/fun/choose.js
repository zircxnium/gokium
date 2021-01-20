/* Export our launch() function */
module.exports.launch = async (bot, config, message, args) => {
  let choose = args.slice(1).join(" ").split(" | ");
  let result = Math.floor(Math.random() * choose.length);
  let answer = choose[result];
  
  return message.reply(`je choisis: **${answer}**`);
}

/* Exports */
exports.commands = {
  description: "Choisis une de vos propositions.",
  use: "choose [choix 1] | [choix 2]"
}