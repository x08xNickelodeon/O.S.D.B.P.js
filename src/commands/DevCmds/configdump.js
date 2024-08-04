const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

function formatValue(value) {
    if (Array.isArray(value)) {
        return value.map(item => formatValue(item)).join('\n');
    } else if (typeof value === 'object' && value !== null) {
        return Object.entries(value)
            .map(([key, val]) => `${key}: ${formatValue(val)}`)
            .join('\n');
    } else {
        return JSON.stringify(value);
    }
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('config-dump')
        .setDescription('Lists the contents of the bot\'s config file')
        .setDefaultPermission(false),
    async execute(interaction, client) {
        try {
            const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
            if (interaction.user.id = config.ownerid) {
                let configMessage = 'Here is the config data:\n\n';
                for (const [key, value] of Object.entries(config)) {
                    configMessage += `${key}:\n${formatValue(value)}\n\n`;
                }
                await interaction.reply({ content: configMessage, ephemeral: true });
            } else {
                await interaction.reply({ content: 'You are not authorized to use this command.', ephemeral: true });
            }
        } catch (error) {
            console.error('Error reading config file:', error);
            await interaction.reply({ content: 'Error reading config file.', ephemeral: true });
        }
    },
};
