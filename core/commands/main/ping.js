/* Export our launch() function */
module.exports.launch = async (client, config, message, args) => {
  const time = (new Date()).getTime() - 1;

  return message.channel.send({
    embed: {
      color: 0x6FA8DC,
      title: "🏓 Pong!",
      description: `API Latency: **${Math.round(client.ws.ping)}ms**\nBot Latency: **${(new Date()).getTime() - time}ms**`
    }
  })
}

/* Exports */
exports.commands = {
  description: "Renvoie les latences du bot (API&Client).",
  use: "ping"
}