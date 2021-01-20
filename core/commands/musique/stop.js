const play = require('./play.js');

/* Export our launch() function */
module.exports.launch = async (bot, config, message, args) => {
  // if (!message.member.hasPermission('ADMINISTRATOR') || !message.guild.owner) return;

	if (!message.member.voice.channel) return message.channel.send(`❌ Vous devez être dans un channel vocal pour utiliser cette commande.`);
  if (!message.guild.voice) return message.channel.send(`❌ Faut peut-être me faire join le channel tu penses pas ? 🙂`);
  if (message.member.voice.channel !== message.guild.voice.channel) return message.channel.send(`❌ Vous devez être dans le même channel que moi pour utiliser cette commande.`);
  if (!play.getIsPlaying()) return message.channel.send(`❌ Faut peut-être lancer une musique, non ? 🙂`);
  
  if(play.getDispatcher()) {
    play.getDispatcher().destroy();
    play.setLoop(false);
    play.setIsPlaying(false);

    return message.channel.send(`✅ J'ai **stop** ta musique.`)
  }
}

/* Exports */
exports.commands = {
  description: "Stop le son en cours.",
  use: "stop"
}