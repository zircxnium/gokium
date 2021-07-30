const { MessageEmbed } = require("discord.js");

exports.launch = async (client, message, args, lang) => {
  if (!message.member.hasPermission('MANAGE_MESSAGES')) return;

  // const embed = new MessageEmbed()
  //   .setColor(0x2F3136)
  //   .setTitle("Bienvenue sur SDF's Shop")
  //   .setDescription("Pour confirmer ton entrée, réagis avec l'emote ✅")
  //   .setTimestamp()
  //   .setFooter("gokium", client.user.displayAvatarURL({format: "png" || "gif"}));

  // message.guild.channels.cache.get("821198828031049808").send(embed).then(async msg => {
  //   await msg.react("✅");
  //   message.delete();
  // });
}