const { ShardingManager } = require('discord.js');
require('dotenv').config();
const clc = require("cli-color");
const config = require('./config');

console.clear();
console.log(clc.blue('Open source bot template made by x08xNickelodeon on discord'));
console.log(clc.cyan('https://github.com/x08xNickelodeon/O.S.D.B.P.js'));

const manager = new ShardingManager('./src/shard.js', { 
    token: process.env.token,
    totalShards: config.shard.totalShards // This will let Discord.js decide how many shards are needed
});

let readyShards = 0;

manager.on('shardCreate', shard => {
    console.log(clc.yellow(`Launching shard ${shard.id}`));
    
    // Listen for when each shard becomes ready
    shard.on('ready', () => {
        readyShards++;
        console.log(clc.green(`Shard ${shard.id} is ready`));
        
        // Check if all shards are ready
        if (readyShards === manager.totalShards) {
            console.log(clc.yellow.bold('――――――――――――――――――――――Bot Logs――――――――――――――――――――――'));
        }
        
    });
});

manager.spawn(); // Spawns the shards