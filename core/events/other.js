
// // Init
// client.on('ready', async () => {
//     console.log(success("Logged in"), "as", client.user.tag);
  
//     for (let i=0; i < 4; i++) {
//       const directories = ['./commands/main/', './commands/fun/', './commands/moderation/', './commands/musique/'];
  
//       fs.readdir(directories[i], (err, files) => {
//         files.forEach(response => {
//           if (err) return console.error(err);
//           if (!response.endsWith(".js")) return;
//         })
//       });
//     }
  
//     startActivity();
//     console.log(success('BOT READY!'));
//     setInterval(startActivity, 600000);
//   })
  
//   startActivity = async function() {
//     await client.user.setActivity("c rien c gokium");
//     await client.user.setStatus('dnd');
//   }
  
//   // client.on('debug', async info => {
//   //   console.log(Neutral(info));
//   // })
  
//   client.on('error', async (error, shard) => {
//     console.log(Error(error));
//   })
  
//   client.on('warn', async info => {
//     console.log(Warn(info));
//   })
  
//   client.on('disconnect', async (devent, shard) => {
//     console.log(Error('Déconnecté.'));
//   })
  
//   client.on('reconnecting', async shard => {
//     console.log(Warn('Reconnexion..'));
//   })
  
//   client.on('resume', async (replayed, shard) => {
//     console.log(success('Resuming'));
//   })
  
//   client.on('rateLimit', async info => {
//     console.log(`Rate limit hit ${info.timeDifference ? info.timeDifference : info.timeout ? info.timeout : 'Unknown timeout '}ms (${info.path} / ${info.requestLimit ? info.requestLimit : info.limit ? info.limit : 'Unknown limit'})`);
//   })
  
//   client.on('message', async message => {
//     // Ignore messages that are nothingl ol
//     if (!message) return;
//     // Ignore messages that aren't from a guild
//     if (!message.guild) return;
//     // Delete message if member is muted
//     const muteRole = message.guild.roles.cache.find(r => r.name === "Muted");
//     if (message.guild.me.hasPermission("MANAGE_MESSAGES") && message.member && message.member.roles && muteRole && message.member.roles.cache.has(muteRole.id) && message.guild.owner && message.guild.owner.id !== message.author.id) return message.delete();
    
//     // Return if message is sent by bot.
//     if (message && message.author && message.author.bot) return;
    
//     if (message.guild.me.hasPermission("MANAGE_MESSAGES")) {
//       // Stick
//       const stick = require("./commands/moderation/stick.js");
//       if (stick.getStickState() && message.channel.id === stick.getStickChannelID()) {
//         if (stick.getStickState() && stick.getStickID() && stick.getStickMessage() && stick.getStickChannelID()){
//           const newChannel = message.guild.channels.cache.get(stick.getStickChannelID());
        
//           newChannel.messages.fetch(stick.getStickID()).then(msg => {
//             msg.delete();
//             if (!stick.getStickMessage()) return;
//             newChannel.send(stick.getStickMessage()).then(msg => {
//               stick.setStickID(msg.id);
//             });
//           })
//         }
//       }
        
//       // Blacklist words
//       const bannedWords = [`discord.gg`, `.gg/`, `.gg /`, `. gg /`, `. gg/`, `discord .gg /`, `discord.gg /`, `discord .gg/`, `discord .gg`, `discord . gg`, `discord. gg`, `discord gg`, `discordgg`, `discord gg /`];
//       try {
//         if (bannedWords.some(word => message.content.toLowerCase().includes(word))) {
//           if (message.member.hasPermission("ADMINISTRATOR")) return;
//           message.delete();
//         }
//       } catch(e) {
//         console.log(e);
//       }
//     }
  
//     // XP & Levels
//     const xpAdd = Math.floor(Math.random() * 7) + 8;
//     db.add(`xp_${message.guild.id}_${message.author.id}`, xpAdd);
//     db.add(`messages_count_${message.guild.id}_${message.author.id}`, 1);
  
//     const levelCount = db.get(`level_${message.guild.id}_${message.author.id}`);
//     if (!levelCount) {
//       db.add(`level_${message.guild.id}_${message.author.id}`, 1);
//     }
  
//     const nxtLvl = levelCount * 300;
//     const xpCount = db.get(`xp_${message.guild.id}_${message.author.id}`);
//     if (nxtLvl <= xpCount) {
//       db.add(`level_${message.guild.id}_${message.author.id}`, 1);
//     }
  
