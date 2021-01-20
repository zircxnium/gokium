/* Export our launch() function */
exports.launch = (client, message, args) => {
  if (!message.member.hasPermission("MANAGE_MESSAGES")) return;

  const amount = args[0];
  if (isNaN(amount)) return;
  if (amount < 1 || amount > 100) return;
  
  message.delete().then(() => {
    message.channel.messages.fetch({ limit: amount }).then(msgs => {
      message.channel.bulkDelete(msgs).then(() => {
        const isMoreThan1 = amount > 1 ? "messages ont été supprimés." : "message à été supprimé.";
        message.channel.send(`**${amount}** ${isMoreThan1}`).then(msg => msg.delete({ timeout: 2500 }));
      });
    });
  });
}

exports.commands = {
  description: "Clear le chat.",
  use: "clear [montant]"
}