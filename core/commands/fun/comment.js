/* Export our launch() function */
module.exports.launch = async (bot, config, message, args) => {
  const argsssss = args.slice(1).join(" ");
  if (!argsssss) return message.reply('faut peut-être mettre un message, tu penses pas ? :)');

  await message.channel.send({files: [{
    attachment: `https://some-random-api.ml/canvas/youtube-comment?username=${message.author.username}&comment=${argsssss}&avatar=${message.author.displayAvatarURL()}`,
    name: 'fdp.png'
  }]});
}

/* Exports */
exports.commands = {
  description: "Génère un faux commentaire youtube.",
  use: "comment [message]"
}