const { REST } = require("@discordjs/rest");
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
const clc = require("cli-color");
require('dotenv').config();
const ascii = require("ascii-table");
const table = new ascii().setTitle("Commands").setHeading("File Name", "Status", "Size");

module.exports = (client) => {
    const clientId = client.config.clientid; 
    const guildId = client.config.guildid; 
    console.clear();
    console.log(clc.blue('Open source bot template made by x08xNickelodeon on discord'));
    console.log(clc.cyan('https://github.com/x08xNickelodeon/O.S.D.B.P.js'));
    client.handleCommands = async (commandFolders, path) => {
        client.commandArray = [];
        for (folder of commandFolders) {
            const commandFiles = fs.readdirSync(`${path}/${folder}`).filter(file => file.endsWith('.js'));
            for (const file of commandFiles) {
                const command = require(`../commands/${folder}/${file}`);
                client.commands.set(command.data.name, command);
                client.commandArray.push(command.data.toJSON());
                if (command.name) {
                    client.commands.set(command.name, command);
                    table.addRow(command.name, "Loaded");
            
                    if (command.aliases && Array.isArray(command.aliases)) {
                        command.aliases.forEach((alias) => {
                            client.aliases.set(alias, command.name);
                        });
                    }
                } else {
                    table.addRow(file, "Loaded");
                    continue;
                };
            };
        };
        const rest = new REST({
            version: '9'
        }).setToken(process.env.token);

        (async () => {
            try {
                console.log(' ');
                await rest.put(
                    Routes.applicationCommands(clientId), {
                        body: client.commandArray
                    },
                );
                console.log(clc.yellow('Started refreshing application (/) commands.'));
                console.log(`${table.toString()}`);
                console.log(clc.greenBright('Successfully reloaded application (/) commands.'));
            } catch (error) {
                console.error(error);
            };
        })();
    };
};