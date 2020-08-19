
const talkedRecently = new Set();
let slott = new Set();
const ms = require("ms")
const talky = new Set();
const mommy = new Set();
const talk2 = new Set();
const talk3 = new Set();
const sterCD = new Set();
const energyCD = new Set();
const gateCD = new Set();
const packCD = new Set();
const data = require("./config.json");
const Discord = require('discord.js');
const client = new Discord.Client();
const moment = require("moment")
const momenty = require("moment-timezone")
var momentDurationFormatSetup = require("moment-duration-format");
const fs = require("fs")
const imgur = require("imgur")
const db = require("quick.db")
const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
client.useCount = ("./config.json")
const profanity = data.curses
const bot = new Discord.Client({disableEveryone: true});

const { Client, MessageAttachment } = require('discord.js');
client.login(process.env.TOKEN)

let prefix = "s!";
client.on('message', async message => {
  const args = message.content.slice(prefix.length).trim().split(' ')
  const cmd = args.shift().toLowerCase()
  if (cmd == 'setprefix') {
    let dprefix = "l!"
    let nprefix = db.get(`prefix_${message.guild.id}`)
    if (nprefix == null) nprefix = dprefix
    if (!args[0]) {
      return message.channel.send('You need to provide a prefix...')
      db.set(`prefix_${message.guild.id}`, args[0])
      message.channel.send(`I set this guild's prefix to.. \`${args[0]}\``)
    }
  }
})

client.on('message', message => {
  if (message.author.bot)return;
  let msg = message.content.toLowerCase()
 if (msg === `${prefix}prefix`) {
   message.channel.send(`My prefix is  **__${prefix}__**`)
 }
});
client.on("message", message => { // EventEmitter
  if (!message.content.startsWith(prefix) || message.author.bot)return;
  const args = message.content.slice(prefix.length).trim().split(' ')
  const command = args.shift().toLowerCase()
  if(command == "ping")  {
			message.channel.send(`${(Date.now() - message.createdTimestamp)}ms`) 
  }
})

  client.on('message', async message =>  {
    if (!message.content.startsWith(prefix) || message.author.bot)return;
    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase()
    if (command == 'stats') {
      const servercount = client.guilds.cache.size
      const users = client.users.cache.size
      let embed = new Discord.MessageEmbed()
      .setTitle(`Stats on ${client.user.username}!`)
      .addField("Users Watching", users, true)
      .addField("Servers I'm in", servercount, true)
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .setTimestamp()
      message.channel.send(embed)
    }
  })
  
client.on('message', message => {
  if (message.author.bot)return;
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
  if (command === 'serverinfo' || command === 'si') {
    const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
    let embed = new Discord.MessageEmbed()
    .setTitle(`Info on ${message.guild.name}`)
    .setAuthor(message.guild.name)
    .addField("**Members:**", `${message.guild.memberCount}`, true)
    .addField("**Server ID**", `${message.guild.id}`, true)
    .addField("**Roles**", `${roles.length}`, true)
    .addField("**Owner**", `${message.guild.owner}`, true)
    .addField("**Owner ID**", `${message.guild.ownerID}`, true)
    .addField("**Server Boosts**", `${message.guild.premiumSubscriptionCount}`, true)
    .addField("**Boost Tier**", `${message.guild.premiumTier}`, true)
    .addField("**Region**", `${message.guild.region}`, true)
    .addField("**Created at**", `${moment(message.guild.createdTimestamp).format('L')}\n${moment(message.guild.createdTimestamp).fromNow()}`, true)
    .setColor('#0000FF')
    .setThumbnail(message.guild.iconURL())
  message.channel.send(embed)
  }
});

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return;
const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
  const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(member => member.user.username == args[0]) || message.member
  const av = member.user.displayAvatarURL({size: 1024});
 if (command === 'info' || command === 'i') {
   let embed = new Discord.MessageEmbed()
   .setTitle(`Info on ${member.user.username}`)
   .setDescription(`[Avatar](${av})`)
   .addField("**Username**", `${member.user.username}`, true)
   .addField("**Discriminator**", `${member.user.discriminator}`, true)
   .addField("**Created at**", `${moment(member.user.createdTimestamp).format('L')}\n${moment(member.user.createdTimestamp).fromNow()}`, true)
   .addField("**Tag**", `${member.user.tag}`, true)
   .addField("**Joined At**", `${moment(member.joinedAt).format('L')}\n${moment(member.joinedAt).fromNow()}`, true)
   .setFooter(`ID: ${member.user.id}`)
   .setThumbnail(av)
   .setColor(member.displayHexColor)
   .setTimestamp();
  message.channel.send(embed)
    }
  
});

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return;
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
  const pargs = message.content.slice(prefix.length).slice(command.length);
  if (command === '8ball') {
    if (!args.length)return message.reply("You didn't ask a question!") 
  let replies = ["Yes", "No", "No no no.... No!!", "Of course", "100%", "Maybe...", "Ask me later!", "I asked my mom, she said no", "Honestly I could care less", "I guess"]
  let result = Math.floor(Math.random() * replies.length)
  let embed = new Discord.MessageEmbed()
        .setDescription(`Question: **${pargs}**\nAnswer: **${replies[result]}**`)
        .setColor(message.member.displayHexColor)
        .setThumbnail(message.author.displayAvatarURL())
    .setTimestamp()
  message.channel.send(embed)
    }
});

client.on('ready', () => {
console.log(`${client.user.username} Is up and running!`)
});


client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return;
       const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
  if (command === 'kick') {    if (!message.member.hasPermission('KICK_MEMBERS'))return message.reply('You dont have kick perms!')
   if (!message.mentions.users.first())return message.reply('You need to actually mention someone!')
    const member = message.mentions.members.first();
        const user = message.mentions.users.first() || message.guild.users.cache.get(args[0])
    const kreason = args.join(" ").slice(22);
    let urole = member.roles.highest.position
   let mrole = message.member.roles.highest.position
   if (user.id == message.guild.ownerID)return message.channel.send('You cant kick the owner!')
   if (urole >= mrole)return message.channel.send('That user is above you in the hierarchy!')
    if (!kreason)return message.reply(`You didn't specify a reason to kick ${member}`)
     member.kick().then(() => {
    message.channel.send(`**${message.mentions.members.first()}** Successfully kicked! **Reason:** ${kreason}`)
    
  }).catch(err => {
      message.channel.send("I wasn't able to kick that user!")
    }).then(() => {
      user.send(`You were kicked in **${message.guild.name}**. **Reason**: ${kreason}`)
    })
    } 
});

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return;
       const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
  if (command === 'ban') {
    let user = message.mentions.members.first() || message.guild.members.cache.get()
    if (!message.member.hasPermission('BAN_MEMBERS'))return message.reply('You dont have ban perms!')
   if (!user)return message.channel.send('That isn\'t a valid user!')
   let urole = user.roles.highest.position
   let mrole = message.member.roles.highest.position
   if (user.id == message.guild.ownerID)return message.channel.send('You cant ban the owner!')
   if (urole >= mrole)return message.channel.send('That user is above you in the hierarchy!')
    let breason = args.join(" ").slice(22);
    if (!breason) breason = "None"
  message.guild.member(user).ban({reason: breason, days: 2}).then(() => {
    message.channel.send(`**${user}** Succesfully banned! **Reason:**${breason}`)
      
    
  }).catch(err => {
      message.channel.send("I wasn't able to ban that user!")
    })
    } 
});
client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return;
   const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
  if (command === 'echo') {
    var chan = message.mentions.channels.first();
    if (!args[0])return message.reply('You need to specify a channel!');
    if (!args[1])return message.reply ('You need to provide a message to send in that channel');
    var par = client.channels.cache.get(chan.id)
    var thing = args.join(" ").slice(22);
   par.send(thing) 
  
  }
});

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return;
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
  if (command === 'unban') {
    let user = args[0]
        const breason = args.join(" ").slice(22);
  if (!message.member.hasPermission('BAN_MEMBERS'))return message.reply('Nice try, you dont have ban perms though!');
    if (!user)return message.rey('You need to specifiy a user id!')
      let bchan = client.channels.cache.find(channel => channel.name === 'log' || channel.name === 'logs' || channel.name === 'audit-logs');    
    if (!bchan)return message.channel.send('I was unable to find the log channel, make sure it is named `log`, `logs`, or `audit-logs`')
    let bembed = new Discord.MessageEmbed()
      .setTitle(`${user} Was Unbanned`)
      .addField("**ID:**", `${user.id}`, false)
      .addField("**Unbanned in:**", `${message.channel.id}`, false)
      .addField("**Unbanned by**:", `${message.author.tag}`, false)
  .setTimestamp();
    message.guild.members.unban(user).then(() => {
          message.channel.send(`Successfully Unbanned!`)
    }).catch(err => {
      message.channel.send('I was unable to unban that user')
    }).then(() => {
      bchan.send(bembed)
    })
   
  }
});


client.on('messageDelete', message => {
    if (message.author.bot)return;

  var con = message.content
var user = message.author.tag
var icon = message.author.displayAvatarURL()
client.on('message', async message => {
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
if (command === 'snipe') {
      if (!con)return message.reply('There is nothing to snipe')
  let embed =  await new Discord.MessageEmbed()
      .setAuthor(`${user}`, icon)
      .setDescription(con)
      .setColor(message.member.displayHexColor)
  .setTimestamp()
 await message.channel.send(embed)
}
});
  });



const randomPuppy = require("random-puppy")


client.on('message', async message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return;
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
if (command === 'purge' || command === 'pu') {
if (!message.member.hasPermission('ADMINISTRATOR') || !message.member.hasPermission('MANAGE_GUILD'))return message.channel.send('You cant use this command dumbo');
  if(!args[0])return message.channel.send('You need to tell me how many messages you want to purge!');
  if (args[0] > 100) {
    return message.channel.send('You can only purge up to 100 messages!')
  }
  message.delete().then(() => {
  message.channel.bulkDelete(args[0])
})
    let msg = await message.channel.send(`Successfully purged ${args} messages`)
      message.delete().catch(err => {
    ('I was unable to delete those messages')
  });
msg.delete({ timeout: 5000})
}
})

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return;
const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
if (command === 'clap') {
  const pargs = message.content.slice(prefix.length).slice(command.length);
  const targs = pargs.replace(/\s/g, ' 👏 ') //HimynameisFlavio
  if (!args[0])return message.channel.send('You need to specify a message!');
  message.channel.send(targs)

}
})

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return;
const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
if (command === 'space') {
  const pargs = args.join(" ")
  const emoji = args[0];
  const targs = pargs.slice(1, pargs.length - 1).replace(/\s/g, ` ${emoji} `) //HimynameisFlavio
  if (!args[0])return message.channel.send('You need to specify what to space your message with!');
  if (!args[1] || !args[2] || !args[3])return message.channel.send('You need to specify a message!');
  message.channel.send(targs)

}
})

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return;
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
if (command === 'fruit') {
  var emoji = [" 🍏 ", " 🍎 ", " 🥝 ", " 🍌 ", " 🍒 ", " 🍇 ", " 🍑 ", " 🍐 "];
var emojii = Math.floor(Math.random() * emoji.length)
  const pargs = message.content.slice(prefix.length).slice(command.length);
  const targs = pargs.replace(/\s/g, `${emoji[emojii]}`) //HimynameisFlavio
  if (!args[0])return message.channel.send('You need to specify a message!');
  message.channel.send(targs)

}
})

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return;
   const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
if (command === 'random') {
  let NewAr = Array.prototype.slice.call(args);
  let tar = Math.floor(Math.random() * NewAr.length)
  if(!args[0])return message.reply('You need to give me 2 elements!')
  if(!args[1])return message.reply('You need to give me 2 elements!')
  message.channel.send(NewAr[tar])
}
})

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return;
   const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
