const { REST } = require("@discordjs/rest");
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
const clc = require("cli-color");
require('dotenv').config();
const config = JSON.parse(fs.readFileSync("./config.json", "utf8"));
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const clientId = config.clientid; 
const guildId = config.guildid; 

module.exports = (client) => {
    client.handleCommands = async (commandFolders, path) => {
        client.commandArray = [];
        for (folder of commandFolders) {
            const commandFiles = fs.readdirSync(`${path}/${folder}`).filter(file => file.endsWith('.js'));
            for (const file of commandFiles) {
                const command = require(`../commands/${folder}/${file}`);
                client.commands.set(command.data.name, command);
                client.commandArray.push(command.data.toJSON());
            }
        }

        const rest = new REST({
            version: '9'
        }).setToken(process.env.token);

        (async () => {
            try {
                console.clear();
                console.log(clc.blue('Open source bot template made by x08xNickelodeon on discord'));
                console.log(clc.cyan('https://github.com/x08xNickelodeon/O.S.D.B.P.js'));
                console.log(' ');
                console.log(clc.yellow('Started refreshing application (/) commands.'));

                await rest.put(
                    Routes.applicationCommands(clientId), {
                        body: client.commandArray
                    },
                );

                console.log(clc.greenBright('Successfully reloaded application (/) commands.'));
                console.log(clc.white.bold('―――――――――――――――Commands――――――――――――――'))
                for (folder of commandFolders) {
                    const commandFiles = fs.readdirSync(`${path}/${folder}`).filter(file => file.endsWith('.js'));
                    for (const file of commandFiles) {
                        const command = require(`../commands/${folder}/${file}`);
                        console.log(clc.green(`[✓] ${command.data.name}`))
                    }
                }
                console.log(clc.white.bold('―――――――――――――――――――――――――――――――――――――'))
            } catch (error) {
                console.error(error);
            }
        })();
    };
};