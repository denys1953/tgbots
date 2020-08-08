require('http').createServer().listen(process.env.PORT || 5000).on('request', function(req, res){
    res.end('')
})

var TelegramBot = require('node-telegram-bot-api');

var token = '1330103879:AAFTw1iaepCNWVGw-6gOWLyLyp7vf2LQQzA';

var bot = new TelegramBot(token, {polling: true});

var notes = [];

bot.onText(/напомни (.+) в (.+)/, function (msg, match) {
    var userId = msg.from.id;
    var text = match[1];
    var time = match[2];

    notes.push({ 'uid': userId, 'time': time, 'text': text });

    bot.sendMessage(userId, 'Отлично! Я обязательно напомню, если не сдохну :)');
});

setInterval(function(){
    for (var i = 0; i < notes.length; i++) {
    const curDate = new Date().getHours() + ':' + new Date().getMinutes();
    if (notes[i]['time'] === curDate) {
      bot.sendMessage(notes[i]['uid'], 'Напоминаю, что вы должны: '+ notes[i]['text'] + ' сейчас.');
      notes.splice(i, 1);
    }
  }
}, 1000);