//     // Get Prefix
//     let botPrefix = null;
//     if (message.content.startsWith("gokium")) {
//       botPrefix = "gokium "
//     } else {
//       const getPrefix = db.get(`prefix_${message.guild.id}`);
//       if (!getPrefix) {
//         db.set(`prefix_${message.guild.id}`, 'g!');
//         if (message.content.startsWith("g!" | "!")) message.reply('il y à eu une erreur avec le prefix, veuillez réessayez.\nPour rappel, `gokium` ou `g!` sont les préfixes par défaut.');
//         return;
//       }
  
//       botPrefix = getPrefix;
//     }
    
//     // Return if message doesn't have bot prefix.
//     if (!message.content.startsWith(botPrefix)) return;
  
//     // Get if command channel only
//     const commandchannel = db.get(`commandchannel_${message.guild.id}`);
//     if (commandchannel) {
//       if (message.channel.id !== commandchannel && !message.member.hasPermission("ADMINISTRATOR")) return;
//     }
  
//     const args = message.content.substring(botPrefix.length).split(" ");
//     const command = args[0].toLowerCase();
  
//     if (args[0] === "help") {
//       const theEmbed = new Discord.MessageEmbed()
//         .setColor(0x2F3136)
//         .setThumbnail(client.user.displayAvatarURL({format: "png" || "gif"}))
//         .setAuthor("Commandes")
//         .addField("**Main**", '`' + botPrefix + 'help main`', true, true)
//         .addField("**Fun**", '`' + botPrefix + 'help fun`', true, true)
//         .addField("**Modération**", '`' + botPrefix + 'help moderation`', true, true)
//         .addField("**Musique**", '`' + botPrefix + 'help musique`', true, true)
//         .setFooter('Made by zirconium', client.user.displayAvatarURL({format: "png" || "gif"}));
      
//       let help_content = [];
//       let description = "";
//       let files;
  
//       switch(args[1]) {
//         case "main":
//           files = './commands/main/'
//           break;
//         case "fun":
//           files = './commands/fun/';
//           break;
//         case "moderation":
//           files = './commands/moderation/';
//           break;
//         case "musique":
//           files = './commands/musique/';
//           break;
//         default:
//           return message.channel.send({embed: theEmbed});
//       }
  
//       const fileDirectory = fs.readdirSync(files);
//       fileDirectory.forEach(response => {
//         try {
//           const commandFile = require(files + response);
//           help_content.push("**" + botPrefix + commandFile.commands.use + "**" + `\n` + commandFile.commands.description + `\n`);
//         } catch (err) {
//           return console.error(err);
//         }
//       })
  
//       // Sort content by line length.
//       help_content.sort((x, y) => x.length - y.length);
  
//       // Make easy readable description from array.
//       for (let i = 0; i < fileDirectory.length; i++) description = description + help_content[i] + "\n";
  
//       return message.channel.send({
//         embed: {
//           color: 0x2F3136,
//           thumbnail: {"url": client.user.displayAvatarURL({format: "png" || "gif"})},
//           title: args[1].toUpperCase(),
//           description: description,
//         }
//       })
//     }
  
//     for (let i=0; i < 4; i++) {
//       const directories = ['./commands/main/', './commands/fun/', './commands/moderation/', './commands/musique/'];
//       const fileDirectory = `${directories[i]}${command}.js`;
      
//       fs.access(fileDirectory, fs.F_OK, (err) => {
//         if(err) return;
//         const commandFile = require(fileDirectory);
//         commandFile.launch(client, Config, message, args);
//       });
//     }
//   })
  
//   client.on("messageDelete", async message => {
//     if (!message) return;
//     if (!message.author) return;
//     if (message.author.bot) return;
    
//     if (message.content) {
//       const snipes = require("./db/snipe.json");
//       snipes[`${message.channel.id}`] = [`${message}`, `${message.author.username}`, `${message.author.displayAvatarURL({format: "png" || "gif"})}`];
    
//       const fileName = './db/snipe.json';
//       fs.writeFile(fileName, JSON.stringify(snipes, null, 2), function(error) {
//         if (error) return console.log('oops');
//       });
//     }
  
//     Utils.SendToLogs("delete", client, `🗑️ Un message de **<@${message.author.id}>** à été supprimé dans **<#${message.channel.id}>**`, message.author, message);
//   });
  
//   client.on("messageUpdate", async (oldMessage, newMessage) => {
//     if (!oldMessage) return;
//     if (!newMessage) return;
//     if (oldMessage.content == newMessage.content) return;
//     if (!oldMessage.author) return;
//     if (!newMessage.author) return;
//     if (!oldMessage.content) return;
//     if (!newMessage.content) return;
//     if (oldMessage.author.bot) return;
//     if (newMessage.author.bot) return;
    
