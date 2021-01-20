/* Export our launch() function */
module.exports.launch = async (bot, config, message, args) => {
  const argsssss = args.slice(1).join(" ");
  if (!argsssss) return;
  
  return message.channel.send(`**${message.author.username}** : Le vainqueur de **${argsssss}** est <@${message.guild.members.cache.filter(member => !member.user.bot).random().id}>`);
}

/* Exports */
exports.commands = {
  description: "Donne au hasard un utilisateur.",
  use: "roulette [message]"
}