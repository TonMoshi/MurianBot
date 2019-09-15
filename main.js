const Discord = require('discord.js');
const client = new Discord.Client();
const setting = require('./secret.json')

const messages = require('./controller/messages')

var mode = setting.mode || "prod";
var token;
var marker;

if (mode == "dev") {
    token = setting.tokenTest;
    marker = "$";
}
else {
    token = setting.token;
    marker = "!";
}

console.log(token);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content[0] === marker) {
    messages.command(msg);
  } else {
    messages.other(msg);
  }
});

client.login(token);