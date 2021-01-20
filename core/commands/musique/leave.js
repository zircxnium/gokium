/* Export our launch() function */
module.exports.launch = (bot, config, message, args) => {
  // if (!message.member.hasPermission('ADMINISTRATOR') || !message.guild.owner) return;

	if (!message.member.voice.channel) return message.channel.send(`❌ Vous devez être dans un channel vocal pour utiliser cette commande.`);
  if (!message.guild.voice) return message.channel.send(`❌ Faut peut-être me faire join le channel tu penses pas ? 🙂`);
  if (message.member.voice.channel !== message.guild.voice.channel) return message.channel.send(`❌ Vous devez être dans le même channel que moi pour utiliser cette commande.`);
  
  const leave = message.guild.voice.channel.leave();
  return message.channel.send(`📭 J'ai quitté le channel, a+ bg`);
}

/* Exports */
exports.commands = {
  description: "Fais quitter le bot de votre channel vocal.",
  use: "leave"
}