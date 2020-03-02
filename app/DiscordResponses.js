module.exports = function DiscordResponses (twitGenny, slackGenny, discordGenny, user, userID, channelID, message, evt) {
    if (message.substring(0, 6) == 'genny.') {
        var args = message.substring(6).split(' ');
        var cmd = args[0];
        args = args.splice(1);

        switch(cmd) {
            case 'tweet':
                if (channelID =='discord channel id') {
                    args = message.substring(12);
                    splitter = args.split(' ');
                    msg = message.substring(12+splitter[0].length);
                    twitGenny.post('statuses/update', { status: args }, function(err, data, response) {
                        
                    })
                    discordGenny.sendMessage({
                        to: channelID,
                        message: '**Tweeted:** '+args
                    })
                }
                else {
                    discordGenny.sendMessage({
                        to: channelID,
                        message: '<:exception:593779962708885525> **Could not tweet:** Tweeting only in <#discord channel id>'
                    })
                }
            break;
            case 'exception':
                console.log('command: exception')
                discordGenny.sendMessage({
                    to: channelID,
                    message: '<:exception:593779962708885525> Exception!'
                })
            break;
            case 'cowsay':
                args = message.substring(13);
                discordGenny.sendMessage({
                    to: channelID,
                    message: `\`\`\`

`+args+`

        \\   ^__^
         \\  (oo)\_______
            (__)\       )\\/\\
                ||----w |
                ||     ||
\`\`\``
                })
            break;
            case 'palindrome':
                args = message.substring(17);
                let answer;
        
                let reversed = args.split("").reverse().join("");
        
                if (args == reversed) {
                    answer = "Yes, "+args+" is a palindrome";
                }
                else {
                    answer = "No, \""+args+"\" is not a palindrome";
                }
    
                discordGenny.sendMessage({
                    to: channelID,
                    message: answer
                })
            break;
            default:
                console.log('command: unknown')
                discordGenny.sendMessage({
                    to: channelID,
                    message: '<:exception:593779962708885525> Exception! invalid command!'
                })
            break;
        }
    }
}