exports.launch = (client, message, args) => {
  const newArgs = args.join(" ");
  if (!newArgs) return;
  return message.channel.send(`**${message.author.username}** : Le vainqueur de **${newArgs}** est <@${message.guild.members.cache.filter(member => !member.user.bot).random().id}>`);
}

exports.commands = {
  description: "Donne au hasard un utilisateur.",
  use: "roulette [message]"
}