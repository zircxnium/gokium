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
      console.log(msgsToDelete);
      message.channel.bulkDelete(msgsToDelete).then(() => {
        const moreThan1 = amount > 1 ? lang.msgsDeleted : lang.msgDeleted;
        message.channel.send(`**${amount}** ${moreThan1}`).then(msg => msg.delete({ timeout: 2500 }));
      });
    });
  });
}