if (command === 'help') {
let embed = new Discord.MessageEmbed()
    .setTitle(`Utility Commands for ${message.client.user.username}`)
    .setThumbnail(message.client.user.displayAvatarURL())
    .setDescription("`info/i` - Gives you some info on a user your specify\n`serverinfo/si` - Gives you some info on the server\n`ping` - Just to check if the bot is alive\n`prefix` - Get the bot's prefix\n`avatar/av` - Get a user's avatar\n`math/calc/calculate` - Does some math for you!\n`suggest` - Make a suggestion!\n`suggestionchannel/suggestion-channel` - Set's your suggestion channel!\n`lvl/level/rank` - Get your level and XP!\n`color` - Get some neat info on a hex color!")
    .setColor(message.member.displayHexColor)
    .setAuthor(message.author.tag, message.author.displayAvatarURL())
    .setFooter('Made by `ThatGuyTino#5390`')
   .setTimestamp()
    let embed2 = new Discord.MessageEmbed()
    .setTitle(`Fun Commands for ${message.client.user.username}`)
    .setDescription("`8ball` - Just a normal old 8ball command\n`clap` - Replaces all the spaces in your message with 👏\n`fruit` - Replaces all the spaces in your message with a random fruit emoji\n`space` - Replaces all the spaces in your message with a emoji you specify\n`echo` - Send a message in a channel you want!\n`snipe` - Returns the latest delete message(s)\n`random` - Picks a random element from the elements you specify\n`howgay/howgayis` - Get a user's gay percentage\n`meme` - Gives you a quality meme from r/dank\n`lenny` - Gives you a random lenny face\n`argscount/argslength` - Counts the amount of arguments you specified\n`invite` - Bot's invite link\n`qoute` - Gives you a random qoute")
    .setColor(message.member.displayHexColor)
    .setAuthor(message.author.tag, message.author.displayAvatarURL())
    .setFooter('Made by `ThatGuyTino#5390`')
    .setTimestamp()
    let embed3 = new Discord.MessageEmbed()
    .setTitle(`Animal Commands for ${message.client.user.username}`)
    .setDescription("`cat` - Gives you a random cat picture\n`catbomb` - Gives you 4 random cat images\n`monkey` - Gives you a random monkey image\n`monkeybomb` - Gives you 4 random monkey pictures\n`aww` - Gives you a picture of a cute animal\n`awwbomb` - Gives you 4 random pictures of a cute animal(s)\n`awwnuke` - A lot of cuteness, must be used in <#703021278982045716> for it to work\n`dog` - Gives you a random dog image\n`dogbomb` - Gives your 4 random dog images\n`ferret` - Gives you a random ferret image\n`ferretbomb` - Gives you 4 random ferret images")
    .setColor(message.member.displayHexColor)
    .setAuthor(message.author.tag, message.author.displayAvatarURL())
    .setFooter('Made by `ThatGuyTino#5390`')
    .setTimestamp()
    let embed4 = new Discord.MessageEmbed()
    .setTitle(`Economy Commands for ${message.client.user.username}`)
    .setDescription("`work` - Get to working!\n`job` - Get a job!\n`inv\\inventory` - Check your inventory\n`shop` - Shows you the shop, follow the comamnd with an item to buy it, like this `l!shop pig`\n`use`- Use an item\n`bet` - A chance to lose your money, and a chance to double it\n`swordfight/sf` - Swordfight somebody, you need to have a sword though...\n`bal/balance` - Check your balance\n`remove` - Remove an item from your inventory!\n`work-info` - Shows some neat info on you!\n`add-money` - Adds money to a user, you need administrator to use this command\n`slots` - Slots!!\n`daily` - Get your daily money!\n`rob/mug` - Rob someone!\n`kill` - Kill somebody, you need to be a hitman to use this\n`strength` - Get your strength!\n`fight` - Fight someone for money, the user with the highest strength wins!\n`workout` - Work out to get more strength to fight!")
    .setColor(message.member.displayHexColor)
    .setAuthor(message.author.tag, message.author.displayAvatarURL())
    .setFooter('Made by `ThatGuyTino#5390`')
    let embed5 = new Discord.MessageEmbed()
    .setTitle(`Moderation commands for ${message.client.user.username}`)
    .setDescription("`ban` - Bans a user\n`kick` - Kicks a member\n`unban` - Unbans a member\n`purge` - Deletes the amount of messages you specify\n`softban` - Quickly bans then unbans the user\n`mute` - Make a user unable to talk for a specific duration\n`tempban\\temp-ban` - Ban a user for a specified duration\n`censor` - Blacklist words in your server! Run `l!censor help` to get all the subcommands.\n`warn` - Warn a user!\n`warn-case\\warncase` - Get some neat info on a warn case!")
    .setColor(message.member.displayHexColor)
    .setAuthor(message.author.tag, message.author.displayAvatarURL())
    .setFooter('Made by `ThatGuyTino#5390`')
.setTimestamp()
message.react('🥔')
message.channel.send('You\'ve been sent a direct message!')
if (args[0] === 'utility') {
  message.author.send(embed)
} else if (args[0] === 'fun') {
  message.author.send(embed2)
} else if (args[0] == 'animal') {
  message.author.send(embed3)
} else if (args[0] == 'economy') {
  message.author.send(embed4)
} else if (args[0] == 'moderation') {
  message.author.send(embed5)
} else {
  message.author.send("Due to discord's character limit, I can not send you all of the commands at once, so to get the commands you will have to have to follow the help command with one of these option\n`moderation`, `utility`, `economy`, `fun`, or `animal`. Example.. `l!help moderation`")
}
}
})

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return;
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
if (command === 'howgay' || command === 'howgayis') {
  const member = message.mentions.members.first() || message.member;
const gayness = Math.floor(Math.random() * 100) + 1;
  let embed = new Discord.MessageEmbed()
    .setTitle(`${member.user.username}'s Gay percentage`)
    .setDescription(`${gayness}%`)
    .setAuthor(member.user.tag, member.user.displayAvatarURL('gif'))
    .setTimestamp()
  message.channel.send(embed)

}
})

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return;
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
  if (command === 'softban') {
    if (!message.member.hasPermission('BAN_MEMBERS'))return message.channel.send('You cant use this command dumbo');
    let user = message.mentions.users.first()
    if (!user)return message.channel.send('You need to mention the user you want to softban!');
    let urole = user.roles.highest.position
    let mrole = message.member.roles.highest.position
    if (user.id == message.guild.ownerID)return message.channel.send('You cant ban the owner!')
    if (urole >= mrole)return message.channel.send('That user is above you in the hierarchy!')
   message.guild.member(user).ban({ days: 2}).then(() => {
      message.guild.members.unban(user)
    }).then(() => {
     message.channel.send(`Successfully softbanned ${user}`)
    })

  }
})

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return;
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
if (command === 'meme') {
  var pup = randomPuppy('meme').then(url => {
    console.log(url)
      message.channel.send(url)
  })

}
})

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return;
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
if (command === 'dog') {
    var pup = randomPuppy('dogpictures').then(url => {
    console.log(url)
      
  })

}
})

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return;
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
if (command === 'ferret') {
    var pup = randomPuppy('ferrets').then(url => {
    console.log(url)
       
            message.channel.send(url)
  
   })  

}
})

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return;
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
if (command === 'dogbomb') {
    var pup = randomPuppy('dogpictures').then(turl => {
    console.log(turl)
        var pup = randomPuppy('dogpictures').then(yurl => {
    console.log(yurl)
            var pup = randomPuppy('dogpictures').then(purl => {
    console.log(purl)
                var pup = randomPuppy('dogpictures').then(furl => {
    console.log(furl)
              message.channel.send(turl)
              message.channel.send(yurl)
              message.channel.send(purl)
              message.channel.send(furl)
                  
                })
                })
            })
        })
    }
});

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return;
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
if (command === 'ferretbomb') {
    var pup = randomPuppy('ferrets').then(turl => {
    console.log(turl)
        var pup = randomPuppy('ferrets').then(yurl => {
    console.log(yurl)
            var pup = randomPuppy('ferrets').then(purl => {
    console.log(purl)
                var pup = randomPuppy('ferrets').then(furl => {
    console.log(furl)
              message.channel.send(turl)
              message.channel.send(yurl)
              message.channel.send(purl)
              message.channel.send(furl)
                  
                })
                })
            })
        })
    }
});

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return;
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
  const member = message.mentions.members.first() || message.member;
if (command === 'avatar' || command === 'av') {
  let png = member.user.displayAvatarURL({format: "png"})
  let jpg = member.user.displayAvatarURL({size: 1024, dynamic: true, format: 'jpg'})
  let webp = member.user.displayAvatarURL({size: 1024, dynamic: true, format: 'webp'})
  let embed = new Discord.MessageEmbed()
    .setTitle(`${member.user.tag}'s Avatar'`)
    .setDescription(`[png](${png}) | [jpg](${jpg}) | [webp](${webp})`)
    .setImage(member.user.displayAvatarURL({size: 1024, dynamic: true}))
    .setURL(member.user.displayAvatarURL({size: 1024, dynamic: true}))
  message.channel.send(embed)
}
})

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return;
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
if (command === 'cat') {
    var pup = randomPuppy('cat').then(url => {
    console.log(url)
       
            message.channel.send(url)
  
   })  

}
})

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return;
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
if (command === 'monkey') {
    var pup = randomPuppy('monkeys').then(url => {
    console.log(url)
       
            message.channel.send(url)
  
   })  

}
})

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return;
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
if (command === 'catbomb') {
    var pup = randomPuppy('cats').then(turl => {
    console.log(turl)
        var pup = randomPuppy('cats').then(yurl => {
    console.log(yurl)
            var pup = randomPuppy('cats').then(purl => {
    console.log(purl)
                var pup = randomPuppy('cats').then(furl => {
    console.log(furl)
              message.channel.send(turl)
              message.channel.send(yurl)
              message.channel.send(purl)
              message.channel.send(furl)
                  
                })
                })
            })
        })
    }
});

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return;
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
if (command === 'monkeybomb') {
    var pup = randomPuppy('monkeys').then(turl => {
    console.log(turl)
        var pup = randomPuppy('monkeys').then(yurl => {
    console.log(yurl)
            var pup = randomPuppy('monkeys').then(purl => {
    console.log(purl)
                var pup = randomPuppy('monkeys').then(furl => {
    console.log(furl)
              message.channel.send(turl)
              message.channel.send(yurl)
              message.channel.send(purl)
              message.channel.send(furl)
                  
                })
                })
            })
        })
    }
});

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return;
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
if (command === 'aww') {
    var pup = randomPuppy('aww').then(url => {
    console.log(url)
       
            message.channel.send(url)
  
   })  

}
})

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return;
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
if (command === 'awwbomb') {
    var pup = randomPuppy('aww').then(turl => {
    console.log(turl)
        var pup = randomPuppy('aww').then(yurl => {
    console.log(yurl)
            var pup = randomPuppy('aww').then(purl => {
    console.log(purl)
                var pup = randomPuppy('aww').then(furl => {
    console.log(furl)
              message.channel.send(turl)
              message.channel.send(yurl)
              message.channel.send(purl)
              message.channel.send(furl)
                  
                })
                })
            })
        })
    }
});

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return;
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
if (command === 'awwnuke') {
    var pup = randomPuppy('aww').then(turl => {
    console.log(turl)
        var pup = randomPuppy('aww').then(yurl => {
    console.log(yurl)
            var pup = randomPuppy('aww').then(purl => {
    console.log(purl)
                var pup = randomPuppy('aww').then(furl => {
    console.log(furl)
                  var pup = randomPuppy('aww').then(curl => {
    console.log(curl)
                    var pup = randomPuppy('aww').then(zurl => {
    console.log(zurl)
                      var pup = randomPuppy('aww').then(vurl => {
    console.log(vurl)
                     var pup = randomPuppy('aww').then(tino => {
    console.log(tino)
                          var pup = randomPuppy('aww').then(mush => {
    console.log(mush)
                            var pup = randomPuppy('aww').then(beast => {
    console.log(beast)

              message.channel.send(turl)
              message.channel.send(yurl)
              message.channel.send(purl)
              message.channel.send(furl)
              message.channel.send(curl)
              message.channel.send(zurl)
              message.channel.send(vurl)
              message.channel.send(tino)
              message.channel.send(mush)
              message.channel.send(beast)
                      })
                      })
                    })
                     })
                      })
                    })
                  
                })
                })
            })
        })
    }
});

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return;
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
if (command === 'lenny') {
  let lennies = ["( ͡° ͜ʖ ͡°)", "(╭☞⨶ᴥ⨶)╭☞", "⎝■~■⎠", "(⨴ꔢ⨵)", "(⍜⏠⍜)╭∩╮", "(づ⨱ل͜⨱)づ", "(╭☞ཀヮཀ)╭☞", "─=≡Σᕕ(꘠▾꘠)ᕗ"];
  let lenny = Math.floor(Math.random() * lennies.length)
  message.channel.send(lennies[lenny])
}
})

client.on('message', message => {
  if (message.channel.id !== '707780490681253959' || message.author.bot)return;
  let msg = message.content.toLowerCase();
  if (msg !== '.verify') {
    message.delete()
  }
})





