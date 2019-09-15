const Discord = require('discord.js');
const client = new Discord.Client();
const setting = require('./secret.json')

const messages = require('./controller/messages')

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content[0] === '!') {
    messages.command(msg);
  } else {
    messages.other(msg);
  }
});

client.login(setting.token);