require('dotenv').config();

//console.log(process.env.DISCORDJS_BOT_TOKEN)

const {Client,Intents,WebhookClient}=require('discord.js')



//const client = new Client()
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] , partials: ['MESSAGE', 'REACTION']});
const PREFIX = "$";

// const webhookClient = new WebhookClient( 
//   process.env.WEBHOOK_ID,
//   process.env.WEBHOOK_TOKEN,
// );

client.on('ready',()=>{
    console.log(`${client.user.username}`)
})

client.on('message',async(message)=>{
    if (message.author.bot) return;
    //console.log(`[${message.author.tag}]: ${message.content}`)
    if(message.content.startsWith(PREFIX)){
      const [CMD_NAME,...args]=message.content
      .trim()
      .substring(PREFIX.length)
      .split(/\s+/)
      if(CMD_NAME==='kick'){
        if(!message.member.permissions.has('KICK_MEMBERS')) return message.reply('You do not have the permission to use that command')
        if(args.length ===0) return message.reply('Please provide ID')
        const member=message.guild.members.cache.get(args[0]);
         
        if(member){
          member.kick()
          .then((member)=> message.channel.send(`${member} was kicked`))
          .catch((err)=>message.channel.send('I do not have permission :( '))
        }else{
          message.channel.send('That member was not found')
        } 
      } else if (CMD_NAME==='ban'){
        if(!message.member.permissions.has('BAN_MEMBERS')) return message.reply('You do not have the permission to use that command')
        if(args.length ===0) return message.reply('Please provide ID')
        try{
            const user = await message.guild.members.ban(args[0])
          //  console.log(user)
          message.channel.send('User was banned successfully')
        } catch(err){
          //console.log(err);
          message.channel.send('An error occured')
        }
      }else if(CMD_NAME==='announce'){
        console.log(args) 
        const msg=args.join(' ');
        console.log(msg)
        webhookClient.send(msg) 
      }
      
    }
})

client.on('messageReactionAdd', (reaction, user) => {
  const { name } = reaction.emoji;
  const member = reaction.message.guild.members.cache.get(user.id);
  if (reaction.message.id === '738666523408990258') {
    switch (name) {
      case '🍎':
        member.roles.add('738664659103776818');
        break;
      case '🍌':
        member.roles.add('738664632838782998');
        break;
      case '🍇':
        member.roles.add('738664618511171634');
        break;
      case '🍑':
        member.roles.add('738664590178779167');
        break;
    }
  }
});

client.on('messageReactionRemove', (reaction, user) => {
  const { name } = reaction.emoji;
  const member = reaction.message.guild.members.cache.get(user.id);
  if (reaction.message.id === '738666523408990258') {
    switch (name) {
      case '🍎':
        member.roles.remove('738664659103776818');
        break;
      case '🍌':
        member.roles.remove('738664632838782998');
        break;
      case '🍇':
        member.roles.remove('738664618511171634');
        break;
      case '🍑':
        member.roles.remove('738664590178779167');
        break;
    }
  }
});
//983713183283945522

client.login(process.env.DISCORDJS_BOT_TOKEN)