client.on('message', message => {
  if (message.author.bot)return;
  let msg = message.content.toLowerCase()
  if (msg.includes('kill myself') || msg.includes('kms') || msg.includes('commit suicide') || msg.includes('suicide')) {
    let embed = new Discord.MessageEmbed()
      .setTitle('Suicide Hotline')
      .setDescription('If your ever feeling suicidal, you can always get help at https://suicidepreventionlifeline.org/, or by calling this number `1-800-273-8255`')
  message.channel.send(embed)
    }

})

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return;
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();   
  let NewAr = Array.prototype.slice.call(args);
  if (command === 'argscount' || command === 'argslength') {
    let count = NewAr.length
    message.channel.send(`You said **${count}** arguments`)
  }

})

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return; 
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();   
if (command === 'math' || command === 'calculate' || command === 'calc') {
    let NewAr = Array.prototype.slice.call(args);
  var pars = args.join(" ")
  try { 
    var yes = eval(pars) 
    } catch(err) {
      message.channel.send('That isn\'t a valid equation! Here are the math characters.. \n`*` = Multiplication, `-` = Subtraction, `/` = Divison, `**` = Exponation, `%` = Modulo, `+` = Addition')
    }
  if (!pars[0] || !pars[2])return message.channel.send('You need to give me a math equation!');
  message.channel.send(yes)
  console.log(`Equation: ${pars} Answer: ${yes}`)
} 
})



client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot)return;
    const args = message.content.slice(prefix.length).trim().split(' ')
    const command = args.shift().toLowerCase();   
  if (command === 'amatic') {
let amatic = {
    "a": "α",
    "b": "Ⴆ",
    "c": "ƈ",
    "d": "ԃ",
    "e": "ҽ",
    "f": "ϝ",
    "g": "ɠ",
    "h": "ԋ",
    "i": "ι",
    "j": "ʝ",
    "k": "ƙ",
    "l": "ʅ",
    "m": "ɱ",
    "n": "ɳ",
    "o": "σ",
    "p": "ρ",
    "q": "ϙ",
    "r": "ɾ",
    "s": "ʂ",
    "t": "ƚ",
    "u": "υ",
    "v": "ʋ",
    "w": "ɯ",
    "x": "x",
    "y": "ყ",
    "z": "ȥ"
}

    let p = args.join(" ").toLowerCase();
let characters = p.split("");
let newString = "";

characters.forEach(character => {
let convertedCharacter = amatic[character] || character;
  newString += convertedCharacter;
});

message.channel.send(newString);
  }
  })



client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return;
 const args = message.content.slice(prefix.length).trim().split(' ')
 const command = args.shift().toLowerCase();   
  if (command === 'nsfw') {
    if (!message.channel.nsfw)return message.channel.send('This channel isn\'t nsfw, move to a NSFW channel!')
  message.channel.send('Here\'s your nsfw..... hah! you thought!!!')
  }
})

const EvenEmitter = require("events")
class MyEmitter extends EvenEmitter{}

var emitter = new MyEmitter();
var emitter2 = new MyEmitter();

emitter.setMaxListeners(20)

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return;
   const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
  if (command === 'suggest') {
  let chan = db.get(`suggest_chan_${message.guild.id}`, "none")
  if (chan == null)return message.channel.send('No suggestion channel set, do `l!suggestion-channel` to set one!');
  let pan = message.guild.channels.resolve(chan)  
  if (!args[0])return message.channel.send('You need to actually suggest something!');
      const kreason = args.join(" ");
  db.add(`tino_${message.guild.id}`, 1)
  let dbfetch = db.get(`tino_${message.guild.id}`);
  
  let embed = new Discord.MessageEmbed()
  .setTitle(`Suggestion #${dbfetch}`) 
  .setAuthor(message.author.tag, message.author.displayAvatarURL())
    .setDescription(kreason)
    .setFooter(`ID:${message.author.id}`)
    .setThumbnail(message.author.displayAvatarURL())
    .setColor(message.member.displayHexColor)
    .setTimestamp()
    message.delete()
  pan.send(embed).then(function (message) {
    message.react('737362033443602464')
    message.react('737362086023135272')
    if (message.reactions.resolve('<:green_tick:737362033443602464>').count === '3') {
      message.channel.send('Your suggestion has been approved!')
    }
  })  
}
})

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return;
  const args = message.content.slice(prefix.length).trim().split(' ')
  const command = args.shift().toLowerCase()
  if (command == "suggestion-channel" || command === "suggestionchannel") {
    let chan = db.get(`suggest_chan_${message.guild.id}`, "none")
    if (chan == null) chan = "None set!"
    if (!args[0])return message.channel.send(`Your suggestion channel is ${chan}`)
    let channel = message.mentions.channels.first()
    db.set(`suggest_chan_${message.guild.id}`, channel.id)
    message.channel.send(`I set the suggestion channel to ${channel}`)
  }
})



client.on('message', async message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return;
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
  if (command === 'pingmods') {
    const tembed = new Discord.MessageEmbed()
      .setDescription(`${message.author} Needs a moderator!`) 
      .setThumbnail(message.author.displayAvatarURL({ dynamic: true}))   
      .setAuthor(message.author.tag, message.author.displayAvatarURL())   
      .setFooter(message.author.id)
      .setTimestamp();
    const embed = new Discord.MessageEmbed()
        .setTitle('Are you sure?')
        .setDescription('Are you sure you want to ping all mods? If your ping is useless/uneeded, you will be subject to moderator action. Think about that when deciding.\nReact with <:green_tick:737362033443602464> to accept, or <:red_tick:737362086023135272> to deny.')
        .setThumbnail(message.author.displayAvatarURL())
   const Eembed = new Discord.MessageEmbed()
        .setTitle('Ping cancelled!')
    const embed2 = new Discord.MessageEmbed()
        .setTitle('Timedout, no reaction in 10 seconds!')
        
        const questionMessage = await message.channel.send(embed)
      
    
    await questionMessage.react('737362033443602464')
    await questionMessage.react('737362086023135272')

    try {
      const collected = await questionMessage.awaitReactions((reaction, user) => user.id == message.author.id && (reaction.emoji.id == '737362086023135272' || reaction.emoji.id == '737362033443602464'),
                                     { max: 1, time: 10000, errors: ['time']})
      
      console.log(collected.first().emoji.id)
      if (collected.first().emoji.id == '737362033443602464') {
        questionMessage.edit(`<@&737781781415198861>`)
        questionMessage.edit(tembed)
              questionMessage.reactions.removeAll()
      }
      else questionMessage.edit(Eembed)
          questionMessage.reactions.removeAll()
      } catch (error) {
            questionMessage.edit(embed2)
          questionMessage.reactions.removeAll()
    }
    
  }
})
 


client.on('message', message => {
if (!message.content.startsWith(prefix) || message.author.bot)return; 
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
 if (command == 'commandsused') { 
  db.add(`commandran_${message.guild.id}`, 1);
  let dbfetch = db.fetch(`commandran_${message.guild.id}`);
  message.channel.send(`Today, users have ran ${dbfetch} commands`);
}
})


  client.on('message', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot)return;
    const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase()
  if (command == 'hack') {
    const user = await message.mentions.users.first() || args[0];
    if (!user)return message.channel.send('I cant hack nothing!');
        const puser = await client.users.fetch(user.id).catch(err => {
       args[0]
        })
    const msg = await message.channel.send(`Hacking ${puser}....`)
    client.setTimeout(() => msg.edit('Getting Password....'), 1500);
    client.setTimeout(() => msg.edit('Password retrived!!'), 3000);
    client.setTimeout(() => msg.edit('Almost done hacking!'), 4500);
    client.setTimeout(() => msg.edit('I now have access to all of their accounts!'), 5500);
    
    
    

  }
  })

  client.on('message', async message => {
    if(!message.content.startsWith(prefix) || message.author.bot)return;
  })

client.on('message', async message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return;
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase()
if (command == 'dm') {
  if (!args[0])return message.channel.send('You need to specify a time!');
  const msg = await client.setTimeout(() => message.author.send('Hello!'), args[0]);
}
})

client.on('message', async message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return;
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
  let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(member => member.user.username == args[0]) || message.member;
if (command == 'bal' || command == 'balance') {
db.add(`bal_${message.author.id}`, 0)
  let bal = db.get(`bal_${user.id}`)
  if (bal == null) bal = 0;
   let rank = db.all() 
      .filter(base => base.ID.includes('bal'))
      .sort((a, b) => b.data - a.data)
      .filter(x => message.guild.members.cache.get(x.ID.slice(4)))
      .findIndex(x => x.ID.slice(4) === user.user.id) + 1;

  let embed = new Discord.MessageEmbed()
    .setAuthor(user.user.tag, user.user.displayAvatarURL({ dynamic: true}))
    .setDescription(`Balance: **$${bal}**\nRank: **#${rank}**`)
    .setColor(user.displayHexColor)
    .setTimestamp()
    message.channel.send(embed)
}
})

client.on('message', async message => {
if (!message.content.startsWith(prefix) || message.author.bot)return;
const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
  if (command == 'work') {
    const amount = Math.floor(Math.random() * 500) + 100;
    const amount2 = Math.floor(Math.random() * 400) + 100;
    const amount3 = Math.floor(Math.random() * 1100) + 250;
    const amount4 = Math.floor(Math.random() * 625) + 125;
    const amount5 = Math.floor(Math.random() * 2500) + 400;
    const bal = db.get(`bal_${message.author.id}`)
    const rando = ["Oh no!", amount5]
    const pop = Math.floor(Math.random() * rando.length);
    const job = db.get(`job_${message.author.id}`)
    if (job == 0) {
      message.channel.send('You dont have a job!'); 
    } else if (job != 0) {
      if (talkedRecently.has(message.author.id)) {
        message.channel.send("This command has a 45 minute cooldown!");
} else {
      
    
     if (job == 'officer') {
    
    message.channel.send(`You had a long night shift as a police officer, but it paid well!\nYou earned ${amount}$ Today!`)
    db.add(`bal_${message.author.id}`, amount)
    
  } else if (job == 'farmer') {
    message.channel.send(`You plowed the fields, and milked the cows. So you earned ${amount2}$!`)
    db.add(`bal_${message.author.id}`, amount2)
  } else if (job == 'engineer') {
    message.channel.send(`You made a DC motor, and got paid ${amount3}$!`)
    db.add(`bal_${message.author.id}`, amount3)
  } else if (job == 'musician') {
   message.channel.send(`You song got #10 on spotify, so you made ${amount4}$!`)
   db.add(`bal_${message.author.id}`, amount4)
  } else if (job == 'robber') {
    if (rando[pop] === 'Oh no!') {
      message.channel.send('You got caught and got sent to jail. You lost all of your money!')
      db.subtract(`bal_${message.author.id}`, bal)
    } else {
      message.channel.send(`You got away with the robbery and earned ${amount5}$!`)
      db.add(`bal_${message.author.id}`, amount5)
    }
  } else if (job == 'gamer') {
    let am = Math.floor(Math.random() * 300) + 1;
    let test = ["Fortnite", "League of Legends", "Valorant", "Modern Warfare", "Madden", "2k20"]
    let num = Math.floor(Math.random() * test.length);
    message.channel.send(`You played some ${test[num]}, and earned ${am}$!`)
    db.add(`bal_${message.author.id}`, am)
  } else if (job == 'youtuber') {
    let tt = Math.floor(Math.random() * 500) + 1;
    let views = Math.floor(Math.random() * 500000) + 10000;
    message.channel.send(`You made a video and it got ${views} views, so you earned ${tt}$!`)
    db.add(`bal_${message.author.id}`, tt)
  } else if (job == 'hitman') {
    message.channel.send('Your a hitman, you used the `kill` command instead of the `work` command!')
  }
  else message.channel.send('You dont have a job!')
} talkedRecently.add(message.author.id);
        setTimeout(() => {
          // Removes the user from the set after a minute
          talkedRecently.delete(message.author.id);
        }, 2700000);
    }
}
    
})