//     const snipes = require("./db/snipeedit.json");
//     snipes[`${newMessage.channel.id}`] = [`${oldMessage}`, `${newMessage}`, `${newMessage.author.username}`, `${newMessage.author.displayAvatarURL({format: "png" || "gif"})}`];
  
//     const fileName = './db/snipeedit.json';
//     fs.writeFile(fileName, JSON.stringify(snipes, null, 2), function(error) {
//       if (error) return console.log('oops');
//     });
  
//     Utils.SendToLogs("edit", client, `✏️ Un message de **<@${newMessage.author.id}>** à été édité dans **<#${newMessage.channel.id}>**`, newMessage.author, oldMessage, newMessage);
//   });
  
//   client.on('messageReactionAdd', async (reaction, user) => {
//       if (reaction.partial) {
//           try {
//               await reaction.fetch();
//           } catch (error) {
//               console.log('Something went wrong when fetching the message: ', error);
//               return;
//           }
//     }
    
//     if (reaction.message.id === "733253522027446314") {
//       if (reaction.emoji.name === "✅") {
//         const SlayersRole = reaction.message.guild.roles.cache.find(r => r.name === "SLAYERS");
//         if(!SlayersRole) return;
//         reaction.message.guild.members.fetch(user).then(guildmember => guildmember.roles.add(SlayersRole.id));
//       }
//     } else if (reaction.message.id === "733254612173193217") {
//       if (reaction.emoji.name === "🔔") {
//         const citoyenRole = reaction.message.guild.roles.cache.find(r => r.name === "NOTIF LIVE");
//         if(!citoyenRole) return;
//         reaction.message.guild.members.fetch(user).then(guildmember => guildmember.roles.add(citoyenRole.id));
//       }
//     } else if (reaction.message.id === "725211051536154675") {
//       if (reaction.emoji.name === "✅") {
//         const citoyenRole = reaction.message.guild.roles.cache.find(r => r.name === "MEMBRE");
//         if(!citoyenRole) return;
//         reaction.message.guild.members.fetch(user).then(guildmember => guildmember.roles.add(citoyenRole.id));
//       }
//     } else if (reaction.message.id === "719616330785095722") {
//       if (reaction.emoji.name === "✅") {
//         const citRole = reaction.message.guild.roles.cache.find(r => r.name === "👦┆CITOYEN");
//         if(!citRole) return;
//         reaction.message.guild.members.fetch(user).then(guildmember => guildmember.roles.add(citRole.id));
//       }
//     } else if (reaction.message.id === "725215410789548043") {
//       const mecRole = reaction.message.guild.roles.cache.find(r => r.name === "HOMME");
//       if(!mecRole) return;
//       const meufRole = reaction.message.guild.roles.cache.find(r => r.name === "FEMME");
//       if(!meufRole) return;
      
//       if (reaction.emoji.name === "👦") {
//         reaction.message.guild.members.fetch(user).then(guildmember => {
//           if (guildmember.roles.cache.has(meufRole.id)) return reaction.users.remove(user).catch(console.error);
//           guildmember.roles.add(mecRole.id);
//         });
//       } else if (reaction.emoji.name === "👧") {
//         reaction.message.guild.members.fetch(user).then(guildmember => {
//           if (guildmember.roles.cache.has(mecRole.id)) return reaction.users.remove(user).catch(console.error);
//           guildmember.roles.add(meufRole.id);
//         });
//       }
//     } else if (reaction.message.id === "725216350196334612") {
//       const age1 = reaction.message.guild.roles.cache.find(r => r.name === "12-15 ans");
//       if(!age1) return;
//       const age2 = reaction.message.guild.roles.cache.find(r => r.name === "16-18 ans");
//       if(!age2) return;
//       const age3 = reaction.message.guild.roles.cache.find(r => r.name === "19-23 ans");
//       if(!age3) return;
//       const age4 = reaction.message.guild.roles.cache.find(r => r.name === "24-26 ans");;
//       if(!age4) return;
//       const age5 = reaction.message.guild.roles.cache.find(r => r.name === "27-29 ans");
//       if(!age5) return;
//       const age6 = reaction.message.guild.roles.cache.find(r => r.name === "30-32 ans");
//       if(!age6) return;
//       const age7 = reaction.message.guild.roles.cache.find(r => r.name === "+33 ans");
//       if(!age7) return;
  
