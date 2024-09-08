const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const fs = require('fs');
const os = require('os');
const glob = require('glob');

function getTotalLines() {
    return new Promise((resolve, reject) => {
        try {
            const files = glob.sync('/home/container/**/*.js', { ignore: '/home/container/node_modules/**' });
            const totalLines = files.reduce((sum, file) => sum + fs.readFileSync(file, 'utf8').split('\n').length, 0);
            resolve(totalLines);
        } catch (err) {
            reject(err);
        }
    });
}

module.exports = {
    data: new SlashCommandBuilder()
    .setName(`botstats`)
    .setDescription(`Gives some bot stats/Info`),
    async execute (interaction, client) {
 
        const memoryUsage = process.memoryUsage();
        const heapUsed = `${Math.round(memoryUsage.heapUsed / 1024 / 1024)} MB`;
        const heapTotal = `${Math.round(memoryUsage.heapTotal / 1024 / 1024)} MB`;
        const icon = `${client.user.displayAvatarURL()}`;
        let servercount = await client.guilds.cache.reduce((a,b) => a+b.memberCount, 0);
        let lines = "0"
        await getTotalLines().then(totalLines => {
            lines = totalLines
        }).catch(err => {
            lines = "Err"
        });
 
        let totalSeconds = (client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);
 
        let uptime = `${days} days, ${hours} hours, ${minutes} minute(s) & ${seconds} seconds`;
 
        let ping = `${Date.now() - interaction.createdTimestamp}ms.`;
 
        const embed = new EmbedBuilder()
        .setColor("Blurple")
        .setThumbnail(`${icon}`)
        .setTimestamp()
        .addFields({ name: 'Total Servers', value: `${client.guilds.cache.size}`, inline: true})
        .addFields({ name: 'Total Members', value: `${servercount}`, inline: true})
        .addFields({ name: 'Lines of code', value: `${lines.toLocaleString()}`, inline: true})
        .addFields({ name: 'Latency', value: `${ping}`, inline: true})
        .addFields({ name: 'Uptime', value: `${uptime}`, inline: true})
        .addFields({ name: 'Cpu', value: `> ${os.cpus().map(i => `${i.model}`)[0]}`, inline: true})
        .addFields({ name: 'Ram', value: `${heapUsed}/${heapTotal}`, inline: true})

 
        await interaction.reply({ embeds: [embed] });
 
    }
}