client.on('message', async message => {
if (!message.content.startsWith(prefix) || message.author.bot)return;
const args = message.content.slice(prefix.length).trim().split(' ');
const command = args.shift().toLowerCase();
let embed = new Discord.MessageEmbed()
.setTitle('Valid jobs!')
.setAuthor(message.author.tag, message.author.displayAvatarURL())
.setColor(message.member.displayHexColor)
.setDescription('- `police`\n- `farmer`\n- `engineer`\n- `musician`\n- `robber` (risky job, but good payout)\n- `gamer`\n- `youtuber/yt`\n - `hitman` (You use `kill` instead of `work` with this job)')
.setTimestamp();
if (command == 'job') {
  if (!args[0])return message.channel.send('You didn\'t specify a job!');
  if (args[0] == 'police') {
    await db.set(`job_${message.author.id}`, 'officer');
    message.channel.send('I set your job occupation to.. `police`!');

  } else if (args[0] == 'farmer') {
    await db.set(`job_${message.author.id}`, 'farmer');
    message.channel.send('I set your job occupation to.. `farmer`!');
  } else if (args[0] == 'engineer') {
    await db.set(`job_${message.author.id}`, 'engineer')
    message.channel.send('I set your job occupation to.. `engineer`!');
  } else if (args[0] == 'musician') {
    await db.set(`job_${message.author.id}`, `musician`)
   message.channel.send('I set your job occupation to.. `musician`!')
  } else if (args[0] == 'list') {
    message.channel.send(embed)
  } else if (args[0] == 'none' || args[0] == 'remove') {
    message.channel.send('Alright, you are no longer employed!')
    db.set(`job_${message.author.id}`, 0)
  } else if (args[0] == 'robber') {
    message.channel.send('I set your job occupation to.. `robber`')
    db.set(`job_${message.author.id}`, `robber`)
  } else if (args[0] == 'youtuber' || args[0] == 'yt') {
    message.channel.send('I set your occupation to.. `youtuber`')
    db.set(`job_${message.author.id}`, 'youtuber')
  } else if (args[0] == 'gamer') {
    message.channel.send('I set your occupation to.. `gamer`')
    db.set(`job_${message.author.id}`, 'gamer')
  } else if (args[0] == 'hitman') {
    message.channel.send('I set your occupation to.. `hitman`')
    db.set(`job_${message.author.id}`, 'hitman')
    db.push(`hitmen_${message.guild.id}`, message.author)
  }
  else message.channel.send('That isn\'t a valid job! Do `l!job list` to get a list of jobs');
}
})

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return
  const args = message.content.slice(prefix.length).trim().split(' ');
const command = args.shift().toLowerCase();
if (command == 'work-info' || command == 'job-info') {
const bal = db.get(`bal_${message.author.id}`)
const job = db.get(`job_${message.author.id}`)
let pets = db.get(`pets_${message.author.id}`)
if (pets == null) pets = "none"
let friends = db.get(`friends+${message.author.id}`)
if (friends == null) friends = "none"
let trophies = db.get(`trop_${message.author.id}`)
if (trophies == null) trophies = "none"
const embed = new Discord.MessageEmbed()
  .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true}))
  .setTitle('Some info on you!')
  .addField("**Balance**", `**${bal}$**`, true)
  .addField("**Employment**", `${job}`, true)
  .addField("**Pets**", pets, true)
  .addField("**Friends**", friends, true)
  .addField("**Trophies**", trophies, true)
  .setColor(message.member.displayHexColor)
  .setTimestamp();
  message.channel.send(embed)
}
})

client.on('message', async message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return;
  const args = message.content.slice(prefix.length).trim().split(' ');
const command = args.shift().toLowerCase();
const user = message.mentions.users.first() || message.author;
if (command == 'inventory' || command == 'inv') {
  const inv = await db.get(`inven_${user.id}`, { items: [] })
  if (inv === null)return message.channel.send('You dont have anything in your inventory!')
    const newinv = inv.join(", ");
  let embed = new Discord.MessageEmbed()
  .setAuthor(user.tag, user.displayAvatarURL())
  .setTitle('Your inventory!')
  .setDescription(newinv)
  message.channel.send(embed)
}
})
const sword = 400;
const pig = 100;
const knife = 125;
const potato = 45000;
const lock = 3450;
const candy = 50;
const gun = 250;
const bomb = 1000;
const dog = 220;
const cat = 170;
const parrot = 300;
const steroids = 500;
const energy = 200;
const gatorade = 79;
const pack = 340;