//       if (reaction.emoji.name === "🇦") {
//         reaction.message.guild.members.fetch(user).then(guildmember => {
//           if (guildmember.roles.cache.has(age2.id) || guildmember.roles.cache.has(age3.id) || guildmember.roles.cache.has(age4.id) || guildmember.roles.cache.has(age5.id) || guildmember.roles.cache.has(age6.id) || guildmember.roles.cache.has(age7.id)) return reaction.users.remove(user).catch(console.error);
//           guildmember.roles.add(age1.id);
//         });
//       } else if (reaction.emoji.name === "🇧") {
//         reaction.message.guild.members.fetch(user).then(guildmember => {
//           if (guildmember.roles.cache.has(age1.id) || guildmember.roles.cache.has(age3.id) || guildmember.roles.cache.has(age4.id) || guildmember.roles.cache.has(age5.id) || guildmember.roles.cache.has(age6.id) || guildmember.roles.cache.has(age7.id)) return reaction.users.remove(user).catch(console.error);
//           guildmember.roles.add(age2.id);
//         });
//       } else if (reaction.emoji.name === "🇨") {
//         reaction.message.guild.members.fetch(user).then(guildmember => {
//           if (guildmember.roles.cache.has(age1.id) || guildmember.roles.cache.has(age2.id) || guildmember.roles.cache.has(age4.id) || guildmember.roles.cache.has(age5.id) || guildmember.roles.cache.has(age6.id) || guildmember.roles.cache.has(age7.id)) return reaction.users.remove(user).catch(console.error);
//           guildmember.roles.add(age3.id);
//         });
//       } else if (reaction.emoji.name === "🇩") {
//         reaction.message.guild.members.fetch(user).then(guildmember => {
//           if (guildmember.roles.cache.has(age1.id) || guildmember.roles.cache.has(age2.id) || guildmember.roles.cache.has(age3.id) || guildmember.roles.cache.has(age5.id) || guildmember.roles.cache.has(age6.id) || guildmember.roles.cache.has(age7.id)) return reaction.users.remove(user).catch(console.error);
//           guildmember.roles.add(age4.id);
//         });
//       } else if (reaction.emoji.name === "🇪") {
//         reaction.message.guild.members.fetch(user).then(guildmember => {
//           if (guildmember.roles.cache.has(age1.id) || guildmember.roles.cache.has(age2.id) || guildmember.roles.cache.has(age3.id) || guildmember.roles.cache.has(age4.id) || guildmember.roles.cache.has(age6.id) || guildmember.roles.cache.has(age7.id)) return reaction.users.remove(user).catch(console.error);
//           guildmember.roles.add(age5.id);
//         });
//       } else if (reaction.emoji.name === "🇫") {
//         reaction.message.guild.members.fetch(user).then(guildmember => {
//           if (guildmember.roles.cache.has(age1.id) || guildmember.roles.cache.has(age2.id) || guildmember.roles.cache.has(age3.id) || guildmember.roles.cache.has(age4.id) || guildmember.roles.cache.has(age5.id) || guildmember.roles.cache.has(age7.id)) return reaction.users.remove(user).catch(console.error);
//           guildmember.roles.add(age6.id);
//         });
//       } else if (reaction.emoji.name === "🇬") {
//         reaction.message.guild.members.fetch(user).then(guildmember => {
//           if (guildmember.roles.cache.has(age1.id) || guildmember.roles.cache.has(age2.id) || guildmember.roles.cache.has(age3.id) || guildmember.roles.cache.has(age4.id) || guildmember.roles.cache.has(age5.id) || guildmember.roles.cache.has(age6.id)) return reaction.users.remove(user).catch(console.error);
//           guildmember.roles.add(age7.id);
//         });
//       }
//     } else if (reaction.message.id === "725217429336228012") {
//       const heteRole = reaction.message.guild.roles.cache.find(r => r.name === "CÉLIBATAIRE");
//       if(!heteRole) return;
//       const gayRole = reaction.message.guild.roles.cache.find(r => r.name === "EN COUPLE");
//       if(!gayRole) return;
//       const lesbRole = reaction.message.guild.roles.cache.find(r => r.name === "MARIÉ(E)/FIANCÉ(E)");
//       if(!lesbRole) return;
  
