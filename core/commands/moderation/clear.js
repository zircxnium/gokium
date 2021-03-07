/* Export our launch() function */
exports.launch = (client, message, args, lang) => {
  if (!message.member.hasPermission("MANAGE_MESSAGES")) return;

  const member = message.mentions.members.first();
  const amount = (!member && args[0]) || (member && args[1]);
  if (isNaN(amount)) return;
  if (amount < 1 || amount > 100) return;
  
  message.delete().then(() => {
    message.channel.messages.fetch({ limit: amount }).then(msgs => {
      const msgsToDelete = member ? msgs.filter(msg => msg.author.id === member.id) : msgs;

      message.channel.bulkDelete(msgsToDelete).then(messages => {
        const moreThan1 = messages.size > 1 ? lang.msgsDeleted : lang.msgDeleted;
        message.channel.send(`**${messages.size}** ${moreThan1}`).then(msg => msg.delete({ timeout: 2500 }));
      });
    });
  });
}