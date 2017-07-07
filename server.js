/**
 * modified starting from
 * https://docs.microsoft.com/en-us/bot-framework/nodejs/bot-builder-nodejs-quickstart
 */

let restify = require('restify');
let builder = require('botbuilder');
//var server = restify.createServer();

var connector = new builder.ChatConnector(
    //{
    //appId: process.env.MICROSOFT_APP_ID,
    //appPassword: process.env.MICROSOFT_APP_PASSWORD
    //}
);


var bot = new builder.UniversalBot(connector);
//bot.dialog('/', function(session){
//    session.send('Hello World');
//});

bot.dialog('/', [
    function (session) {
        session.beginDialog('/askName');
    },
    function (session, results) {
        session.send('Hi %s', results.response);
    }
]);

bot.dialog('/askName', [
    function (session) {
        builder.Prompts.text(session, 'Hi, what is your name?');

    },
    function (session, results) {
        session.endDialogWithResult(results);
    }
]);




// Setup Restify Server
var server = restify.createServer();
// do not use 
// server.listen(process.env.port || process.env.PORT || 3978, ....
server.listen( 3978, '::',function () {
    //console.log('%s listening to %s', server.name, server.url);
    console.log('Server Up');
});


// Listen for messages from users 
server.post('/api/messages', connector.listen());

