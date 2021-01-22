/* Export our launch() function */
exports.launch = async (client, message, args, lang) => {
  const newArgs = args.join(' ');
  if (!newArgs) return message.reply('faut peut-être mettre un message, tu penses pas ? :)');

  return await message.channel.send({
    files: [
      {
        attachment: `https://some-random-api.ml/canvas/youtube-comment?username=${encodeURIComponent(message.member.displayName)}&comment=${newArgs}&avatar=${message.author.displayAvatarURL({ format: "jpg" })}`,
        name: 'fdp.png'
      }
    ]
  });
}

exports.commands = {
  description: "Génère un faux commentaire youtube.",
  use: "comment [message]"
}