const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'messageCreate',
    async execute (message, client) {
        async function sendMessage(reply) {
            const embed = new EmbedBuilder()
            .setColor("Green")
            .setTitle('Want to use me?')
            .setDescription('Type / and look at my commands')
            .setTimestamp()
 
            if (!reply) {
                await message.reply({ embeds: [embed] })
            } else {
                embed.setFooter({ text: `If this message should not have been sent, use the delete button below.` })
 
                const button = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('replymsgDelete')
                    .setLabel(':wastebasket:')
                    .setStyle(ButtonStyle.Danger)
                );
 
                const msg = await message.reply({ embeds: [embed], components: [button] });
                const collector = await msg.createMessageComponentCollector();
                collector.on('collect', async i => {
                    if (i.customId == 'replymsgDelete') {
                        await msg.delete();
                    }
                })
            }
        }
 
        if (message.mentions.users.first() == client.user) {
            if (message.reference) {
                await sendMessage(true)
            } else {
                await sendMessage()
            }
        }
    }
}