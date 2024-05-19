const mongoose = require('mongoose');
const mongoURL = process.env.mongoURL;
const { Client, Events, Guild, ActivityType } = require('discord.js');
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
        console.log(' ')
        console.log(clc.white.bold('―――――――――――――――Modules―――――――――――――――'))
        if (config.welcome.enabled == true) {
            console.log(clc.green.bgBlack('[✓] Welcome module enabled'))
        } else {
            console.log(clc.red.bgBlack('[✕] Welcome module disabled'))
        }
        if (config.pingModule == true) {
            console.log(clc.green.bgBlack('[✓] Bot ping module enabled'))
        } else {
            console.log(clc.red.bgBlack('[✕] Bot ping module disabled'))
        }
        if (config.leave.enabled == true) {
            console.log(clc.green.bgBlack('[✓] Leave module enabled'))
        } else {
            console.log(clc.red.bgBlack('[✕] Leave module disabled'))
        }
        console.log(clc.white.bold('―――――――――――――――――――――――――――――――――――――'))
        console.log(" ");
        if (mongoose.connect) {
            console.log(clc.green('[✓] Database has been connected'));
        } else {
            console.log(clc.red('[✕] Database has failed to connect'));
        }
        console.log(" ");
        console.log(clc.green(`[✓] ${client.user.username} Is now runnning! `) + clc.cyanBright.bold(`(Version ${config.version})`));
        var getData = await fetch(`https://osdbp.berrry.host/version?name-${client.user.username}`);
        var respones = await getData.json();
        if (config.version == respones) {
            console.log(clc.green(`[✓] Your Template is up to date`))
        } else {
            console.log(clc.red(`[✕] Your Template needs a update. Current version is ${respones}`))
        }
        console.log(" ")
        console.log(clc.cyan('Main guild is ') + clc.cyanBright(config.guildid));
        console.log(" ");
        console.log(clc.yellow.bold('――――――――――――――――――――――Bot Logs――――――――――――――――――――――'))

        if (config.status.enabled == true) {
            client.user.setActivity({
                state: config.status.text,
                name: "customstatus",
                type: ActivityType.Custom
            });
        }
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