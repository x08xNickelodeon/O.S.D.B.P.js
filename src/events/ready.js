const mongoose = require('mongoose');
const mongoURL = process.env.mongoURL;
const { Client, Events, Guild } = require('discord.js');
const clc = require("cli-color")
require('dotenv').config();
const fs = require('fs');
const config = JSON.parse(fs.readFileSync("./config.json", "utf8"));

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        if (!mongoURL) return;
            
        await mongoose.connect(mongoURL || '');
        if (mongoose.connect) {
            console.log(clc.xterm(49).bgBlack('Database has been connected'));
        } else {
            console.log(clc.red.bgBlack('Database has failed to connect'));
        }
        console.log(' ')
        console.log(clc.white.bold('―――――――――――――――Modules―――――――――――――――'))
        if (config.welcome.enabled == true) {
            console.log(clc.green.bgBlack('Welcome module enabled'))
        } else {
            console.log(clc.red.bgBlack('Welcome module disabled'))
        }
        if (config.pingModule == true) {
            console.log(clc.green.bgBlack('Bot ping module enabled'))
        } else {
            console.log(clc.red.bgBlack('Bot ping module disabled'))
        }
        console.log(clc.white.bold('―――――――――――――――――――――――――――――――――――――'))
        console.log(" ");
        console.log(clc.cyan('Main guild is ') + clc.magenta.bold(config.guildid));
        console.log(" ");
        console.log(clc.green(`${client.user.username} Is now runnning! `) + clc.cyanBright.bold('(Free package)'));
        console.log(" ");
        console.log(clc.yellow.bold('――――――――――――――――――――――Bot Logs――――――――――――――――――――――'))
        
        async function pickPresence () {
            const option = Math.floor(Math.random() * statusArray.length);

            try {
                await client.user.setPresence({
                    activities: [
                        {
                            name: statusArray[option].content,
                            type: statusArray[option].type,

                        },
                    
                    ],

                    status: statusArray[option].status
                })
            } catch (error) {
                console.error(error);
            }
        }  

    },
};