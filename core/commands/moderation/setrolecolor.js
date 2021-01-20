const db = require('quick.db');
const color = require('color-processing-library')

/* Export our launch() function */
module.exports.launch = async (bot, config, message, args) => {
  if (!message.member.hasPermission('MANAGE_ROLES')) return;

  const role = args[1];
  if (!role) return message.reply("précise un rôle ! Je veux l'ID ou le nom.");
  const roleColor = args[2];
  if (!roleColor) return message.reply("précise une couleur ! Je veux une couleur HEX (google est ton ami hein).");

  const findRole = message.guild.roles.cache.find(r => r.name.includes(role) || r.id.includes(role));
  if (!findRole) return message.reply("ce rôle n'existe pas.");
  if (!roleColor.includes("#")) roleColor = `#${roleColor}`;
  if (!color.isHexColorValid(roleColor)) return message.reply("la couleur n'est pas valide.");
  
  await findRole.setColor(roleColor).then(() => {
    return message.reply(`la couleur du rôle **${findRole.name}** à été changé sur **${roleColor}** !`)
  });
}

/* Exports */
exports.commands = {
  description: "Changer la couleur d'un rôle.",
  use: "setrolecolor [roleId ou nom du rôle]"
}