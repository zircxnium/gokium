exports.launch = async (client, message, args, lang) => {
  const msg = args.join(' ');
  if (!msg) return message.reply(lang.putamsg);

  return await message.channel.send({
    files: [
      {
        attachment: `https://some-random-api.ml/canvas/youtube-comment?username=${encodeURIComponent(message.member.displayName)}&comment=${msg}&avatar=${message.author.displayAvatarURL({ format: "jpg" })}`,
        name: 'youtube.png'
      }
    ]
  });
}