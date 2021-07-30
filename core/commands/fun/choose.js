exports.launch = (client, message, args, lang) => {
  const choose = args.join(" ").split("|");
  if (!choose[0]);
  const result = Math.floor(Math.random() * choose.length);
  const answer = choose[result];

  return message.reply(`${lang.answermsg} **${answer.trim()}** !`);
}