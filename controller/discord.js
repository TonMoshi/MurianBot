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

// Discord config.
var mode;
var token;
var marker;

// Discord roles.
const roles = setting.roles;

// Discord bot init
discord.start = function() {

    setOptions();
    onReady();
    onMessage();
    onGuildMemberAdd();    

    client.login(token);

}

function setOptions() {
    mode = (setting.mode) ? setting.mode : "prod";
    token = (mode === 'dev') ? setting.tokenTest : setting.token;
    marker = (mode === 'dev') ? '$' : '!';

    console.log('Token: ' + token + '\nMode: ' + mode + '\nMarker: ' + marker);

}

function onReady() {
    client.on('ready', () => {
        console.log(`Logged in as ${client.user.tag}!`);
        guild = client.guilds.get(setting.guildId);
        botChannel = guild.channels.find(ch => ch.name === setting.botChannel);
        //TODO: check if available
        if (!guild.available){
            
        }
    });
}

function onMessage() {
    client.on('message', msg => {
        if (msg.content[0] === marker) {
            discord.command(msg);
        } else {
            discord.other(msg);
        }
    });
}

function onGuildMemberAdd() {
    client.on('guildMemberAdd', member => {
        promptPermissions(member);
    });
}

function promptPermissions(command) {

    const basic = command.guild.roles.find(role => role.name === roles.base);
    const adv = command.guild.roles.find(role => role.name === roles.advanced);

    const roleList = [basic, adv];
;
    command.send("Te doy la bienvenida al servidor.\n¿Quieres tener acceso a los canales de desarrollo?\n En caso afirmativo, reacciona a este mensaje con \:jigsaw:, si no, reacciona con \:video_game:")
    .then(message => {

        const options = ['🎮', '🧩'];

        message.react(options[1]).then(() => message.react(options[0]));

        const filter = (reaction, user) => {
            return options.includes(reaction.emoji.name) && user.id === command.id;
        };
        
        waitForReactions(filter, message, options, command, roleList);
    });
}

function waitForReactions(filter, message, options, member, roleList) {

    message.awaitReactions(filter, { max: 1, time: 120000, errors: ['time'] })
    .then(collected => {
        const reaction = collected.first();
        if (reaction.emoji.name === options[0]) {
            member.addRole(roleList[0]);
            console.log("User: " + member.id + " has role " +  roleList[0]);
            message.reply('Tu rol es: Gamer. Diviértete!');
        } else if (reaction.emoji.name === options[1]) {
            member.addRole(roleList[0]);
            member.addRole(roleList[1]);
            console.log("User: " + member.id + " has role " +  roleList[0] + " and " + roleList[1]);
            message.reply('Tus roles son: Gamer y Developer. Diviértete!');
        }
    })
    .catch(collected => {
        member.addRole(roleList[0]);
        message.reply('Cómo pasa el tiempo!\n Si quieres solicitar tus permisos de nuevo puedes volver a pedírmelos en el canal de texto #info escribiendo ```!permisos```');
    });
}

// Entry point for every command (Preceded by "!")
discord.command = function(message) {
    
    const command = commands[message.content.substring(1)];
    if (command) {
        command(message);
    }
}

const commands =
{
    ping: function (message) {
        ping(message);
    },
    pong: function (message) {
        pong(message);
    },
    help: function (message) {
        help(message);
    },
    urlAvatar: function (message) {
        getUrlAvatar(message);
    },
    testAttachment: function (message) {
        testAttachment(message);
    },
    testAttachmentWithComment: function (message) {
        testAttachmentWithComment(message);
    },
    test: function (message) {
        test(message)
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

const helpList = "Commands:\n !ping\n !pong\n !urlAvatar\n !testAttachment\n !testAttachmentWithComment\n !help\n";

function help(command){

    command.channel.send(helpList);
}

function test(command){


}

module.exports = discord;