const express = require('express');
const app = express();
const path = require("path");
const clc = require("cli-color");
const axios = require("axios");
const config = require("./config.json")
const fs = require('fs');
const expressip = require('express-ip');
const BannedIps = ["none"];
const { EmbedBuilder, PermissionsBitField, Embed } = require(`discord.js`);


async function sendDiscordWebhook(title, message) {
  try {
    const embed = new EmbedBuilder()
    .setColor(config.website.themecolor)
    .setTitle(title)
    .setDescription(message)
    .setTimestamp();
    await axios.post(config.website.logs.webhook, { embeds: [embed] });
  } catch (error) {
    console.error("Error sending webhook:", error.message);
  }
}

//-------------------------------Main WebSite----------------------------------------------------------

app.use(expressip().getIpInfoMiddleware);

app.listen(config.website.port, () => {
    console.log(clc.green(`Web Server Started on port: ${config.website.port}`))
    sendDiscordWebhook("WebServer", `Web Server Started on port: ${config.website.port}`)
})

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/private', express.static(path.join(__dirname, 'views', 'private')));

app.get('/', (req, res) => {
    const bannedIp = BannedIps.find((ip) => ip === req.ipInfo.ip);
    if (bannedIp) {
        return res.status(401).json({ Message: `Your IP is banned. Go to https://${config.website.url}/discord to appeal`, Code: 404 });
    } else {
        res.render('public/index', {config: config})
        if (config.website.logs.enabled == true) {
            console.log(clc.yellow(`Website has been viewed by ` + req.ipInfo.ip + " from " + req.ipInfo.region + ", " + req.ipInfo.country));
            sendDiscordWebhook("Ip Log", `Website has been viewed by ` + req.ipInfo.ip + " from " + req.ipInfo.region + ", " + req.ipInfo.country)
        }
    }
})
app.get('/discord', (req, res) => {
    res.redirect(301, config.website.discordlink)
})