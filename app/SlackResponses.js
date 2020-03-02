module.exports = function SlackResponses (twitGenny, slackGenny, discordGenny, data) {
    var params = {
        as_user: true
    };
    
    if (data.text !== undefined && data.text.substring(0, 6) == 'genny.') {
        var args = data.text.substring(6).split(' ');
        var cmd = args[0];

        args = args.splice(1);

        switch(cmd) {
            case 'hello':
                slackGenny.postMessage(data.channel, 'Hello!', params);
            break;
            default:
                slackGenny.postMessage(data.channel, 'Invalid command', params);
            break;
        }
    }

    switch (data.subtype) {
        case 'message_changed':
            discordGenny.sendMessage({
                to: 'your discord channel',
                message: '**Message edited in Slack**\nFrom: '+data.message.user+'\n'+data.message.text
            })
            break;
        case undefined:
            if (typeof data.files === 'undefined') {
                discordGenny.sendMessage({
                    to: 'your discord channel',
                    message: '**New message sent in Slack **\nFrom: '+data.user+'\n'+data.text
                })
            }
            else {
                discordGenny.sendMessage({
                    to: 'your discord channel',
                    message: '**New message sent in Slack **\nFrom: '+data.user+'\n'+data.text+'\n'+data.files[0].url_private
                })
            }
            break;
        default:
            break;

    }
}