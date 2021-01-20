/* Export our launch() function */
module.exports.launch = async (bot, config, message, args) => {
  const question = args;
  if (!question[1]) return message.reply('faut peut-être me poser une question, tu penses pas ? :)');
  if (!question[2]) return message.reply('faut peut-être me poser une question en entier, tu penses pas ? :)');

  let replies = ["oui.", "non.", "j'en sais rien..", "demande moi ça plus tard la j'en ai rien a foutre 🙂", "si tu le dis", "j'en suis pas sur..", "sans un doute !", "bof."]
  let result = Math.floor((Math.random() * replies.length));
  
  return message.reply(replies[result]);
}

/* Exports */
exports.commands = {
  description: "Répond au hasard à vos questions.",
  use: "8ball [message]"
}