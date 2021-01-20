/* Export our launch() function */
module.exports.launch = async (bot, config, message, args) => {
  message.reply("je t'envoie ça en dm !").then(() => {
    return message.author.send(`https://discordapp.com/oauth2/authorize?client_id=${bot.user.id}&permissions=8&scope=bot`);
  });
}

/* Exports */
exports.commands = {
  description: "Envoie l'invitation pour le bot `Gokium`.",
  use: "botinvite"
}