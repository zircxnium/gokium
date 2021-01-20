const play = require('./play.js');

/* Export our launch() function */
module.exports.launch = async (bot, config, message, args) => {
  // if (!message.member.hasPermission('ADMINISTRATOR') || !message.guild.owner) return;
  
  const volume = args[1];
  
  if (!volume) return;
  if (isNaN(volume)) return;
  
  if (volume > 100) return;
  if (volume < 0) return;

	if (!message.member.voice.channel) return message.channel.send(`❌ Vous devez être dans un channel vocal pour utiliser cette commande.`);
  if (!message.guild.voice) return message.channel.send(`❌ Faut peut-être me faire join le channel tu penses pas ? 🙂`);
  if (message.member.voice.channel !== message.guild.voice.channel) return message.channel.send(`❌ Vous devez être dans le même channel que moi pour utiliser cette commande.`);
  if (!play.getIsPlaying()) return message.channel.send(`❌ Faut peut-être lancer une musique, non ? 🙂`);
          
  if (play.getDispatcher()) {
    play.getDispatcher().setVolume(volume);

    return message.channel.send(`✅ J'ai réglé le volume à **${volume}**.`)
  }
}

/* Exports */
exports.commands = {
  description: "Régler le volume du son en cours.",
  use: "volume [montant 0-100]"
}