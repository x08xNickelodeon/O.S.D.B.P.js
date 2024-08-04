const { EmbedBuilder } = require('discord.js'); 
const fs = require('fs');
require('dotenv').config();
const config = JSON.parse(fs.readFileSync("./config.json", "utf8"));

module.exports = {
    name: 'ping',
    async execute(message, client) {

        const embed = new EmbedBuilder()
        .setAuthor({ name: `${client.user.username}`})
        .setTitle(`${client.user.username} **ping** command`)
        .setDescription(`> Pong! ${client.ws.ping}ms`)
        .setColor(config.themecolor)
        .setFooter({ text: `Requested by ${message.author.username}`, iconURL: message.author.avatarURL() })
        .setTimestamp()

        message.channel.send({ embeds: [embed] });
    }
}