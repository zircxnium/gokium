const { MessageEmbed } = require("discord.js");
const Config = require('./../../config.json');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const youtube = new YouTube(Config.GoogleAPIKey);

let dispatcher;
let isPlaying = false;
let isLoop = false;

/* Export our launch() function */
module.exports.launch = (bot, config, message, args) => {
  // if (!message.member.hasPermission('ADMINISTRATOR') || !message.guild.owner) return;

  const Args = message.content.split(' ');
  if (!Args) return;
  const url = Args[1] ? Args[1].replace(/<(.+)>/g, '$1') : '';
  if (!url) return;

	if (!message.member.voice.channel) return message.channel.send(`❌ Vous devez être dans un channel vocal pour utiliser cette commande.`);
  if (!message.guild.voice) return message.channel.send(`❌ Faut peut-être me faire join le channel, tu penses pas ? 🙂`);
  if (message.member.voice.channel !== message.guild.voice.channel) return message.channel.send(`❌ Vous devez être dans le même channel que moi pour utiliser cette commande.`);

  isLoop = false;

  async function playMusic() {
    const currChannel = await message.guild.voice.channel.join();
    if (url.match(/^https?:\/\/(www.youtube.com|youtube.com|youtu.be)(.*)$/)) {
      isPlaying = false;
      dispatcher = currChannel.play(ytdl(url, {filter: 'audioonly' }));
  
      dispatcher.on('start', () => {
        youtube.getVideo(url).then(video => {
          isPlaying = true;
          let theEmbed = new MessageEmbed()
            .setColor(0x6FA8DC)
            .setTitle(video.channel.title)
            .setDescription("🎶 Je t'ai mis **`" + video.title +"`**")
            .setThumbnail("https://i.imgur.com/7LeDb3z.png")
            .setImage(video.thumbnails.maxres.url || video.thumbnails.default.url || "https://etapes.com/app/uploads/2017/08/1504100047.jpg")
            .setTimestamp()
            // .setAuthor(`Upload le ${video.publishedAt}`, message.author.displayAvatarURL({ format: 'png' || 'gif', dynamic: true }))
            .setFooter(`Gokium`, bot.user.displayAvatarURL({ format: 'png' || 'gif', dynamic: true }));

            if(!isLoop) return message.channel.send({embed: theEmbed});
          // return message.channel.send("🎶 Je t'ai mis **`" + video.title +"`** de **`" + video.channel.title +"`**");
        })
        .catch(console.log);
      });
  
      dispatcher.on('finish', () => {
        isPlaying = false;
        if(!isLoop) message.channel.send(`✅ J'ai finis de jouer ta musique 🙂`);
        dispatcher.destroy();
        dispatcher = undefined;
        if (isLoop) playMusic();
      });
  
      dispatcher.on('error', console.error);
    } else {
      return message.channel.send(`❌ Me faut un lien YouTube :)`);
    }
  }
  playMusic();
}

/* Exports */
exports.commands = {
  description: "Jouer le son de votre choix.",
  use: "play [lien youtube ou nom de la musique]"
}

exports.getDispatcher = function() {
  return dispatcher;
};

exports.getIsPlaying = function() {
  return isPlaying;
};

exports.setIsPlaying = function(bool) {
  isPlaying = bool;
};

exports.getLoop = function() {
  return isLoop;
};

exports.setLoop = function(bool) {
  isLoop = bool;
};