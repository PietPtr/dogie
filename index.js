
var irc = require('irc');

var botlisteners = require('./botlisteners');

var server = 'irc.freenode.net';
var myNick = 'dogie[b]';
var channels = ['#refud0ge'];

var myAdmin = 'theSpiked';

var client = new irc.Client(server, myNick, {
    channels: channels
  , autoRejoin: true
  , autoConnect: false
  , userName: myNick
  , realName: myNick
});

client.addListener('pm', function(from, text, message) {
  if(from == myAdmin && text == "reload") {
    
    // Unload all listeners
    botlisteners.unload(client);

    // Purge the cache and reload the module
    delete require.cache[require.resolve('./botlisteners')];
    botlisteners = require('./botlisteners');

    // Attach the listeners
    botlisteners.load(client);

    client.say(from, "reload complete");
  }
});

client.addListener('error', function(message) {
  console.log('error: ', message);
});

client.connect(function() {
  // Attach the listeners
  botlisteners.load(client);
});