client.on('message', async message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return;
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase()
  if (command === 'shop' || command == 'store') {
  
    const inv = db.get(`inven_${message.author.id}`, { items: [] })
    const bal = db.get(`bal_${message.author.id}`)
    let embed = new Discord.MessageEmbed()
    .setAuthor(message.author.tag, message.author.displayAvatarURL())
    .setTitle('The shop!')
    .addField(`**Pig** ${pig}$`, `Can be used for riding, skinning, cutting off feet.`, true)
    .addField(`**Sword** ${sword}$`, `Used for sword fighting`, true)
    .addField(`**Knife** ${knife}$`, `Can be used to cutting a pig, or knife fighting!`, true)
    .addField(`**Legendary-Potato 🥔** ${potato}$`, `The legendary potato will grant you 5k every hour!`, true)
    .addField(`**Lock** ${lock}$`, "Protects you from being robbed and killed for 5 days", true)
    .addField(`**Candy ${candy}$**`, "Some candy!", true)
    .addField(`**Gun ${gun}$**`, "Gun go pew pew", true)
    .addField(`**Money Bomb ${bomb}$**`, "Drop some cash!!", true)
    .addField(`**Dog ${dog}$**`, "Man's bestfriend! Gives you 125$ every hour", true)
    .addField(`**Cat ${cat}$**`, "*Meow* Just a fluffy kitty", true)
    .addField(`**Parrot ${parrot}$**`, "A parrot...", true)
    .addField(`**Steroids ${steroids}$**`, "Gives you 40 strength!", true)
    .addField(`**Energy Drink ${energy}$**`, "Gives you double your strength for 5 minutes!", true)
    .addField(`**Gatorade ${gatorade}$**`, "Gives you 4 strength!", true)
    .addField(`**Pack of energy drinks ${pack}$ (Use the word \`pack\` to buy)**`, "Gives triple strength for 4 minutes!", true)
    .setFooter('Shop made by ThatGuyTino#5390 and Txco#9578')
    .setTimestamp();
    if (!args[0]) {
      message.channel.send(embed)
    } else if (args[0] == 'pig') {
      if (bal < `${pig}`)return message.channel.send('You cant afford a pig!');
      if (inv !== null) {
      if (inv.indexOf("pig") !== -1)return message.channel.send('You already have pig!');
      }
      message.channel.send(`I added a pig to your inventory!`)
      db.push(`inven_${message.author.id}`, "pig");
      db.subtract(`bal_${message.author.id}`, pig)
    } else if (args[0] == 'sword') {
        if (bal < `${sword}`)return message.channel.send('You cant afford a sword!')
      if (inv !== null) {
      if (inv.indexOf("sword") !== -1)return message.channel.send('You already have a sword!')
      }
        message.channel.send(`I added a sword to your inventory!`)
        db.push(`inven_${message.author.id}`, "sword")
        db.subtract(`bal_${message.author.id}`, sword)
    } else if (args[0] == 'knife') {
        if (bal < `${knife}`)return message.channel.send('You cant afford a knife!');
        if (inv.indexOf("knife") !== -1)return message.channel.send('You already have a knife!')
        message.channel.send(`I added a knife to your inventory!`)
        db.push(`inven_${message.author.id}`, "knife")
        db.subtract(`bal_${message.author.id}`, knife)
      
    } else if (args[0] == 'legendary-potato') {
        if (bal < `${potato}`)return message.channel.send('You cant afford a legendary potato!')
        if (inv.indexOf("legendary-potato") !== -1)return message.channel.send('You already have a legendary potato!')
        message.channel.send(`I added a legendary potato to your inventory`)
        db.push(`inven_${message.author.id}`, "legendary-potato");
        db.subtract(`bal_${message.author.id}`, potato)
      
    } else if (args[0] == 'lock') {
        if (bal < `${lock}`)return message.channel.send('You cant afford a lock!')
        if (inv.indexOf("lock") !== -1)return message.channel.send('You already have a lock!')
        message.channel.send('I added a lock to your inventory!')
        db.push(`inven_${message.author.id}`, "lock")
        db.subtract(`bal_${message.author.id}`, lock)
        client.setTimeout(() => db.set(`inven_${message.author.id}`, inv.filter(x => x !== "lock")), 4.32e+8)
      
    } else if (args[0] == 'candy') {
        if (bal < `${candy}`)return message.channel.send('You cant afford candy!')
        if (inv.indexOf("candy") !== -1)return message.channel.send('You already have candy!')
        message.channel.send('I added candy to your inventory!')
        db.push(`inven_${message.author.id}`, "candy")
        db.subtract(`bal_${message.author.id}`, candy)
      
    } else if (args[0] == 'gun') {
        if (bal < gun)return message.channel.send('You cant afford a gun!')
        if (inv.indexOf("gun") !== -1)return message.channel.send('You already have a gun!')
        message.channel.send('I added a gun to your inventory!')
        db.push(`inven_${message.author.id}`, "gun")
        db.subtract(`bal_${message.author.id}`, gun)
      
    } else if (args[0] === 'moneybomb' || args[0] == 'money-bomb') {
        if (bal < bomb)return message.channel.send('You cant afford a money bomb!')
        if (inv.indexOf("money bomb") !== -1)return message.channel.send('You already have a gun!')
        message.channel.send('I added a moneybomb to your inventory!')
        db.push(`inven_${message.author.id}`, "money bomb")
        db.subtract(`bal_${message.author.id}`, bomb)
      
    } else if (args[0] == 'dog') {
        if (bal < dog)return message.channel.send('You cant afford a dog!')
        if (inv.indexOf("dog") !== -1)return message.channel.send("You already have a dog!")
        message.channel.send('I added a dog to your inventory!')
        db.push(`inven_${message.author.id}`, "dog")
        db.push(`pets_${message.author.id}`, "dog")
        db.subtract(`bal_${message.author.id}`, dog)
      
    } else if (args[0] == 'cat') {
        if (bal < cat)return message.channel.send('You cant afford a cat!')
        if (inv.indexOf("cat") !== -1)return message.channel.send('You already have a cat!')
        message.channel.send('I added a cat to your inventory!')
        db.push(`inven_${message.author.id}`, "cat")
        db.subtract(`bal_${message.author.id}`, cat)
        db.push(`pets_${message.author.id}`, "cat")
      
    } else if (args[0] === 'parrot') {
        if (bal < parrot)return message.channel.send('You cant afford a parrot!')
        if (inv.indexOf("parrot") !== -1)return message.channel.send("You already have a parrot!")
        message.channel.send('I added a parrot to your inventory!')
        db.push(`inven_${message.author.id}`, "parrot")
        db.subtract(`bal_${message.author.id}`, parrot)
        db.push(`pets_${message.author.id}`, "parrot")
      
    } else if (args[0] === 'steroids') {
        if (bal < steroids)return message.channel.send('You cant afford steroids!')
          if (inv.indexOf("steroids") !== -1)return message.channel.send("You already have steroids!")
          message.channel.send("I added steroids to your inventory!")
          db.push(`inven_${message.author.id}`, "steroids")
          db.subtract(`bal_${message.author.id}`, steroids)
        
    
    } else if (args[0] == 'energy-drink' || args[0] == 'energydrink') {
      if (bal < energy)return message.channel.send('You cant afford an energy drink!')
      if (inv.indexOf("Energy Drink") !== -1)return message.channel.send("You already have an energy drink!")
      message.channel.send("I added an energy drink to your inventory!")
      db.push(`inven_${message.author.id}`, "Energy Drink").then(() => {
        client.setTimeout(() => db.set(`inven_${message.author.id}`, inv.filter(x => x !== "Energy Drink")), ms('5 minutes'));
      })
      db.subtract(`bal_${message.author.id}`, energy)
      
    } else if (args[0] == 'gatorade') {
      if (bal < gatorade)return message.channel.send('You cant afford a Gatorade!')
      if (inv.indexOf("Gatorade") !== -1)return message.channel.send("You already have a Gatorade!")
      message.channel.send("I added a Gatorade to your inventory!")
      db.push(`inven_${message.author.id}`, "Gatorade")
      db.subtract(`bal_${message.author.id}`, gatorade)
      
    } else if (args[0] == 'pack') {
      if (bal < pack)return message.channel.send('You cant afford a pack of energy drinks!!')
      if (inv.indexOf("Pack of Energy Drinks") !== -1)return message.channel.send("You already have a pack of energy drinks!")
      message.channel.send("I added a pack of energy drinks to your inventory!")
      db.push(`inven_${message.author.id}`, "Pack of Energy Drinks").then(() => {
        client.setTimeout(() => db.set(`inven_${message.author.id}`, inv.filter(x => x !== "Pack of Energy Drinks")), ms("4 minutes"));
      })
      db.subtract(`bal_${message.author.id}`, energy)
    }
  } else if (!message.content.startsWith(prefix) || message.author.bot)return;
    if (command == 'remove') {
    const inv = db.get(`inven_${message.author.id}`, { items: [] })
        if (inv == null)return message.channel.send('You dont have anything in your inventory!')
        let pargs = args.join(" ")
    const position = inv.indexOf(pargs)
   if (!pargs[0])return message.channel.send('What item do you want to remove?!');
   if (inv.indexOf(pargs) == -1)return message.channel.send('You dont have that item in your inventory!')
  message.channel.send(`Successfully removed ${inv[position]}`)
  inv.splice(position, 1)
  db.set(`inven_${message.author.id}`, inv.filter(x => x !== pargs));
      

  } else if (command == 'bet') {
    const newmoney = args[0] * 2;
    const balance = db.get(`bal_${message.author.id}`)
    const newoutput = Math.floor(Math.random() * 2) + 1;    
    if (!args[0])return message.channel.send('You need to actually bet something!')
    const moneydough = args.toString().replace('$', '')
    const amount = parseInt(moneydough);

	if (isNaN(amount)) {
    return message.reply('that doesn\'t seem to be a valid number.');
  }

    if (moneydough <= 0)return message.channel.send('You cant bet 0$!');
    if (moneydough > balance)return message.channel.send(`You cant bet that much! You only have **${balance}$**`)
    if (newoutput == 1) {
      message.channel.send(`You lost ${moneydough}$!`)
      const lost = balance - moneydough
      db.subtract(`bal_${message.author.id}`, moneydough)
    } else if (newoutput == 2) {
      message.channel.send(`You won ${newmoney}$!`)
    db.add(`bal_${message.author.id}`, newmoney)
     console.log(balance - moneydough)
    }
   } else if (command == 'add-money') {
    const role = 721526644052852766
    if (!message.member.hasPermission("ADMINISTRATOR"))return message.channel.send('You cant use this command dumbo!')
    const user = message.mentions.users.first()
    if (!user)return message.channel.send('Who do you want to add money to....?')
    const newuser = client.users.fetch(user.id).catch(err => {
      message.channel.send('I couldn\'t find that user!')
    })
    if (!args[1])return message.channel.send('How much money do you want to give them!?!')
     let amountt = args[1]
     if (amountt.toLowerCase() === 'infinity') amountt = Infinity
    db.add(`bal_${user.id}`, amountt)
    message.channel.send('Success!')
  } else if (command === 'swordfight' || command === 'sf') {
    if (talky.has(message.author.id)) {
      message.channel.send("This command has a 10 minute cooldown!");
} else {
   const winmoney = Math.floor(Math.random() * 450) + 1;
   const winner = Math.floor(Math.random() * 3) + 1;
   const user = message.mentions.users.first();
   const bal = db.get(`bal_${message.author.id}`)
   const inv = db.get(`inven_${message.author.id}`)
    if (!user)return message.channel.send('You need to mention somebody to swordfight!');
       const newuser = client.users.fetch(user.id).catch(() => {
     message.channel.send('That isn\'t a valid member!')
   })

    if (inv.indexOf("sword") === -1)return message.channel.send('You dont have a sword! Go to the shop and get one');
  if (winner == 1) {
    const output = ["Mopped the floor with you!", "Decked you!", "Floded you like a lawn chair!", "Ninja kicked yo ass", "Scrapped you!", "Hit you with that right hook, and knocked you out", "Knocked you tf out!!"]
    const num = Math.floor(Math.random() * output.length)
    message.channel.send(`${user} ${output[num]}`)
  } else if (winner == 2) {
    const tino = ["You scrapped", "You straight foled", "You destroyed", "Murdered...", "Dominated"]
    const tin = Math.floor(Math.random() * tino.length);
    message.channel.send(`You ${tino[tin]} ${user}! So you earned ${winmoney}$`)
    db.add(`bal_${message.author.id}`, winmoney)
  } else {
    message.channel.send(`Your sword broke! Oh no!`)
    db.set(`inven_${message.author.id}`, inv.filter(x => x !== "sword"));
  } 
  talky.add(message.author.id);
  setTimeout(() => {
    // Removes the user from the set after a minute
    talky.delete(message.author.id);
  }, 600000);
}  
} else if (command === 'use') {
  const inv = db.get(`inven_${message.author.id}`)
  const bal = db.get(`bal_${message.author.id}`)
  const skin = Math.floor(Math.random() * 200) + 1;
  const sell = pig
  const feet = Math.floor(Math.random() * 100) + 1;
  const candamount = Math.floor(Math.random() * 100) + 1;
  const gunamount = Math.floor(Math.random() * 300) + 1;
  if (!args[0])return message.channel.send('What item do you want to use?!')
  if (args[0] === 'pig') {
   if (inv.indexOf("pig") === -1)return message.channel.send('You dont have a pig!');
   message.channel.send('What would you like to do to the pig?\nOptions: `skin`, `sell`, or `cut off foot`')
   message.channel.awaitMessages(m => m.author.id == message.author.id,
    { max: 1, time: 25000}).then(collected => {
      if (collected.first().content.toLowerCase() == 'skin') {
        if (inv.indexOf("knife") === -1)return message.channel.send('You need a knife to skin the pig!')
        message.channel.send(`You skined the pig, so you earned ${skin}$!`)
      db.set(`inven_${message.author.id}`, inv.filter(x => x !== "pig"));
      db.add(`bal_${message.author.id}`, skin)
      } else if (collected.first().content.toLowerCase() == 'sell') {
        message.channel.send(`You sold the pig for ${sell}$`)
        db.set(`inven_${message.author.id}`, inv.filter(x => x !== "pig"));
        db.add(`bal_${message.author.id}`, sell)
      } else if (collected.first().content.toLowerCase() === 'cut off feet' || collected.first().content.toLowerCase() === 'cut off foot') {
        message.channel.send(`You cut off the pigs foot, and made ${feet}$. It died though....`)
        db.add(`bal_${message.author.id}`, feet)
        db.set(`inven_${message.author.id}`, inv.filter(x => x !== "pig"));
      }
    }).catch(() => {
message.channel.send('Cancelled, no answer in 25 seconds!')
    })
  } else if (args[0] === 'knife') {
    const inv = db.get(`inven_${message.author.id}`)
    const bal = db.get(`bal_${message.author.id}`)
    if (inv.indexOf("knife") == -1)return message.channel.send('You dont have a knife!')
    const stab = bal
    const fruit = Math.floor(Math.random() * 200) + 1;
    const rob = Math.floor(Math.random() * 350) + 1;
    const output = ["No", "Yes"]
    const too = Math.floor(Math.random() * output.length);
    const msg = await message.channel.send('What would you like to do with the knife?\n`cut fruit`, `stab someone`, or `rob somone`')
    message.channel.awaitMessages(m => m.author.id == message.author.id,
     { max: 1, time: 25000}).then(collected => {
       if (collected.first().content.toLowerCase() == 'cut fruit') {
         msg.edit(`You cut some fruit and earned ${fruit}$!`)
       db.set(`inven_${message.author.id}`, inv.filter(x => x !== "knife"));
       db.add(`bal_${message.author.id}`, fruit)
       } else if (collected.first().content.toLowerCase() == 'stab someone') {
         msg.edit(`You tried to stab someone on the street, but he police sent you to jail. You lost all of your money!`)
         db.set(`inven_${message.author.id}`, inv.filter(x => x !== "knife"));
         db.subtract(`bal_${message.author.id}`, stab)

} else if (collected.first().content.toLowerCase() == 'cancel') {
  msg.edit('Cancelled')
          }
  
else if (collected.first().content.toLowerCase() === 'rob someone') {
         if (output[too] == "Yes") {
           msg.edit(`You made off with ${rob}$!`)
         db.add(`bal_${message.author.id}`, rob)
         } 
          else {
           message.channel.send('You got caught by the police, and you lost all of your money!')
           db.subtract(`bal_${message.author.id}`, stab)
           db.set(`inven_${message.author.id}`, inv.filter(x => x !== "knife"));
         }         
        }
     }).catch(() => {
 msg.edit('Cancelled, no answer in 25 seconds!')
     })
  } else if (args[0] == 'money-bomb' || args[0] == 'moneybomb') {
   const amount = 600;
   const bal = db.get(`bal_${message.author.id}`)
   const inv = db.get(`inven_${message.author.id}`)
   if (inv.indexOf("money bomb") == -1)return message.channel.send('You dont have a money bomb!');
   db.set(`inven_${message.author.id}`, inv.filter(x => x !== "money bomb"))
   const msg = await message.channel.send('Money bomb activated! Anybody who says the word `money` in the next 10 seconds, will earn 600$!')
           const thingy = db.get(`users_${msg.id}`)
   client.setTimeout(() => message.channel.send(`I added money to these users!\n${thingy}`), 10000)
   message.channel.awaitMessages(m => !m.author.bot,
     { max: 1, time: 10000}).then(collected => {
     if (collected.first().content.toLowerCase() == 'money') {
       db.add(`bal_${collected.first().author.id}`, amount)
        db.push(`users_${msg.id}`, collected.first().author.username)
      }
   }) 
  } else if (args[0] == 'candy') {
    const candyamount = Math.floor(Math.random() * 145) + 1;
    const inv = db.get(`inven_${message.author.id}`)
    if (inv.indexOf("candy") == -1)return message.channel.send('You dont have any candy!')
    message.channel.send(`You ate some candy and earned ${candyamount}$!`)
    db.add(`bal_${message.author.id}`, candyamount)
    db.set(`inven_${message.author.id}`, inv.filter(x => x !== "candy"));
  } else if (args[0] == 'parrot') {
    const bal = db.get(`bal_${message.author.id}`)
    const inv = db.get(`inven_${message.author.id}`)
    const parrotcount = db.add(`parrot_${message.author.id}`, 1)
    const pc = db.get(`parrot_${message.author.id}`)
    if (pc >= 5) {
      message.channel.send('You have reached your max amount of parrot uses, you will have to buy a new one....')
      db.set(`inven_${message.author.id}`, inv.filter(x => x !== "parrot"));
      db.set(`parrot_${message.author.id}`, 0)
    }    
    if (inv.indexOf("parrot") == -1)return message.channel.send('You dont have a parrot!')
    if (!args[1])return message.channel.send('Say something.....')
    let pargs = args.join(" ").slice(7)
    message.channel.send(`🦜 *${pargs}* 🦜`)
  } else if (args[0] == 'gun') {
    const robamount = Math.floor(Math.random() * 340) + 1;
    const robtest = Math.floor(Math.random() * 2) + 1;
    const shooting = Math.floor(Math.random() * 300) + 1;
    let howgood = "Good"
    if (shooting <= 40) howgood = "Horrible"
    if (shooting >= 200) howgood = "Amazing"
    const inv = db.get(`inven_${message.author.id}`)
    if (inv.indexOf("gun") == -1)return message.channel.send("You dont have a gun!")
    let msg = await message.channel.send('What do you want to do with the run? Respond with...\n`rob someone`, `target shooting`, or `shoot someone`')
    message.channel.awaitMessages(m => m.author.id == message.author.id, 
      { max: 1, time: 10000}).then(collected => {
        if (collected.first().content.toLowerCase() == 'rob someone') {
          if (robtest == 1) {
            msg.edit('You got caught and sent to jail, you lost all of your money!!')
            db.subtract(`bal_${message.author.id}`, bal)
            db.set(`inven_${message.author.id}`, inv.filter(x => x !== "gun"));
          } else {
            msg.edit(`You got away with the robbery, and made ${robamount}$!`)
            db.add(`bal_${message.author.id}`, robamount)
            db.set(`inven_${message.author.id}`, inv.filter(x => x !== "gun"));
          }
        } else if (collected.first().content.toLowerCase() == 'target shooting') {
              msg.edit(`You did some pretty ${howgood} shooting. So you earned ${shooting}$!`)
              db.add(`bal_${message.author.id}`, shooting)
              db.set(`inven_${message.author.id}`, inv.filter(x => x !== "gun"));
        } else if (collected.first().content.toLowerCase() == 'shoot someone') {
            msg.edit('You tried to shoot someone, but the cops shot and killed you. You lost all of your money!')
            db.subtract(`bal_${message.author.id}`, bal)
            db.set(`inven_${message.author.id}`, inv.filter(x => x !== "gun"));
        } else {
          msg.edit("You idiot, that isn't an option!")
        }
      }).catch(() => {
          message.channel.send('Goodbye, you didn\'t answer in time!')
      })

  } else if (args[0] == 'steroids') {
    if (sterCD.has(message.author.id)) {
      message.channel.send("You can use steroids again in 7 minutes");
  } else {
    let inv = db.get(`inven_${message.author.id}`)
    let bal = db.get(`bal_${message.author.id}`)
    let ste = db.get(`strength_${message.author.id}`)
    if (inv.indexOf("steroids") == -1)return message.channel.send("You dont have steroids!")
    message.channel.send('I added `40` strength to your strength balance!')
    db.add(`strength_${message.author.id}`, 40)
    db.set(`inven_${message.author.id}`, inv.filter(x => x !== "steroids"));
  } sterCD.add(message.author.id);
  setTimeout(() => {
    // Removes the user from the set after a minute
    sterCD.delete(message.author.id);
  }, ms('7 minutes'));
  } else if (args[0] == 'gatorade') {
    if (gateCD.has(message.author.id)) {
      message.channel.send("You can use a gatorade again in 7 minutes");
  } 
} else if (command === 'slots') {
  if (slott.has(message.author.id)) {
    message.channel.send("This command has a 1 minute cooldown!");
} else {

  const bal = db.get(`bal_${message.author.id}`)
  const inv = db.get(`inven_${message.author.id}`)
  let amount = Math.floor(Math.random() * 600); + 100
  const slots = ["🍎", "🍇"]
  const result1 = Math.floor(Math.random() * slots.length);
  const result2 = Math.floor(Math.random() * slots.length);
  const result3 = Math.floor(Math.random() * slots.length)
  var d = new Date();
var weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";
var n = weekday[d.getDay()];
if (n == 'Friday') amount = 10000;
  if (result1 === result2 && result1 === result3) {
  let embed = new Discord.MessageEmbed()
  .setAuthor("Slots!", message.author.displayAvatarURL())
  .setTitle(`🎰 You won and earned ${amount}$! 🎰`)
  .setDescription(`| ${slots[result1]} | ${slots[result2]} | ${slots[result3]} |`)
  .setColor(message.author.displayHexColor)
  .setFooter('Dont forget, on fridays if you win, you earn 10k!!')
  .setTimestamp()
  db.add(`bal_${message.author.id}`, amount)
  message.channel.send(embed)
  } else {
    let embed2 = new Discord.MessageEmbed()
    .setAuthor(message.author.tag, message.author.displayAvatarURL())
    .setTitle(`🎰 You lost! 🎰`)
    .setDescription(`| ${slots[result1]} | ${slots[result2]} | ${slots[result3]} |`)
    .setColor(message.author.displayHexColor)
    .setFooter('Dont forget, on fridays if you win, you earn 10k!!')
    .setTimestamp()
    message.channel.send(embed2)
  }
} slott.add(message.author.id);
setTimeout(() => {
  // Removes the user from the set after a minute
  slott.delete(message.author.id);
}, 60000);
} else if (command === 'daily') {
    if (mommy.has(message.author.id)) {
      message.channel.send("This command has a 24 hour cooldown!");
} else {
message.channel.send('I added 1,500$ to your balance!')
db.add(`bal_${message.author.id}`, 1500)


} mommy.add(message.author.id);
setTimeout(() => {
  // Removes the user from the set after a minute
  mommy.delete(message.author.id);
}, 86400000);
 }  else if (command == 'rob' || command == 'mug') {
   const user = message.mentions.users.first()
   const balance = db.get(`bal_${message.author.id}`)
   const amount2 = Math.floor(Math.random() * balance) + 1;
   if (!user)return message.channel.send('Who do you want to rob?')
      const bal = db.get(`bal_${user.id}`)
         const inv = db.get(`inven_${user.id}`)
   const amount = Math.floor(Math.random() * bal) + 1;
  
   if (bal <= 0)return message.channel.send('You cant rob that user, they dont have any money!')
  if (inv !== null)
   if (inv.indexOf("lock") !== -1)return message.channel.send('You cant rob that user, they have a lock!')
   const outcome = ["No", "Yes"]
   const toop = Math.floor(Math.random() * outcome.length);
   if (outcome[toop] == "Yes") {
   message.channel.send(`You made off with ${amount}$!`);
      db.subtract(`bal_${user.id}`, amount)
      db.add(`bal_${message.author.id}`, amount)
   } else {
     message.channel.send(`You tried to rob ${user}, but they beat you up and robbed you of ${amount2}`)
     db.subtract(`bal_${message.author.id}`, amount2)
     db.add(`bal_${user.id}`, amount2)
   }
} else if (command == 'give' || command == 'donate') {
  const bal = db.get(`bal_${message.author.id}`)
  const inv = db.get(`inven_${message.author.id}`)
  const user = message.mentions.users.first()
  if (!user)return message.channel.send('You need to mention someone...')
  if (!args[1])return message.channel.send(`How much money do you want to give **${user.tag}**?`)
  const newbal = db.get(`bal_${user.id}`)
  if (newbal < 330)return message.channel.send(`That user only has **${newbal}$**, they need atleast \`330\`$`)
  if (bal < 330)return message.channel.send(`You need atleast **330$** to give money to other users`)
  if (bal < args[1])return message.channel.send(`You cant give that much money, you only have **${bal}**$!`)
  db.add(`bal_${user.id}`, args[1])
  message.channel.send(`I gave ${user.tag} ${args[1]}!`)

}

}
})








