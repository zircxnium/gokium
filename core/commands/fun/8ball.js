exports.launch = (client, message, args, lang) => {
  if (!args[0]) return message.reply(lang.askaquestion);
  const result = Math.floor((Math.random() * lang.replies.length));

  return message.reply(lang.replies[result]);
}