const mongoose = require('mongoose');
const mongoURL = process.env.mongoURL;
const { Client, Events, Guild, ActivityType } = require('discord.js');
const clc = require("cli-color");
require('dotenv').config();
const fs = require('fs');
const config = JSON.parse(fs.readFileSync("./config.json", "utf8"));

module.exports = {
  name: 'ready',
  once: true,
  async execute(client) {
    if (!mongoURL) return;
    await mongoose.connect(mongoURL || '');

    // Log the shard ID
    const shardId = client.shard ? client.shard.ids[0] : 'N/A';

    if (mongoose.connection.readyState === 1) {
      console.log(clc.green(`[✓] Database has been connected on shard: `) + shardId);
    } else {
      console.log(clc.red('[✕] Database has failed to connect'));
    }

    if (config.status.enabled) {
      client.user.setPresence({
        status: 'dnd',
        activities: [{ state: config.status.text, name: 'customstatus', type: ActivityType.Custom }]
      });
      console.log(clc.green(`[✓] Status set for shard ${shardId}`));
    }
  },
};