client.on('message', async message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return;
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase()
  if (command === 'test') {
   
  }
})

client.on('ready', () => {
  setInterval(() => {
    client.users.cache.forEach(u => {
      if (db.get(`inven_${u.id}`) !== null) {
  if(db.get(`inven_${u.id}`).indexOf("legendary-potato") === -1) return;
  db.add(`bal_${u.id}`, 5000) //once per second to once per hour
      }
      })
  }, 3.6e+6)
  console.log(`Added money!`)
  
  }) 
  client.on('ready', () => {
    client.users.cache.forEach(u => {
     const bal = db.get(`bal_${u.id}`)
     const trop = db.get(`trop_${u.id}`)
     if (bal >= 5000) {
        db.push(`trop_${u.id}`, "Reached 5k$!")
     }
     
     })
  })

client.on('message', async message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return;
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase()
  if (command == 'breathe') {
    const msg = await message.channel.send('*Inhale*')
    client.setTimeout(() => msg.edit('*Exhale*'), 2000);
  }
})
    
client.on('message', async message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return;
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase()
  if (command == 'friendrequest' || command == 'friend-request') {
  const friends = db.get(`friends+${message.author.id}`, { people: [] })
  const user = message.mentions.users.first()
  if (!user)return message.channel.send('You need to mention someone to friend request!')
  const userc = client.users.fetch(user.id).catch(() => {
    message.channel.send('That is not a valid user!')
  
  })
message.channel.send(`Do you want to accept ${message.author}'s friend request ${user}\nRespond with y or n`)

message.channel.awaitMessages(m => m.author.id == userc.id, 
  { max: 1, time: 10000}).then(collected => {
    if (collected.first().content.toLowerCase() == 'y') {
      message.channel.send(`${user} Accepted your friend request!`)
      db.push(`friends+${message.author.id}`)
    } else if (collected.first().content.toLowerCase() == 'n') {
      message.channel.send(`${user} Declined your friend request 😢`)
    } else {
      message.channel.send('Not a correct answer! Cancelled!')
    }
  }).catch(() => {
    message.channel.send('Cancelled, no answer in 10 seconds!')
  })

} 
})

let canvacord = require('canvacord')
client.on("message", async message => {
  
  if (message.author.bot)return;
  const args = message.content.slice(prefix.length).trim().split(' ');
const command = args.shift().toLowerCase()
  let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(member => member.user.username == args[0]) || message.member;
  let xp = db.get(`xp_${user.user.id}_${message.guild.id}`)
let lvl = db.get(`lvl_${user.user.id}_${message.guild.id}`)
let rank = db.get(`rank_${user.user.id}_${message.guild.id}`)
if (xp == null) xp = 0;
if (lvl == null) lvl = 0;
let amount = db.add(`amount_${message.author.id}_${message.guild.id}`, 0)
let chan = db.get(`lvl_chan_${message.guild.id}`)
if (chan == null) chan = "None"
let pan = message.guild.channels.resolve(chan)
if (message.author.id == user.user.id) {
db.add(`xp_${user.user.id}_${message.guild.id}`, 1)
}
if (xp >= amount) {
  if (message.author.id == user.user.id) {
  db.add(`lvl_${user.user.id}_${message.guild.id}`, 1)
  db.set(`xp_${user.user.id}_${message.guild.id}`, 0)
  let newlvl = lvl + 1
db.add(`amount_${message.author.id}_${message.guild.id}`, 100)
  if (pan == null)return;
  pan.send(`${user}, You reached level **${newlvl}**!`).catch(err => {
    console.log('Err')
  })
}
}
  if (!message.content.startsWith(prefix) || message.author.bot) return; // ignore bots

if (command == 'lvl' || command == 'level' || command == 'rank') {
  if (chan == "None") message.channel.send(`Please set a leveling channel so I can tell user's when they reach a new level. \`l!levelchannel\``)
  if (user.user.bot)return message.channel.send(`**${user.user.tag}** Is a bot! Their not invited to our level system 🥔!`)
  let neededXP = amount - xp
  let embed = new Discord.MessageEmbed()
    .setAuthor(`${user.user.tag}'s Level!`)
  .setThumbnail(user.user.displayAvatarURL({ dynamic: true}))
  .setDescription(`XP: ${xp}/${amount}\n\nLEVEL: ${lvl}`)
  .setColor(user.displayHexColor)

  message.channel.send(embed)

} else if (command === 'levelchannel' || command == 'level-channel') {
  let chan = db.get(`lvl_chan_${message.guild.id}`, "none")
  if (chan == null) chan = "None set"
if (!args[0])return message.channel.send(chan)
let chany = message.mentions.channels.first()
db.set(`lvl_chan_${message.guild.id}`, chany.id)
message.channel.send(`I set your leveling channel to ${chany}!`)

} else if (command == 'levels' || command == 'level-leaderboard' || command == 'lvl-lb') {
  
  let all = db.all() 
  .filter(base => base.ID.startsWith('lvl_') && !base.ID.startsWith('lvl_chan'))
  .sort((a, b) => b.data - a.data)
  let content = [];
for (let i in all) {
    let entry = all[i++];
    console.log(entry) // "all" is an array, "i" is the current index the loop is on, so the current entry would be "all[i]"
    let member = message.guild.members.cache.get(entry.ID.slice(4, 19)); // We get the member that holds the current entry's data
    console.log(entry.ID.slice(4))

  if (member) {
    content.push(`#${i++} \`${member.user.username}\`, Level: ${entry.data}`)
  }
}
let embed = new Discord.MessageEmbed()
  .setAuthor(message.guild.name, message.author.displayAvatarURL({ dynamic: true}))
  .setTitle(`The level leaderboard for ${message.guild.name}`)
  .setDescription(content.slice(0, 10))

message.channel.send(embed)
}

})

