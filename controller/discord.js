// Discord imports
const { Client, Attachment } = require('discord.js');
const client = new Client();
const setting = require('../secret.json')

// Native Imports
const fs = require('fs');


// Discord object we want to export
var discord = {}

// The Guild object, for easy access.
var guild = {};
var botChannel = {};

// Discord bot init
discord.start = function(){

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
        guild = client.guilds.get('119087736773804032');
        botChannel = guild.channels.find(ch => ch.name === 'murian-cave');
        //TODO: check if available
        if (!guild.available){
            
        }


    });

    client.on('message', msg => {
        if (msg.content[0] === marker) {
            this.command(msg);
        } else {
            this.other(msg);
        }
    });

    client.login(token);

}

let commands = [
    "pong",
    "ping",
    ""
]

var helpList = "Commands:\n !ping\n !pong\n !urlAvatar\n !testAttachment\n !testAttachmentWithComment\n !help\n";

// Entry point for every command (Preceded by "!")
discord.command = function(message){
    
    switch (message.content.substring(1)) {
        case "ping":
            ping(message);
            break;

        case "pong":
            pong(message);
            break;

        case "help":
            help(message);
            break;   
        
        case "urlAvatar":
            getUrlAvatar(message);
            break;

        case "testAttachment":
            testAttachment(message);
            break;

        case "testAttachmentWithComment":
            testAttachmentWithComment(message);
            break;
            
        case "test":
            test();
            break;

        default:
            break;
    }

}

// Entry point for messages that are not commands (Preceded by "!")
discord.other = function(message){
    if(message.content) {
        
            }
}

// Send the Damages from Monster Hunter Mod to Discord
discord.monHunDamages = function(info, callback){
    console.log(info)
    botChannel.send(info.damage);
    callback(true);
}

// Reply to the user who used the command

function ping(command) {
    command.reply("pong");
}

function pong(command) {
    command.reply("ping");
}

function getUrlAvatar(command) {
    command.reply(command.author.avatarURL);
    
}


// https://discord.js.org/#/docs/main/stable/examples/attachments
// Send Attachments

function testAttachment(command) {
    // Create the attachment using Attachment
    const attachment = new Attachment('https://i.imgur.com/w3duR07.png');
    // Send the attachment in the message channel
    command.channel.send(attachment)
}

function testAttachmentWithComment(command) {
    // Create the attachment using Attachment
    const attachment = new Attachment('https://i.imgur.com/w3duR07.png');
    // Send the attachment in the message channel with a content
    command.channel.send(`${command.author},`, attachment);    
}

function testLocalAttachmentWithComment(command) {
    // Create the attachment using Attachment
    const attachment = new Attachment('./rip.png');
    // Send the attachment in the message channel with a content
    command.channel.send(`${message.author},`, attachment);
}

function testAttachmentFromBuffer(command) {
    // Get the buffer from the 'memes.txt', assuming that the file exists
    const buffer = fs.readFileSync('./memes.txt');

    /**
     * Create the attachment using Attachment,
     * overwritting the default file name to 'memes.txt'
     * Read more about it over at
     * http://discord.js.org/#/docs/main/stable/class/Attachment
     */
    const attachment = new Attachment(buffer, 'memes.txt');
    // Send the attachment in the message channel with a content
    command.channel.send(`${command.author}, here are your memes!`, attachment);
}

function help(command){

    command.channel.send(helpList);
}

function test(){
    //console.log(guild.channels.find(ch => ch.name === 'murian-cave'));
    //console.log(client.guilds.get('119087736773804032').channels);
    botChannel.send("Tasty");
}

module.exports = discord;