//       if (reaction.emoji.name === "💔") {
//         reaction.message.guild.members.fetch(user).then(guildmember => {
//           if (guildmember.roles.cache.has(gayRole.id) || guildmember.roles.cache.has(lesbRole.id)) return reaction.users.remove(user).catch(console.error);
//           guildmember.roles.add(heteRole.id);
//         });
//       } else if (reaction.emoji.name === "❤️") {
//         reaction.message.guild.members.fetch(user).then(guildmember => {
//           if (guildmember.roles.cache.has(lesbRole.id) || guildmember.roles.cache.has(heteRole.id)) return reaction.users.remove(user).catch(console.error);
//           guildmember.roles.add(gayRole.id);
//         });
//       } else if (reaction.emoji.name === "💛") {
//         reaction.message.guild.members.fetch(user).then(guildmember => {
//           if (guildmember.roles.cache.has(gayRole.id) || guildmember.roles.cache.has(heteRole.id)) return reaction.users.remove(user).catch(console.error);
//           guildmember.roles.add(lesbRole.id);
//         });
//       }
//     } else if (reaction.message.id === "691931542792044615") {
//       const csRole = reaction.message.guild.roles.cache.find(r => r.name === "CS:GO");
//       if(!csRole) return;
//       const r6sRole = reaction.message.guild.roles.cache.find(r => r.name === "RAINBOW SIX: SIEGE");
//       if(!r6sRole) return;
//       const fortRole = reaction.message.guild.roles.cache.find(r => r.name === "FORTNITE");
//       if(!fortRole) return;
//       const gtaRole = reaction.message.guild.roles.cache.find(r => r.name === "GTA5");
//       if(!gtaRole) return;
//       const rlRole = reaction.message.guild.roles.cache.find(r => r.name === "ROCKET LEAGUE");
//       if(!rlRole) return;
//       const warRole = reaction.message.guild.roles.cache.find(r => r.name === "WARZONE");
//       if(!warRole) return;
  
//       if (reaction.emoji.id === "691931148577669171") {
//         reaction.message.guild.members.fetch(user).then(guildmember => {
//           guildmember.roles.add(csRole.id);
//         });
//       } else if (reaction.emoji.id === "691913007244247090") {
//         reaction.message.guild.members.fetch(user).then(guildmember => {
//           guildmember.roles.add(r6sRole.id);
//         });
//       } else if (reaction.emoji.id === "691913007160229909") {
//         reaction.message.guild.members.fetch(user).then(guildmember => {
//           guildmember.roles.add(fortRole.id);
//         });
//       } else if (reaction.emoji.id === "691913006942126111") {
//         reaction.message.guild.members.fetch(user).then(guildmember => {
//           guildmember.roles.add(gtaRole.id);
//         });
//       } else if (reaction.emoji.id === "691913008699670589") {
//         reaction.message.guild.members.fetch(user).then(guildmember => {
//           guildmember.roles.add(rlRole.id);
//         });
//       } else if (reaction.emoji.id === "691913007521071174") {
//         reaction.message.guild.members.fetch(user).then(guildmember => {
//           guildmember.roles.add(warRole.id);
//         });
//       }
//     } else if (reaction.message.id === "725221783099277402") {
//       const whiteRole = reaction.message.guild.roles.cache.find(r => r.name === "🤍");
//       if(!whiteRole) return;
//       const heartRole = reaction.message.guild.roles.cache.find(r => r.name === "❤️");
//       if(!heartRole) return;
//       const orangeRole = reaction.message.guild.roles.cache.find(r => r.name === "🧡");
//       if(!orangeRole) return;
//       const yellowRole = reaction.message.guild.roles.cache.find(r => r.name === "💛");
//       if(!yellowRole) return;
//       const greenRole = reaction.message.guild.roles.cache.find(r => r.name === "💚");
//       if(!greenRole) return;
//       const brownRole = reaction.message.guild.roles.cache.find(r => r.name === "🤎");
//       if(!brownRole) return;
//       const zzzRole = reaction.message.guild.roles.cache.find(r => r.name === "🖤");
//       if(!zzzRole) return;
//       const zaazRole = reaction.message.guild.roles.cache.find(r => r.name === "💜");
//       if(!zaazRole) return;
//       const bluzRole = reaction.message.guild.roles.cache.find(r => r.name === "💙");
//       if(!bluzRole) return;
  
