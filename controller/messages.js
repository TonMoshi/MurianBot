// Discord imports
const { Attachment } = require('discord.js');

// Native Imports
const fs = require('fs');

// Messages object we want to export
var messages = {}

let commands = [
    "pong",
    "ping",
    ""
]

var helpList = "Commands:\n !ping\n !pong\n !urlAvatar\n !testAttachment\n !testAttachmentWithComment\n !help\n";

// Entry point for every command (Preceded by "!")
messages.command = function(message){
    
    switch (message.content) {
        case "!ping":
            ping(message);
            break;

        case "!pong":
            pong(message);
            break;

        case "!help":
            help(message);
            break;   
        
        case "!urlAvatar":
            getUrlAvatar(message);
            break;

        case "!testAttachment":
            testAttachment(message);
            break;

        case "!testAttachmentWithComment":
            testAttachmentWithComment(message);
            break;

        default:
            break;
    }

}

// Entry point for messages that are not commands (Preceded by "!")
messages.other = function(message){
    if(message.content) {
        
            }
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

module.exports = messages;