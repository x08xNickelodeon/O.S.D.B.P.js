const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, MessageManager, Embed, Collection } = require(`discord.js`);
const fs = require('fs');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers] }); 
const clc = require("cli-color");

client.commands = new Collection();
//function sendsomeMessage() {
//    const ram2 = process.memoryUsage().external / 1024 / 1024 / 2;
//    const ram = process.memoryUsage().heapTotal / 1024 / 1024 + ram2;
//    const ram3 = Math.trunc(ram);
//    console.log(`${ram3}mb of ram usage`)
//};
//setInterval(sendsomeMessage, 6000);

require('dotenv').config();

const functions = fs.readdirSync("./src/functions").filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync("./src/events").filter(file => file.endsWith(".js"));
const commandFolders = fs.readdirSync("./src/commands");

process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection at:', promise, 'reason:', reason);
});

(async () => {
    for (file of functions) {
        require(`./functions/${file}`)(client);
    }
    client.handleEvents(eventFiles, "./src/events");
    client.handleCommands(commandFolders, "./src/commands"); 
    client.login(process.env.token)
})();
const config = JSON.parse(fs.readFileSync("./config.json", "utf8"));

client.on('guildMemberAdd', member => {
    // Get the channel where you want to send the welcome message
    if (config.welcome.enabled == true) {
        if (member.guild != config.guildid) {
            return;
        } else {
            const ch = config.welcome.channelID
            const channel = member.guild.channels.cache.get(ch)
            const embed = new EmbedBuilder()
              .setColor(`${config.welcome.embed.color}`)
              .setTitle(config.welcome.embed.title)
              .setDescription(config.welcome.embed.description)
              .setThumbnail(member.user.avatarURL({ dynamic: true }))
              .setTimestamp();
  
    // Send the welcome message to the channel
            if (config.welcome.pingmember == true) {
                channel.send({ content: `<@${member.user.id}>` })
            }
            channel.send({ embeds: [embed] })
            console.log(clc.xterm(119)(`${member.user.username} Has joined the discord`))
            if (config.welcome.grantRole == true) {
                const role = config.welcome.roleID
                member.roles.add(role);
                console.log(clc.xterm(120)(` ∟${role} added to member`))
            }
        }
    }
    
  });

client.on('guildMemberRemove', member => {
    // Get the channel where you want to send the welcome message
    if (config.leave.enabled == true) {
        if (member.guild != config.guildid) {
            return;
        } else {
            const cha = config.leave.channelID
            const channel = member.guild.channels.cache.get(cha)
            const embed = new EmbedBuilder()
              .setColor(`${config.leave.embed.color}`)
              .setTitle(config.leave.embed.title)
              .setDescription(config.leave.embed.description)
              .setThumbnail(member.user.avatarURL({ dynamic: true }))
              .setTimestamp();
            channel.send({ content: `<@${member.user.id}>`, embeds: [embed] })
            console.log(clc.xterm(119)(`${member.user.username} Has left the discord`))
        }
    }
    
  });
