const color = require('color-processing-library')

// to improve - can be simplified with another library i guess.
exports.launch = (client, message, args, lang) => {
  if (!message.member.hasPermission('MANAGE_ROLES')) return;

  const role = args[0];
  if (!role) return message.reply(lang.missid);
  let roleColor = args[1];
  if (!roleColor) return message.reply(lang.misscolor);

  const findRole = message.guild.roles.cache.find(r => r.name.includes(role) || r.id.includes(role));
  if (!findRole) return message.reply(lang.roledoesntexist);
  if (!roleColor.includes("#")) roleColor = `#${roleColor}`;
  if (!color.isHexColorValid(roleColor)) return message.reply(lang.colornotvalid);
  
  return findRole.setColor(roleColor).then(() => message.reply(`${lang.rolecolor} **${findRole.name}** ${lang.changedon} **${roleColor}** !`));
}