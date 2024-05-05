const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder, ChannelType } = require('discord.js');
const fs = require('fs');
const config = JSON.parse(fs.readFileSync("./config.json", "utf8"));

module.exports = {
    data: new SlashCommandBuilder()
    .setName(`config-dump`)
    .setDescription(`Gives you your bot's config file`)
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),
    async execute (interaction, client) {
        if (interaction.user.id == config.ownerid) {
            await interaction.reply({ content: "Here is your config", files: ['./config.json'], ephemeral: true });
        } else {
            await interaction.reply({ content: "Your not supposed to see that", files: ['./images/warning.png'], ephemeral: true });
            //You can change in the image if you want
        }
 
    }
}