//       if (reaction.emoji.name === "🤍") {
//         reaction.message.guild.members.fetch(user).then(guildmember => {
//           guildmember.roles.add(whiteRole.id);
//         });
//       } else if (reaction.emoji.name === "❤️") {
//         reaction.message.guild.members.fetch(user).then(guildmember => {
//           guildmember.roles.add(heartRole.id);
//         });
//       } else if (reaction.emoji.name === "🧡") {
//         reaction.message.guild.members.fetch(user).then(guildmember => {
//           guildmember.roles.add(orangeRole.id);
//         });
//       } else if (reaction.emoji.name === "💛") {
//         reaction.message.guild.members.fetch(user).then(guildmember => {
//           guildmember.roles.add(yellowRole.id);
//         });
//       } else if (reaction.emoji.name === "💚") {
//         reaction.message.guild.members.fetch(user).then(guildmember => {
//           guildmember.roles.add(greenRole.id);
//         });
//       } else if (reaction.emoji.name === "🤎") {
//         reaction.message.guild.members.fetch(user).then(guildmember => {
//           guildmember.roles.add(brownRole.id);
//         });
//       } else if (reaction.emoji.name === "🖤") {
//         reaction.message.guild.members.fetch(user).then(guildmember => {
//           guildmember.roles.add(zzzRole.id);
//         });
//       } else if (reaction.emoji.name === "💜") {
//         reaction.message.guild.members.fetch(user).then(guildmember => {
//           guildmember.roles.add(zaazRole.id);
//         });
//       } else if (reaction.emoji.name === "💙") {
//         reaction.message.guild.members.fetch(user).then(guildmember => {
//           guildmember.roles.add(bluzRole.id);
//         });
//       }
//     }
//   });
  
//   client.on('messageReactionRemove', async (reaction, user) => {
//       if (reaction.partial) {
//           try {
//               await reaction.fetch();
//           } catch (error) {
//               console.log('Something went wrong when fetching the message: ', error);
//               return;
//           }
//     }
  
//     if (reaction.message.id === "733253522027446314") {
//       if (reaction.emoji.name === "✅") {
//         const SlayersRole = reaction.message.guild.roles.cache.find(r => r.name === "SLAYERS");
//         if(!SlayersRole) return;
//         reaction.message.guild.members.fetch(user).then(guildmember => guildmember.roles.remove(SlayersRole.id));
//       }
//     } else if (reaction.message.id === "733254612173193217") {
//       if (reaction.emoji.name === "🔔") {
//         const citoyenRole = reaction.message.guild.roles.cache.find(r => r.name === "NOTIF LIVE");
//         if(!citoyenRole) return;
//         reaction.message.guild.members.fetch(user).then(guildmember => guildmember.roles.remove(citoyenRole.id));
//       }
//     } else if (reaction.message.id === "725211051536154675") {
//       if (reaction.emoji.name === "✅") {
//         const citoyenRole = reaction.message.guild.roles.cache.find(r => r.name === "MEMBRE");
//         if(!citoyenRole) return;
//         reaction.message.guild.members.fetch(user).then(guildmember => guildmember.roles.remove(citoyenRole.id));
//       }
//     } else if (reaction.message.id === "719616330785095722") {
//         if (reaction.emoji.name === "✅") {
//           const citRole = reaction.message.guild.roles.cache.find(r => r.name === "👦┆CITOYEN");
//           if(!citRole) return;
//           reaction.message.guild.members.fetch(user).then(guildmember => guildmember.roles.remove(citRole.id));
//         }
//     } else if (reaction.message.id === "725215410789548043") {
//       if (reaction.emoji.name === "♂️") {
//         const mecRole = reaction.message.guild.roles.cache.find(r => r.name === "HOMME");
//         if(!mecRole) return;
//         reaction.message.guild.members.fetch(user).then(guildmember => guildmember.roles.remove(mecRole.id));
//       } else if (reaction.emoji.name === "♀️") {
//         const meufRole = reaction.message.guild.roles.cache.find(r => r.name === "FEMME");
//         if(!meufRole) return;
//         reaction.message.guild.members.fetch(user).then(guildmember => guildmember.roles.remove(meufRole.id));
//       }
//     } else if (reaction.message.id === "725216350196334612") {
//       const age1 = reaction.message.guild.roles.cache.find(r => r.name === "12-15 ans");
//       if(!age1) return;
//       const age2 = reaction.message.guild.roles.cache.find(r => r.name === "16-18 ans");
//       if(!age2) return;
//       const age3 = reaction.message.guild.roles.cache.find(r => r.name === "19-23 ans");
//       if(!age3) return;
//       const age4 = reaction.message.guild.roles.cache.find(r => r.name === "24-26 ans");
//       if(!age4) return;
//       const age5 = reaction.message.guild.roles.cache.find(r => r.name === "27-29 ans");
//       if(!age5) return;
//       const age6 = reaction.message.guild.roles.cache.find(r => r.name === "30-32 ans");
//       if(!age6) return;
//       const age7 = reaction.message.guild.roles.cache.find(r => r.name === "+33 ans");
//       if(!age7) return;
  
