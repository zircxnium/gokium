exports.launch = (client, message, args, lang) => {
  const newArgs = args.join(" ");
  if (!newArgs) return;
  return message.channel.send(`**${message.author.username}** : ${lang.winner} **${newArgs}** ${lang.is} <@${message.guild.members.cache.filter(member => !member.user.bot).random().id}>`);
}