client.on('message', async message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return;
  const args = message.content.slice(prefix.length).trim().split(' ')
  const cmd = args.shift().toLowerCase()
  if (cmd == 'mute') {
    let time = args.slice(1).join(" ")
    const muterole = message.guild.roles.cache.find(role => role.name.toLowerCase() == 'muted' || role.name.toLowerCase() == 'mute')
    if (!muterole)return message.channel.send('Mute role not found, make sure it is named `muted` or `mute`')
    const user = message.mentions.users.first() || message.guild.members.cache.get(args[0])
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!args[0])return message.channel.send('You need to enter a user or userid..')
    if (!user)return message.channel.send('That isn\'t a valid user or userid')
    let urole = member.roles.highest.position
   let mrole = message.member.roles.highest.position
   if (member.user.id == message.guild.ownerID)return message.channel.send('You cant mute the owner!')
   if (urole >= mrole)return message.channel.send('That user is above you in the hierarchy!')
    if (!time)return message.channel.send('You didn\'t specify a time!')
    
        let newtime = ms(time)
        if (newtime > 2147483647) {
          return message.channel.send(`You cannot mute someone for longer than ${ms(2147483647, { long: true})}/2147483647 Milliseconds!`)
        }
    if (member.roles.cache.find(role => role.name.toLowerCase() == 'muted' || role.name.toLowerCase() == 'mute'))return message.channel.send(`**${member.user.tag}** Is already muted!`)
    member.roles.add(muterole).then(() => {
    client.setTimeout(() => member.roles.remove(muterole), ms(time))
    })
    message.channel.send(`Successfully muted **${member.user.tag}** for ${ms(newtime, { long: true})}!`)
  } else if (cmd == 'unmute') {
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    const muterole = message.guild.roles.cache.find(role => role.name.toLowerCase() == 'muted' || role.name.toLowerCase() == 'mute')
    if (!args[0])return message.channel.send('Who do you want to unmute?')
  if (!member)return message.channel.send('That isn\'t a valid user or userid')
  const mr = member.roles.cache.find(role => role.name.toLowerCase() == 'muted' || role.name.toLowerCase() == 'mute')
  if (!mr)return message.channel.send('That user is not muted!')
  message.channel.send(`Successfully unmuted **${member.user.tag}**!`)
  member.roles.remove(muterole)
  }
})

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return;
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase()
  if (command == 'tempban' || command == 'temp-ban') {
    if (!message.member.hasPermission("BAN_MEMBERS"))return message.channel.send('You dont have ban perms!')
       const time = args[1]
    if (!args[0])return message.channel.send('You need to give me a user or userid!')
    let user = message.mentions.users.first() || message.guild.member.cache.get(args[0])
    if (!user)return message.channel.send('That isn\'t a valid user or userid!')
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if (!time)return message.channel.send('How long do you want to ban that user?')
    let urole = member.roles.highest.position
    let mrole = message.member.roles.highest.position
    if (user.id == message.guild.ownerID)return message.channel.send('You cant ban the owner!')
    if (urole >= mrole)return message.channel.send('That user is above you in the hierarchy!')
    message.guild.members.ban(user).then(() => {
      client.setTimeout(() => message.guild.members.unban(user), ms(time));
    }).catch(err => {
      message.channel.send('I was unable to ban that user, this error most likely accured because of role hierarchy.')
    }).then(() => {
message.channel.send(`Successfully banned **${user}** for ${time}`)
    })
  }
})

client.on('message', message => {
  if (message.author.bot)return;
  if (message.content == '<@!713887515156938833>' || message.content == '<@!713887515156938833>prefix' || message.content == '<@!713887515156938833> prefix') {
    let mention = message.author
    message.channel.send(`Hello ${mention}! My prefix is \`${prefix}\`\nYou can use the \`${prefix}help\` command, to learn my commands!`)
  }
})


client.on('message', message => {
  if(!message.content.startsWith(prefix) || message.author.bot)return
  const args = message.content.slice(prefix.length).trim().split(' ')
  const command = args.shift().toLowerCase()
  if (command == 'purge-user' || command == 'purgeuser') {

  }
})

client.on('message', async message => {

  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(' ');
  const cmd = args.shift().toLowerCase()

  if (cmd == 'lb' || cmd == 'leaderboard') {

      let all = db.all() 
      .filter(base => base.ID.includes('bal'))
      .sort((a, b) => b.data - a.data)
      .filter(x => message.guild.members.cache.get(x.ID.slice(4)))
      let content = [];
    for (let i in all) {
        let entry = all[i++]; // "all" is an array, "i" is the current index the loop is on, so the current entry would be "all[i]"
        let member = message.guild.members.cache.get(entry.ID.slice(4)); // We get the member that holds the current entry's data
      if (member) {
        content.push(`#${i++} \`${member.user.username}\`, Amount: $${entry.data}`)
      }
    }
    let embed = new Discord.MessageEmbed()
      .setAuthor(message.guild.name, message.author.displayAvatarURL({ dynamic: true}))
      .setTitle(`The money leaderboard for ${message.guild.name}`)
      .setDescription(content.slice(0, 10))

    message.channel.send(embed)
  }
});
client.on('message', message => {
if (!message.content.startsWith(prefix) || message.author.bot)return;
const args = message.content.slice(prefix.length).trim().split(' ')
const cmd = args.shift().toLowerCase()
if (cmd == 'afk') {
  let afk = db.set(`afk_${message.guild.id}`)
  if (afk == null)console.log('No afk users!')
  db.push(`afk_${message.guild.id}`, message.author.id)
  message.channel.send('You are now afk!')
  
}
})


  client.on('message', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot)return;
    const args = message.content.slice(prefix.length).trim().split(' ')
    const c = args.shift().toLowerCase()
    if (c == 'poll') {
      let pargs = args.join(" ")
      if (!args[0])return message.channel.send('You need to actually ask something...')
      let embed = new Discord.MessageEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL())
      .setTitle(`${message.author.tag} Asks....`)
      .setDescription(pargs)
      .setFooter(`ID: ${message.author.id}`)
      .setColor(message.member.displayHexColor)
      .setTimestamp();
    let msg = await message.channel.send(embed)
    msg.react('737362033443602464')
    msg.react('737362086023135272')
    message.delete()
    }
  })


client.on('message', async message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return;
  const args = message.content.slice(prefix.length).trim().split(' ')
  const c = args.shift().toLowerCase()
  if (c == 'imgur' || c == 'imgurupload' || c == 'imgur-upload') {
    let pargs = args.join(' ')
    if (!pargs[0] || !message.attachments)return message.channel.send('You need to specify an image link!')
     var Attachment = (message.attachments).array();
    let imglink = Attachment[0].url
    imgur.uploadUrl(args[0] || imglink).then(function (json) {
      message.channel.send(`<${json.data.link}>`)
    }).catch(err => {
      message.channel.send('That isn\'t a valid image link or file!')
    })
  }
})
const killCD = new Set();
client.on('message', async message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return;
  const args = message.content.slice(prefix.length).trim().split(' ');
  const cmd = args.shift().toLowerCase()
  let amount = Math.floor(Math.random() * 100) + 1;
  if (cmd == 'kill') {
    if (killCD.has(message.author.id)) {
      message.channel.send("This command has a 3 hours cooldown!");
  } else {
  
    let job = db.get(`job_${message.author.id}`)
    let inv = db.get(`inven_${message.author.id}`)
    let bal = db.get(`bal_${message.author.id}`)
    if (job !== 'hitman') {
      return message.channel.send('You need to be a hitman to use this command!')
    }
   let user = message.mentions.users.first()
   if (!user)return message.channel.send('Who do you want to "kill"..?')
   let ubal = db.get(`bal_${user.id}`)
   let balam = ubal / 2
   let invam = db.get(`inven_${user.id}`)
   if (inv.indexOf("lock") !== -1) {
     return message.channel.send('That user has a lock, you cant kill them....')
   }
   message.channel.send('There\'s a good chance that you will get caught and lose all of your money, but there is also a chance you will get half of that user\'s money.\nRespond with `y` or `n`')
   message.channel.awaitMessages(m => m.author.id == message.author.id, 
    { max: 1, time: 10000}).then(collected => {
      if (collected.first().content.toLowerCase() == 'y') {
        if (amount > 50) {
          message.channel.send(`You successfully killed ${user}, and you got ${balam}!`)
          db.add(`bal_${message.author.id}`, balam)
          db.subtract(`bal_${user.id}`, balam)
        } else {
          message.channel.send('You tried to kill that user, but they killed you and you lost all of your money!')
          db.subtract(`bal_${message.author.id}`, bal)
        }
      } else if (collected.first().content.toLowerCase() === 'n') {
        message.channel.send('Cancelled...')
      } else {
        message.channel.send('That is not a valid option...')
      }
    }).catch(() => {
message.channel.send('Goodbye, you didn\'t answer in time...')
    })
  } killCD.add(message.author.id);
  setTimeout(() => {
    // Removes the user from the set after a minute
    slott.delete(message.author.id);
  }, ms('3 hours'));
  }
})

client.on('message', async message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return
  const args = message.content.slice(prefix.length).trim().split(' ')
  const cmd = args.shift().toLowerCase()
  if (cmd == 'strength') {
    let user = message.mentions.users.first() || message.author;
    let strength = db.get(`strength_${user.id}`)
    if (strength == null) strength = 0
        let embed = new Discord.MessageEmbed()
    .setAuthor(user.tag, user.displayAvatarURL())
    .setTitle(`${user.tag}'s Strength`)
    .setDescription(strength)
    .setFooter(`ID: ${user.id}`)
    .setTimestamp()
    message.channel.send(embed)
  }
})
let workoutcd = new Set();
client.on('message', async message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return
  const args = message.content.slice(prefix.length).trim().split(' ')
  const cmd = args.shift().toLowerCase()
  if (cmd == 'workout') {
    if (workoutcd.has(message.author.id)) {
      message.channel.send("This command has a 10 minute cooldown!");
  } else {
  let inv = db.get(`inven_${message.author.id}`)
    let amount = Math.floor(Math.random() * 13) + 1;
    let amount2 = Math.floor(Math.random() * 26) + 2;
    let amount3 = Math.floor(Math.random() * 39) + 3;
    let workout = ["Situps", "Pushups", "Stretches", "Squats", "Lunges"]
    let num = Math.floor(Math.random() * workout.length) 
    let newamount = amount
    if (inv == null) {
      newamount = amount
    } else if (inv.indexOf("Energy Drink") !== -1) {
     newamount = amount2
    } else if (inv.indexOf("Pack of Energy Drinks") !== -1){
     newamount = amount3
    } 


    message.channel.send(`You did some ${workout[num]}, so you earned ${newamount} Strength!`)
    db.add(`strength_${message.author.id}`, amount)
  } workoutcd.add(message.author.id);
  setTimeout(() => {
    // Removes the user from the set after a minute
    workoutcd.delete(message.author.id);
  }, 600000);
  }
})

client.on('message', async message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return;
  const args = message.content.slice(prefix.length).trim().split(' ')
  const cmd = args.shift().toLowerCase()
  let amount = Math.floor(Math.random() * 200) + 1;
  let sam = Math.floor(Math.random() * 10) + 1;
  if (cmd === 'fight') {
   let strength = db.get(`strength_${message.author.id}`)
   if (strength == null || strength < 0)return message.channel.send("You need to have atleast `1` strength to use this commamd!")
   let winner = message.author.id
if (!message.mentions.users.first())return message.channel.send('You need to mention someone to fight')
       let user = message.mentions.users.first()
if (db.get(`strength_${user.id}`) > strength) winner = user.id
if (winner == message.author.id) {
  message.reply(`You beat the shit out of ${user}, so you earned ${amount}$, and ${sam} strength!`)
  db.add(`bal_${message.author.id}`, amount)
  db.add(`strength_${message.author.id}`, sam)
} else {
  message.reply(`${user} Beat you up, so they won ${sam} Strength!`)
  db.add(`strength_${user.id}`, sam)
}
  }
})



client.on('message', async message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return;
  const args = message.content.slice(prefix.length).trim().split(' ')
  const cmd = args.shift().toLowerCase()
  if (cmd == 'qoute') {
    let qoutes = ["If you wait too long for the perfect moment, the perfect moment will pass you by.\n~Author Unknown", "Faith is not belief without proof, but trust without reservation.\n~D. Elton Trueblood", "Progress always involves risks. You can't steal second base and keep your foot on first.\n~Frederick B Wilcox", "If more of us valued food and cheer and song above hoarded gold, it would be a merrier world.\n~J.R.R. Tolkien"]
    let num = Math.floor(Math.random() * qoutes.length)
    message.channel.send(qoutes[num])
  
  }
})


client.on('message', async message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return;
  const args = message.content.slice(prefix.length).trim().split(' ')
  const cmd = args.shift().toLowerCase()
  if (cmd == 'color') {
    let pargs = args.toString()
    let newcol = pargs.replace('#', '')
    function isHexColor (hex) {
      return typeof hex === 'string'
          && hex.length === 6
          && !isNaN(Number('0x' + hex))
    }
    
    // or as arrow function (ES6+)
    isHexColor = hex => typeof hex === 'string' && hex.length === 6 && !isNaN(Number('0x' + hex))
        if (!isHexColor(newcol))return message.channel.send('That is not a valid HEX code!')    
    String.prototype.convertToRGB = function(){
      if(this.length != 6){
          throw "Only six-digit hex colors are allowed.";
      }
    
      var aRgbHex = this.match(/.{1,2}/g);
      var aRgb = [
          parseInt(aRgbHex[0], 16),
          parseInt(aRgbHex[1], 16),
          parseInt(aRgbHex[2], 16)
      ];
      return aRgb;
    }
    var rgbToHex = function (rgb) { 
      var hex = Number(rgb).toString(16);
      if (hex.length < 2) {
           hex = "0" + hex;
      }
      return hex;
    };
    var fullColorHex = function(r,g,b) {   
      var red = rgbToHex(r);
      var green = rgbToHex(g);
      var blue = rgbToHex(b);
      return red+green+blue;
    };
        let newtino = newcol.convertToRGB();
    let link = `https://dummyimage.com/600x400/${newcol}/${newcol}`
    let embed = new Discord.MessageEmbed()
    .setColor(newcol.toUpperCase())
    .setAuthor(message.author.tag, message.author.displayAvatarURL())
    .setFooter(message.guild.name, message.guild.iconURL())
    .setDescription(`Hex color: \`#${newcol.toUpperCase()}\`\n\nRgB Color: (\`${newtino}\`)`)
    .setThumbnail(link)
    let msg = args.join(' ')
    if (!args[0])return message.channel.send('You need to enter a hex code..')
    // regular function
    message.channel.send(embed);
    console.log(args[0])
  }
})


