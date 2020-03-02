/* imports */
var Discord = require('discord.io');
var Slack = require('slackbots');
var Twit = require('twit')
var logger = require('winston');
var auth = require('./auth.json');

/* import code from app folder */
var DiscordResponses = require('./app/DiscordResponses.js/index.js')
var SlackResponses = require('./app/SlackResponses.js/index.js')

/* Configure logger settings */
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

/* Initialize Omegle Bot */

/* Initialize Twitter Bot */
var twitGenny = new Twit({
    consumer_key: auth.twitter.consumer_key,
    consumer_secret: auth.twitter.consumer_secret,
    access_token: auth.twitter.access_token,
    access_token_secret: auth.twitter.access_token_secret,
    timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
    strictSSL:            true,     // optional - requires SSL certificates to be valid.
})

logger.info('Twitter bot initialised');

/* Initialize Slack Bot */

var slackGenny = new Slack({
    token: auth.slack.token,
    name: 'Genny'
});

var params = {
    as_user: true
};

slackGenny.on('start', function () {
    logger.info('Connected to Slack');
});

slackGenny.on('message', function (data) {
    if (data.type !== 'message') {
        return;
    }

    SlackResponses(twitGenny, slackGenny, discordGenny, data, params); 
});

/* Initialize Discord Bot */
var discordGenny = new Discord.Client({
   token: auth.discord.token,
   autorun: true
});

discordGenny.on('ready', function () {
    logger.info('Connected to Discord');
});

discordGenny.on('message', function (user, userID, channelID, message, evt) {
    console.log('Message on Discord received from: '+user)
    if (discordGenny.channels[channelID]) {
        switch (discordGenny.channels[channelID].guild_id) {
            /* check for a server/guild id */ 
            case "your server id":
                console.log('message from VKEA');
                DiscordResponses(twitGenny, slackGenny, discordGenny, user, userID, channelID, message, evt);
                break;
            default:
                console.log('message from unknown Discord guild:'+discordGenny.channels[channelID].guild_id);
                break;
        }
    }
});