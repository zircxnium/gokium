const { MessageEmbed } = require("discord.js");
const Utils = require('./../../utils.js');

exports.launch = (client, message, args) => {
  const embed = new MessageEmbed()
    .setColor(0x2F3136);
  if (!args[1]) {
    var snipes = require("./../../db/snipe.json"); // file containing snipes
    const chn = `${message.channel.id}`;
    var snipechannel = snipes[chn]; // to call an specific deleted message I guess
    if (!snipechannel) return message.reply("ya rien a snipe frérot :(");

    if (snipechannel[0] === "") {
      message.reply("ya rien a snipe frérot :(");
    } else {
      embed
        .setAuthor(snipechannel[1], snipechannel[2])
        .setDescription(snipechannel[0]);
      message.channel.send(embed);
  
      snipechannel[0] = "";
    
      var fileName = './db/snipe.json';
      Utils.Write(fileName, snipes);
    }
  } else if (args[1] === "edit") {
    var snipesEdit = require("./../../db/snipeedit.json"); // file containing snipes
    const chnEdit = `${message.channel.id}`;
    var snipechannelEdit = snipesEdit[chnEdit]; // to call an specific deleted message I guess
    if (!snipechannelEdit) return message.reply("ya rien a snipe frérot :(");
    
    if (snipechannelEdit[0] === "" || snipechannelEdit[1] === "") {
      message.reply("ya rien a snipe frérot :(");
    } else {
      embed
        .setAuthor(snipechannelEdit[2], snipechannelEdit[3])
        .addField("**Ancien message**", snipechannelEdit[0], true)
        .addField("**Nouveau message**", snipechannelEdit[1], true);
      message.channel.send(embed);
  
      snipechannelEdit[0] = "";
      snipechannelEdit[1] = "";
    
      var fileName = './db/snipeedit.json';
      Utils.Write(fileName, snipesEdit);
    }
  }
}

exports.commands = {
  description: "Snipe le dernier message supprimé ou édité.",
  use: "snipe ['edit' optionnel]"
}