client.on("ready", () => {
  client.user.setActivity('for @PotatoPolice | Credit to Heracleum for potato police image', { type: 'LISTENING'});
});


client.on('message', async message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return;
  const args = message.content.slice(prefix.length).trim().split(' ')
  const cmd = args.shift().toLowerCase()
  if (cmd == 'love') {
    let love = Math.floor(Math.random() * 100)
    let loveindex = Math.floor(love / 10)
    let lovelevel = "💖".repeat(loveindex) + "💔".repeat(10 - loveindex)
    let user = message.mentions.users.first()
    if (!user) {
      return message.channel.send('You need to mention someone...')
    }
    let output = "Not compatible"
    if (love >= 70) output = "Very compatible"
    if (love == 100) output = "100% compatible!!"
    if (love <= 69 && love >= 25) output = "Sort of compatible"
    if (love <= 71 && love >= 99) output = "Perfect for each other!!"
    let embed = new Discord.MessageEmbed()
    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true}))
    .setTitle(`${user.username} and ${message.author.username}'s love percentage`)
    .setDescription(`${love}%\nYou guys are ${output}\n${lovelevel}`)
    message.channel.send(embed)
  }
})
let facts = require('facts-generator')

client.on('message', async message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return;
  const args = message.content.slice(prefix.length).trim().split(' ')
  const cmd = args.shift().toLowerCase()
  if (cmd == 'funfacts') {
    let fact = db.get(`facts_${message.guild.id}_${message.channel.id}`, 'Off')
    let factchan = db.get(`factschan_${message.guild.id}_${message.channel.id}`, 'none')
    if (fact == 'Off') {
      message.channel.send(`Successfully enabled daily facts in ${message.channel}`)
      db.set(`facts_${message.guild.id}_${message.channel.id}`, 'On')
      db.set(`factschan_${message.guild.id}_${message.channel.id}`, message.channel.id)
    } else {
message.channel.send(`Successfully disabled daily facts in ${message.channel}`)
      db.set(`facts_${message.guild.id}_${message.channel.id}`, 'Off')
      db.set(`factschan_${message.guild.id}_${message.channel.id}`, 'none')
    }
}
})
const fetchFact = facts.getFact()
console.log(fetchFact.fact + " - " + fetchFact.category);

client.on('ready', () => {
  client.channels.cache.forEach(chan => {
    let chany = chan.id
  client.guilds.cache.forEach(guild => {
    let facts = db.get(`facts_${guild.id}_${chany}`)
    let factchan = db.get(`factschan_${guild.id}_${chan.id}`)
    if (factchan == null || factchan == 'none')return;
    let newthing = guild.channels.resolve(factchan)
    if (facts == 'Off')return;
    client.setInterval(() => newthing.send(fetchFact.fact + " - " + fetchFact.category), 10000)
    
  })
      })
})
let random = require('@hugo26/randomid-generator')
 
client.on('message', async message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return;
  const args = message.content.slice(prefix.length).trim().split(' ')
  const cmd = args.shift().toLowerCase()
  if (cmd === 'warn') {
    let warnid = random(9)
    if (!message.member.hasPermission('ADMINISTRATOR') || !message.member.hasPermission("MANAGE_ROLES") && message.author.id !== message.guild.ownerID) {
      return message.channel.send('You dont have permission to use this command!')
    }
    if (!message.mentions.users.first()) {
      return message.channel.send('You need to mention someone to warn...')
    } 
    let user = message.mentions.users.first()
    let member = message.mentions.members.first()
    let pos1 = message.member.roles.highest.position
    let pos2 = member.roles.highest.position
    if (user.id == message.guild.ownerID) {
      return message.channel.send('You cant warn the owner')
    }
    if (user.id == message.author.id) {
      return message.channel.send('You cant warn yourself!')
    }
    if (pos1 <= pos2) {
      return message.channel.send('That user is above you in the hierarchy')
    }
    let reason = args.join(' ').slice(2)
    if (!reason) reason = `${message.author.tag} No reason provided`
    let warns = db.get(`warns_${user.id}`)
    let reas = db.get(`reason_${warnid}`)
    message.channel.send(`Successfully warned **${user.tag}**, with the reason:\`${reason}\`\nID: ${warnid}`).then(() => {
        db.add(`warns_${user.id}_${message.guild.id}`, 1)
        db.set(`reason_${warnid}_${message.guild.id}`, reason)
        db.set(`mod_${warnid}_${message.guild.id}`, `<@!${message.author.id}>`)
        db.set(`person_${warnid}_${message.guild.id}`, `${user.id}`)
        db.set(`person2_${warnid}_${message.guild.id}`, `<@!${user.id}>`)
    })
  } else if (cmd == 'warn-case' || cmd == 'warncase') {
    if (!args[0]) {
      return message.channel.send('You need to specify a case ID')
    }
    let warny = args[0]
    if (db.get(`reason_${warny}_${message.guild.id}`) == null) {
      return message.channel.send('That is not a valid case id')
    }
    let user = message.guild.members.resolve(db.get(`person_${warny}_${message.guild.id}`))
    let member = message.guild.members.cache.get(user)
   let embed = new Discord.MessageEmbed()
   .setAuthor(user.user.tag, user.user.displayAvatarURL({dynamic: true}))
   .addField("**Responsible Moderator**", db.get(`mod_${warny}_${message.guild.id}`))
   .addField("**User who was warned**", `${db.get(`person2_${warny}_${message.guild.id}`)}(${db.get(`person_${warny}_${message.guild.id}`)})`)
   .addField("**Reason:**", db.get(`reason_${warny}_${message.guild.id}`))
   .setFooter(`Warn ID: ${warny}`)
   .setColor(user.displayHexColor)
   .setTimestamp();
   message.channel.send(embed)
  } else if (cmd == 'removewarn') {
    if (!args[0]) {
      return message.channel.send('You need to give me a warn id so I can remove it..')
    }
    if (db.get(`reason_${args[0]}_${message.guild.id}`) == null) {
      return message.channel.send('That is not a valid warn id!')
    }
    let warnid = args[0]
    message.channel.send("Warn successfully removed!").then(() => {
      let userid = db.get(`person_${warnid}_${message.guild.id}`)
      db.subtract(`warns_${userid}_${message.guild.id}`, 1)
      db.delete(`reason_${warnid}_${message.guild.id}`)
      db.delete(`mod_${warnid}_${message.guild.id}`)
      db.delete(`person2_${warnid}_${message.guild.id}`)
      db.delete(`person_${warnid}_${message.guild.id}`)

    })
  } else if (cmd == 'warns') {
    let user = message.mentions.users.first() || message.author;
    let warns = db.get(`warns_${user.id}`)
    if (warns == null) warns = 0;
    let embed = new Discord.MessageEmbed()
    .setTitle(`${user.tag}'s warns`)
    .setDescription(warns)
    message.channel.send(embed)

  }
})

client.on('message', async message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return;
  const args = message.content.slice(prefix.length).trim().split(' ')
  const cmd = args.shift().toLowerCase()
  if (cmd === 'censor') {
    if (!message.member.hasPermission("ADMINISTARTOR") || !message.member.hasPermission("MANAGE_GUILD")) {
      return message.channel.send('You need the `administrator` or `manage_server` permission to use this command')
    }
    let badwords = db.get(`badwords_${message.guild.id}`, { words: [] })
    if (!args[0]) {
        return message.channel.send('What word would you like to blacklist?')
    
      
       
    } else if (args[0].toLowerCase() == 'list') {
      if (badwords == null) badwords = 'None'
      let embed = new Discord.MessageEmbed()
      .setTitle(`Blacklisted words in ${message.guild.name}`)
      .setDescription(badwords)
      message.channel.send(embed)
    } else if (args[0].toLowerCase() == 'remove') {
      if (!args[1]) {
        return message.channel.send('What word do you want to remove...')
      }
      else if (badwords.indexOf(args[1].toLowerCase()) == -1) {
        return message.channel.send('That word isn\'t censored in this server')
      }
     message.channel.send(`I removed the word ${args[1]} from your blacklisted words!`)
  } else if (args[0].toLowerCase() === 'clear') {
    message.channel.send("Are you sure you want to clear all of this server's censored words?\nRespond with `y` or `n`")
    message.channel.awaitMessages(m => m.author.id == message.author.id,
      {max: 1, time: 10000}).then(collected => {
        if (collected.first().content.toLowerCase() == 'y') {
          message.channel.send('I successfully cleared all of your censored words!').then(() => {
            db.delete
            (`badwords_${message.guild.id}`)
          })
        } else if (collected.first().content.toLowerCase() == 'n') {
          message.channel.send(`Cancelled!`)
        } else {
          message.channel.send('That isn\'t a valid option!')
        }
      }).catch(() => {
        message.channel.send('No answer in 10 seconds, goodbye..')
      })
  } else if (args[0].toLowerCase() == 'help') {
    let embed = new Discord.MessageEmbed()
    .setAuthor('Subcommands for Censor')
    .setDescription('Run the command like this `l!censor word` to blacklist a word\n`list` - Lists all of your blacklisted words\n`remove` - Allows you to remove a blacklisted word\n`clear` - Clears all of your blacklisted words')
    .setThumbnail(client.user.displayAvatarURL())
    .setColor(message.member.displayHexColor)
    message.channel.send(embed)
  }
  else {
      message.channel.send(`I added the word ${args[0]} to your blacklisted words!`).then(() => {
        db.push(`badwords_${message.guild.id}`, args[0].toLowerCase())
      })
   
  }
}
})
    
client.on('message', async message => {
  if (message.author.bot)return;
  const arr = db.get(`badwords_${message.guild.id}`, { words: [] })
  if (arr == null)return;
const str = message.content;

for (let i = 0; i < arr.length; i++) {
  const elem = arr[i];
  
  if (str.toLowerCase().includes(elem)) {
    if (message.member.hasPermission("ADMINISTRATOR") || message.member.hasPermission("MANAGE_GUILD") || message.author.id == message.guild.ownerID)return;
    message.delete().then(() => {
    message.author.send(`You have been warned in ${message.guild.name} because you said the blacklisted word \`${elem}\`!`)
    })
  }
}

})

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return;
  const args = message.content.slice(prefix.length).trim().split(' ')
  const cmd = args.shift().toLowerCase()
  if (cmd == 'bubblewrap') {
    message.channel.send('||pop||||pop||||pop||||pop||||pop||||pop||\n||pop||||pop||||pop||||pop||||pop||||pop||\n||pop||||pop||||pop||||pop||||pop||||pop||\n||pop||||pop||||pop||||pop||||pop||||pop||\n||pop||||pop||||pop||||pop||||pop||||pop||\n||pop||||pop||||pop||||pop||||pop||||pop||\n')
  }
})


client.on('message', async message => {
  const args = message.content.slice(prefix.length).trim().split(' ')
  const cmd = args.shift().toLowerCase()
if (cmd == 'invite') {
   message.channel.send('Invite me please....!\nhttps://discord.com/api/oauth2/authorize?client_id=713887515156938833&permissions=8&scope=bot')
 }
  })

const Hashids = require('hashids/cjs')
const hashids = new Hashids()
client.on('message', message => {
 let levels = db.all().filter(base => base.ID.startsWith('lvl') && !base.ID.startsWith('lvl_chan')).sort((a, b) => b.data - a.data)
 let content = "";
for (let i = 0; i < levels.length; i++) {
  let another = levels[i]
  let member = message.guild.members.cache.get(another.ID.slice(4, 19))
    content = another
}
  })
