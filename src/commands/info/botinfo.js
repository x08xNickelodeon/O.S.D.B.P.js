const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const os = require('os');
require('dotenv').config();
const fs = require('fs');
const config = JSON.parse(fs.readFileSync("./config.json", "utf8"));

module.exports = {
    data: new SlashCommandBuilder()
    .setName(`botstats`)
    .setDescription(`Gives some bot stats`),
    async execute (interaction, client) {
 
        const ram2 = process.memoryUsage().external / 1024 / 1024 / 2;
        const ram3 = process.memoryUsage().heapTotal / 1024 / 1024 + ram2;
        const ram = Math.trunc(ram3);
        const name = client.user.name;
        const icon = `${client.user.displayAvatarURL()}`;
        let servercount = await client.guilds.cache.reduce((a,b) => a+b.memberCount, 0);
 
        let totalSeconds = (client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);
 
        let uptime = `${days} days, ${hours} hours, ${minutes} minute(s) & ${seconds} seconds`;
 
        let ping = `${Date.now() - interaction.createdTimestamp}ms.`;
 
        const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setLabel(`Free Hosting`)
            .setStyle(ButtonStyle.Link)
            .setURL(`https://discord.gg/8xd6TG6F24`)
        )
 
        const embed = new EmbedBuilder()
        .setColor("Blurple")
        .setThumbnail(`${icon}`)
        .setFooter({ text: `Bot ID: ${config.botid}`})
        .setTimestamp()
        .addFields({ name: 'Total Commands Ran', value: `${config.totalCommandsRan}}`, inline: true})
        .addFields({ name: 'Server Number', value: `${client.guilds.cache.size}`, inline: true})
        .addFields({ name: 'Server Members', value: `${servercount}`, inline: true})
        .addFields({ name: 'Latency', value: `${ping}`, inline: true})
        .addFields({ name: 'Uptime', value: `${uptime}`, inline: true})
        .addFields({ name: 'Cpu', value: `> ${os.cpus().map(i => `${i.model}`)[0]}`, inline: true})

 
        await interaction.reply({ embeds: [embed], components: [row] });
 
    }
}