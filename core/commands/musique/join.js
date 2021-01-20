/* Export our launch() function */
module.exports.launch = async (bot, config, message, args) => {
  // if (!message.member.hasPermission('ADMINISTRATOR') || !message.guild.owner) return;

	if (message.member.voice.channel) {
    if (message.guild.voice && message.guild.voice.channel) return message.channel.send(`❌ Je suis déjà occupé dans : **${message.guild.voice.channel.name}**`);
    const connection = await message.member.voice.channel.join();
    return message.channel.send(`👍 J'ai rejoins le channel : **${message.member.voice.channel.name}**`);
  } else {
    return message.channel.send(`❌ Vous devez être dans un channel vocal pour utiliser cette commande.`);
  }
}

/* Exports */
exports.commands = {
  description: "Envoie le bot dans votre channel vocal.",
  use: "join"
}