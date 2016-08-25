const nodeogram = require("nodeogram")
bot = new nodeogram.Bot("238088714:AAG_hsLwksOdXjo241CLXzs115hFdqE_wpc")



bot.init();
bot.on("message", (message) => {
	console.log(message)
	message.reply({
		text: message.text,
		chat: message.chat.id,
		username: message.chat.username,
		first_name: message.chat.first_name,
		last_name: message.chat.last_name,
		last_name: message.chat.last_name,
	})
})


// bot.on()


var users = ["235088802", "135207785"]
	// var users = ["235088802","127660631"]

var os = require("os");
var usage = require('usage');
var pid = process.pid // you can use any valid PID instead
usage.lookup(pid, function(err, result) {
	users.map((user) => {
		bot.sendMessage(user, "Hi server is up on" + os.hostname() + "with \n\n" + JSON.stringify(result, null, "\t"))
	})
});


process.stdin.resume(); //so the program will not close instantly

process.on('SIGINT', function() {
	console.log('Got SIGINT.  Press Control-D to exit.');
	users.map((user) => {
		bot.sendMessage(user, "dying server...SIGINT")
	})
	setTimeout(process.exit,300)
	// process.exit()
});

// var google = require('google')

// google.resultsPerPage = 25
// var nextCounter = 0

// google('node.js best practices', function (err, res){
//   if (err) console.error(err)

//   for (var i = 0; i < res.links.length; ++i) {
//     var link = res.links[i];
//     console.log(link.title + ' - ' + link.href)
//     console.log(link.description + "\n")
//   }

//   if (nextCounter < 4) {
//     nextCounter += 1
//     if (res.next) res.next()
//   }
// })