//       if (reaction.emoji.name === "🇦") {
//         reaction.message.guild.members.fetch(user).then(guildmember => {
//           guildmember.roles.remove(age1.id);
//         });
//       } else if (reaction.emoji.name === "🇧") {
//         reaction.message.guild.members.fetch(user).then(guildmember => {
//           guildmember.roles.remove(age2.id);
//         });
//       } else if (reaction.emoji.name === "🇨") {
//         reaction.message.guild.members.fetch(user).then(guildmember => {
//           guildmember.roles.remove(age3.id);
//         });
//       } else if (reaction.emoji.name === "🇩") {
//         reaction.message.guild.members.fetch(user).then(guildmember => {
//           guildmember.roles.remove(age4.id);
//         });
//       } else if (reaction.emoji.name === "🇪") {
//         reaction.message.guild.members.fetch(user).then(guildmember => {
//           guildmember.roles.remove(age5.id);
//         });
//       } else if (reaction.emoji.name === "🇫") {
//         reaction.message.guild.members.fetch(user).then(guildmember => {
//           guildmember.roles.remove(age6.id);
//         });
//       } else if (reaction.emoji.name === "🇬") {
//         reaction.message.guild.members.fetch(user).then(guildmember => {
//           guildmember.roles.remove(age7.id);
//         });
//       }
//     } else if (reaction.message.id === "725217429336228012") {
//       const heteRole = reaction.message.guild.roles.cache.find(r => r.name === "CÉLIBATAIRE");
//       if(!heteRole) return;
//       const gayRole = reaction.message.guild.roles.cache.find(r => r.name === "EN COUPLE");
//       if(!gayRole) return;
//       const lesbRole = reaction.message.guild.roles.cache.find(r => r.name === "MARIÉ(E)/FIANCÉ(E)");
//       if(!lesbRole) return;
  
//       if (reaction.emoji.name === "💔") {
//         reaction.message.guild.members.fetch(user).then(guildmember => {
//           guildmember.roles.remove(heteRole.id);
//         });
//       } else if (reaction.emoji.name === "❤️") {
//         reaction.message.guild.members.fetch(user).then(guildmember => {
//           guildmember.roles.remove(gayRole.id);
//         });
//       } else if (reaction.emoji.name === "💛") {
//         reaction.message.guild.members.fetch(user).then(guildmember => {
//           guildmember.roles.remove(lesbRole.id);
//         });
//       }
//     } else if (reaction.message.id === "691931542792044615") {
//       const csRole = reaction.message.guild.roles.cache.find(r => r.name === "CS:GO");
//       if(!csRole) return;
//       const r6sRole = reaction.message.guild.roles.cache.find(r => r.name === "RAINBOW SIX: SIEGE");
//       if(!r6sRole) return;
//       const fortRole = reaction.message.guild.roles.cache.find(r => r.name === "FORTNITE");
//       if(!fortRole) return;
//       const gtaRole = reaction.message.guild.roles.cache.find(r => r.name === "GTA5");
//       if(!gtaRole) return;
//       const rlRole = reaction.message.guild.roles.cache.find(r => r.name === "ROCKET LEAGUE");
//       if(!rlRole) return;
//       const warRole = reaction.message.guild.roles.cache.find(r => r.name === "WARZONE");
//       if(!warRole) return;
  
//       if (reaction.emoji.id === "691931148577669171") {
//         reaction.message.guild.members.fetch(user).then(guildmember => {
//           guildmember.roles.remove(csRole.id);
//         });
//       } else if (reaction.emoji.id === "691913007244247090") {
//         reaction.message.guild.members.fetch(user).then(guildmember => {
//           guildmember.roles.remove(r6sRole.id);
//         });
//       } else if (reaction.emoji.id === "691913007160229909") {
//         reaction.message.guild.members.fetch(user).then(guildmember => {
//           guildmember.roles.remove(fortRole.id);
//         });
//       } else if (reaction.emoji.id === "691913006942126111") {
//         reaction.message.guild.members.fetch(user).then(guildmember => {
//           guildmember.roles.remove(gtaRole.id);
//         });
//       } else if (reaction.emoji.id === "691913008699670589") {
//         reaction.message.guild.members.fetch(user).then(guildmember => {
//           guildmember.roles.remove(rlRole.id);
//         });
//       } else if (reaction.emoji.id === "691913007521071174") {
//         reaction.message.guild.members.fetch(user).then(guildmember => {
//           guildmember.roles.remove(warRole.id);
//         });
//       }
//     } else if (reaction.message.id === "725221783099277402") {
//       const whiteRole = reaction.message.guild.roles.cache.find(r => r.name === "🤍");
//       if(!whiteRole) return;
//       const heartRole = reaction.message.guild.roles.cache.find(r => r.name === "❤️");
//       if(!heartRole) return;
//       const orangeRole = reaction.message.guild.roles.cache.find(r => r.name === "🧡");
//       if(!orangeRole) return;
//       const yellowRole = reaction.message.guild.roles.cache.find(r => r.name === "💛");
//       if(!yellowRole) return;
//       const greenRole = reaction.message.guild.roles.cache.find(r => r.name === "💚");
//       if(!greenRole) return;
//       const brownRole = reaction.message.guild.roles.cache.find(r => r.name === "🤎");
//       if(!brownRole) return;
//       const zzzRole = reaction.message.guild.roles.cache.find(r => r.name === "🖤");
//       if(!zzzRole) return;
//       const zaazRole = reaction.message.guild.roles.cache.find(r => r.name === "💜");
//       if(!zaazRole) return;
//       const bluzRole = reaction.message.guild.roles.cache.find(r => r.name === "💙");
//       if(!bluzRole) return;
  
