const replies = ["oui.", "non.", "j'en sais rien..", "demande moi ça plus tard la j'en ai rien a foutre 🙂", "si tu le dis", "j'en suis pas sur..", "sans un doute !", "bof."];

exports.launch = (client, message, args, lang) => {
  if (!args[0]) return message.reply('Pose moi une question avant et je te répondrais avec plaisir.');
  const result = Math.floor((Math.random() * replies.length));

  return message.reply(replies[result]);
}