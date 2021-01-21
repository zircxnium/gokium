exports.launch = (client, message, args, lang) => {
  return message.reply(lang.replyMsg).then(() => message.author.send(`https://discordapp.com/oauth2/authorize?client_id=${bot.user.id}&permissions=8&scope=bot`));
}