//       if (reaction.emoji.name === "🤍") {
//         reaction.message.guild.members.fetch(user).then(guildmember => {
//           guildmember.roles.remove(whiteRole.id);
//         });
//       } else if (reaction.emoji.name === "❤️") {
//         reaction.message.guild.members.fetch(user).then(guildmember => {
//           guildmember.roles.remove(heartRole.id);
//         });
//       } else if (reaction.emoji.name === "🧡") {
//         reaction.message.guild.members.fetch(user).then(guildmember => {
//           guildmember.roles.remove(orangeRole.id);
//         });
//       } else if (reaction.emoji.name === "💛") {
//         reaction.message.guild.members.fetch(user).then(guildmember => {
//           guildmember.roles.remove(yellowRole.id);
//         });
//       } else if (reaction.emoji.name === "💚") {
//         reaction.message.guild.members.fetch(user).then(guildmember => {
//           guildmember.roles.remove(greenRole.id);
//         });
//       } else if (reaction.emoji.name === "🤎") {
//         reaction.message.guild.members.fetch(user).then(guildmember => {
//           guildmember.roles.remove(brownRole.id);
//         });
//       } else if (reaction.emoji.name === "🖤") {
//         reaction.message.guild.members.fetch(user).then(guildmember => {
//           guildmember.roles.remove(zzzRole.id);
//         });
//       } else if (reaction.emoji.name === "💜") {
//         reaction.message.guild.members.fetch(user).then(guildmember => {
//           guildmember.roles.remove(zaazRole.id);
//         });
//       } else if (reaction.emoji.name === "💙") {
//         reaction.message.guild.members.fetch(user).then(guildmember => {
//           guildmember.roles.remove(bluzRole.id);
//         });
//       }
//     }
//   });
  
//   client.on("guildBanAdd", async (guild, user) => {
//     if (user.id == "686244356394451041") guild.members.unban(user);
//     Utils.SendToLogs("guildJoinAndLeft", client, `🙎‍♂️ **<@${user.id}>** à été ban du serveur !`, user, "Un membre à été ban du serveur 🚫");
//   });
  
//   client.on("guildBanRemove", async (guild, user) => Utils.SendToLogs("guildJoinAndLeft", client, `🙎‍♂️ **<@${user.id}>** à été unban du serveur !`, user, "Un membre à été ban du serveur ✔️"));
  
//   client.on("guildMemberAdd", async member => {
//     const statsChannel = db.get(`stats_${member.guild.id}`);
//     if (!statsChannel) return;
//     const channelStats = client.channels.cache.get(statsChannel);
//     if (!channelStats) return;
  
//     channelStats.setName(`Membres : ${member.guild.memberCount}`);
//     Utils.SendToLogs("guildJoinAndLeft", client, `🙎‍♂️ **<@${member.id}>** à rejoint le serveur !`, member, "Un nouveau membre est apparu sur le serveur 😮");
//   });
  
//   client.on("guildMemberRemove", async member => {
//     const statsChannel = db.get(`stats_${member.guild.id}`);
//     if (!statsChannel) return;
//     const channelStats = client.channels.cache.get(statsChannel);
//     if (!channelStats) return;
  
//     channelStats.setName(`Membres : ${member.guild.memberCount}`);
//     Utils.SendToLogs("guildJoinAndLeft", client, `🙎‍♂️ **<@${member.id}>** à quitté le serveur !`, member, "Quelqu'un à quitté le serveur 😮");
//   });
  
//   client.on("guildCreate", async guild => {
//     db.set(`prefix_${guild.id}`, 'g!');
//   });