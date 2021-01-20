exports.launch = (client, message, args) => {
  return message.reply("je t'envoie ça en dm !").then(() => message.author.send(`https://discordapp.com/oauth2/authorize?client_id=${bot.user.id}&permissions=8&scope=bot`));
}

exports.commands = {
  description: "Envoie l'invitation pour le bot `Gokium`.",
  use: "botinvite"
}