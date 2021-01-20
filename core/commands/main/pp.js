/* Export our launch() function */
module.exports.launch = (bot, config, message, args) => {
  var avatarURL; // https://some-random-api.ml/canvas/greyscale?avatar=
  var target = message.mentions.users.first() || message.author;
    
  avatarURL = target.displayAvatarURL({format: "png" || "gif", dynamic: true, size: 4096});
  
  if (args[1] || args[2]) {
    if (args[1] === "grey" || args[2] === "grey") {
      avatarURL = `https://some-random-api.ml/canvas/greyscale?avatar=${target.displayAvatarURL({format: "png"})}`;
    } else if (args[1] === "gay" || args[2] === "gay") {
      avatarURL = `https://some-random-api.ml/canvas/gay?avatar=${target.displayAvatarURL({format: "png", size: 4096})}`;
    } else if (args[1] === "invert" || args[2] === "invert") {
      avatarURL = `https://some-random-api.ml/canvas/invert?avatar=${target.displayAvatarURL({format: "png", size: 4096})}`;
    } else if (args[1] === "triggered" || args[2] === "triggered") {
      avatarURL = `https://some-random-api.ml/canvas/triggered?avatar=${target.displayAvatarURL({format: "png", size: 4096})}`;
    } else if (args[1] === "wasted" || args[2] === "wasted") {
      avatarURL = `https://some-random-api.ml/canvas/wasted?avatar=${target.displayAvatarURL({format: "png", size: 4096})}`;
    } else if (args[1] === "blur" || args[2] === "blur") {
      avatarURL = `https://some-random-api.ml/canvas/blur?avatar=${target.displayAvatarURL({format: "png", size: 4096})}`;
    } else if (args[1] === "blurple" || args[2] === "blurple") {
      avatarURL = `https://some-random-api.ml/canvas/blurple?avatar=${target.displayAvatarURL({format: "png", size: 4096})}`;
    } else if (args[1] === "glass" || args[2] === "glass") {
      avatarURL = `https://some-random-api.ml/canvas/glass?avatar=${target.displayAvatarURL({format: "png", size: 4096})}`;
    } else if (args[1] === "pixelate" || args[2] === "pixelate") {
      avatarURL = `https://some-random-api.ml/canvas/pixelate?avatar=${target.displayAvatarURL({format: "png", size: 4096})}`;
    } else if (args[1] === "sepia" || args[2] === "sepia") {
      avatarURL = `https://some-random-api.ml/canvas/sepia?avatar=${target.displayAvatarURL({format: "png", size: 4096})}`;
    } else if (args[1] === "spin" || args[2] === "spin") {
      avatarURL = `https://some-random-api.ml/canvas/spin?avatar=${target.displayAvatarURL({format: "png", size: 4096})}`;
    }
  }

  return message.channel.send(`**${message.author.username}**, voici l'avatar de <@${target.id}>:\n${avatarURL}`);
}

/* Exports */
exports.commands = {
  description: "Affiche votre avatar ou celui de l'utilisateur mentionné.",
  use: "pp (utilisateur optionnel) (grey|gay|invert|triggered|wasted|blur|blurple|glass|pixelate|sepia|spin optionnel)"
}