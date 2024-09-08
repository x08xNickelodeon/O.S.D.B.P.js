const mongoose = require('mongoose');
require('dotenv').config();
const mongoURL = process.env.mongoURL;
const { ActivityType } = require('discord.js');
const clc = require("cli-color")

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        if (!mongoURL) return;
        await mongoose.connect(mongoURL || '');
        console.log(" ");
        if (mongoose.connect) {
            console.log(clc.green('[✓] Database has been connected'));
        } else {
            console.log(clc.red('[✕] Database has failed to connect'));
        }
        console.log(" ");
        console.log(clc.green(`[✓] ${client.user.username} Is now runnning! `) + clc.cyanBright.bold(`(Version ${client.config.version})`));
        console.log(" ")
        var getData = await fetch(`https://techbyte.host/osdbp/version`);
        var respones = await getData.json();
        if (client.config.version == respones) {
            console.log(clc.green(`[✓] Your Template is up to date`))
        } else {
            console.log(clc.red(`[✕] Your Template needs a update. Current version is ${respones}`))
        }
        console.log(" ")
        console.log(clc.cyan('Main guild is ') + clc.cyanBright(client.config.guildid));
        console.log(" ");
        console.log(clc.yellow.bold('――――――――――――――――――――――Bot Logs――――――――――――――――――――――'));

        if (client.config.status.enabled == true) {
            client.user.setActivity({
                state: client.config.status.text,
                name: "customstatus",
                type: ActivityType.Custom
            });
        }
    },
};