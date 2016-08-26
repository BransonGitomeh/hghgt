const nodeogram = require("nodeogram")
bot = new nodeogram.Bot("238088714:AAG_hsLwksOdXjo241CLXzs115hFdqE_wpc")
var google = require('google')
var os = require("os");
var usage = require('usage');
var allEmojiInWorld = require("./emojis")
const emoji = require('node-emoji');
const quote = require('prog-quote')()
var randomEmoji = Object.keys(allEmojiInWorld)[Math.floor(Math.random() * Object.keys(allEmojiInWorld).length)]
var YouTube = require('youtube-node');
var moment = require('moment');

bot.init();

bot.on("message", function(message) {
	// console.log(message)
	console.log(message.from.id)
	console.log(message.from.username)
	console.log(message.text)

	bot.sendMessage("235088802", "new message => \n" + message.from.id + "\n" + message.from.username + "\n" + message.text + "\n" + "reply to \n" + message.chat.text)
		// bot.sendMessage("235088802",JSON.stringify(message,null,"\t"))
})

bot.command('stats', 'Echoes your voice', false, (args, message) => {
	usage.lookup(process.pid, function(err, result) {
		users.map((user) => {
			bot.sendMessage(user, "Hi server is up on" + os.hostname() + "with \n\n" + JSON.stringify(result, null, "\t") + "\n \n NOW I AN GOOGLE \n just run /goo 'paris'")
		})
	});
})

bot.command('goo', 'Searches youtube for you', false, (args, message) => {
	bot.sendMessage("235088802", "goo user  => \n" + message.from.id + "\n" + message.from.username + "\n" + args.join(' ') + "\n" + "reply to \n" + message.chat.text)

	message.reply(emoji.get("white_frowning_face") + "Mining google for you ... " + emoji.get(randomEmoji), {
		parse_mode: 'Markdown'
	})
	if (args[0] != '') {
		google.resultsPerPage = 7
		var nextCounter = 0

		google(args.join(' '), function(err, res) {
			if (err) console.error(err)

			var results = ""

			for (var i = 0; i < res.links.length; ++i) {
				var link = res.links[i];
				results = results + (results == "" ? "" : "\n \n") + link.title + " - " + link.href + "\n \n" + link.description
			}

			message.reply(results, {
				parse_mode: 'Markdown'
			})
		})
	};
});



// yt search
bot.command('yt', 'Searches youtube for you', false, (args, message) => {
	bot.sendMessage("235088802", "yt user => \n" + message.from.id + "\n" + message.from.username + "\n" + args.join(' ') + "\n" + "reply to \n" + message.chat.text)

	var youTube = new YouTube();

	youTube.setKey('AIzaSyB1OOSpTREs85WUMvIgJvLTZKye4BVsoFU');

	youTube.search(args.join(' '), 6, function(error, res) {
		if (error) {
			console.log(error);
		} else {
			// console.log(JSON.stringify(res, null, 2));
		}

	
		res.items.map((item)=>{
			var results = ""
			console.log(item)
			console.log(item.kind)
			// console.log(item.etag)
			console.log(item.snippet.title)
			console.log(JSON.stringify(item.snippet.thumbnails.default.url,null,"\t"))
			var now = moment(new Date())
			results = results + (results == "" ? "" : "\n") + item.snippet.title + " ---- pushed " + moment.duration(now.diff(item.snippet.publishedAt)).humanize() + " ago" + "\n \n " + item.snippet.description + "\n "+ item.snippet.thumbnails.default.url + " \n\n\n"
			message.reply(results, null, "\t")
		})

		
	});
})



// "135207785"
// 127660631 - abel
var users = ["235088802", "135207785"]

var backOnlineMessages = [
	"Hey im back online",
	"Hey sorry i was down",
	"OW CRAP!!, im back up again",
	"HEY this dev of mine restarted me ",
	"im backup man, feeling awesome",
	"Loving the updates man",
	"Isnt today a beautifull day?? :-D"
]

users.map((user) => {
	bot.sendMessage(user, emoji.get(randomEmoji) + " " + backOnlineMessages[Math.floor(Math.random() * backOnlineMessages.length)] + "\n \n" + quote.next().value.quote)
})

process.stdin.resume(); //so the program will not close instantly

process.on('SIGINT', function() {
	console.log('Got SIGINT.  Press Control-D to exit.');
	users.map((user) => {
			bot.sendMessage(user, "dying server...SIGINT")
		})
		// setTimeout(process.exit, 300)
});