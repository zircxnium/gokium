exports.launch = (client, message, args, lang) => {
  const choose = args.join(" ").split("|");
  console.log(choose)
  const result = Math.floor(Math.random() * choose.length);
  const answer = choose[result].trim();

  return message.reply(`mmmh je dirais.. **${answer}** !`);
}

exports.commands = {
  description: "Choisis une de vos propositions.",
  use: "choose [choix 1] [choix 2]"
}