let channelID;
let messageContent;
let messageID;
let stickState = false;

/* Export our launch() function */
module.exports.launch = async (bot, config, message, args) => {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return;

  const argsssss = args.slice(1).join(" ");
  if(!argsssss && stickState) {
    messageID = null;
    messageContent = null; 
    stickState = false;
    return message.reply('Message **unstick** !');
  }

  if(!argsssss) return message.reply('faut spécifier un message, tu penses pas :) ?');
  if(stickState) return message.reply('tu devrais unstick ton message épinglé, tu penses pas :) ?');

  await message.channel.send(`__***Message épinglé:***__\n\n${argsssss}`).then( msg => {
    channelID = msg.channel.id;
    messageContent = msg.content;
    messageID = msg.id;
    stickState = true;
  
    message.delete();
  });
}

/* Exports */
exports.commands = {
  description: "Stick un message (unstick si le champ est vide).",
  use: "stick [message]"
}

module.exports.getStickState = () => {
  return stickState;
}

module.exports.getStickChannelID = () => {
  return channelID;
}

module.exports.setStickChannelID = channel => {
  channelID = channel;
}

module.exports.getStickID = () => {
  return messageID;
}

module.exports.setStickID = message => {
  messageID = message;
}

module.exports.getStickMessage = () => {
  return messageContent;
}