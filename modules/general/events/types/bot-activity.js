const { prefix, build } = require("../../../../config");

//Type PLAYING WATCHING LISTENING STREAMING
'use strict';
var activity = [
  {
    "type": "PLAYING",
    "desc": "Best world is bruh world"
  },
  {
    "type": "PLAYING",
    "desc": "Corona changes everything"
  },
  {
    "type": "PLAYING",
    "desc": "JavaScript"
  },
  {
    "type": "PLAYING",
    "desc": "In another world"
  },
  {
    "type": "WATCHING",
    "desc": "Bruh moment.mp4"
  },
  {
    "type": "WATCHING",
    "desc": "Watching You"
  },
  {
    "type": "WATCHING",
    "desc": "Anime with the homies"
  },
  {
    "type": "WATCHING",
    "desc": "Seasonal animes"
  },
  {
    "type": "WATCHING",
    "desc": "Funny shitpost videos on youtube"
  },
  {
    "type": "LISTENING",
    "desc": "Epic anime soundtrack"
  },
  {
    "type": "LISTENING",
    "desc": "Some electro music"
  },
  {
    "type": "LISTENING",
    "desc": "Epic doom ost"
  },
  {
    "type": "LISTENING",
    "desc": "Claris"
  },
  {
    "type": "LISTENING",
    "desc": "Dangdut koplo terbaru 2021"
  },
  {
    "type": "WATCHING",
    "desc": "Epic videos"
  },
  {
    "type": "WATCHING",
    "desc": "Pirated anime lol"
  },
  {
    "type": "LISTENING",
    "desc": "Unravel"
  },
  {
    "type": "PLAYING",
    "desc": "Watashi wa ghoul"
  },
  {
    "type": "LISTENING",
    "desc": "Oshiete oshiete o"
  },
  {
    "type": "LISTENING",
    "desc": "Renai circulation"
  },
  {
    "type": "LISTENING",
    "desc": "Musou express"
  },
  {
    "type": "LISTENING",
    "desc": "Staple staple"
  },
  {
    "type": "LISTENING",
    "desc": "Terminal terminal"
  },
  {
    "type": "PLAYING",
    "desc": "Rem > Emillia"
  },
  {
    "type": "PLAYING",
    "desc": "Ararararagi san"
  },
  {
    "type": "PLAYING",
    "desc": "Why are we still here? just to suffer?"
  },
  {
    "type": "LISTENING",
    "desc": "Tenshi ni fureta yo"
  },
  {
    "type": "LISTENING",
    "desc": "Tsubasa wo kudasai"
  },
  {
    "type": "PLAYING",
    "desc": "In the rain.."
  },
  {
    "type": "LISTENING",
    "desc": "God knows.."
  },
  {
    "type": "PLAYING",
    "desc": "MAL Profile -> Dadangdut33"
  },
  {
    "type": "LISTENING",
    "desc": "MAL Profile -> Dadangdut33"
  },
  {
    "type": "WATCHING",
    "desc": "MAL Profile -> Dadangdut33"
  },
  {
    "type": "PLAYING",
    "desc": "I wish we could live a stress free life"
  },
  {
    "type": "PLAYING",
    "desc": "Life is just an illusion"
  },
  {
    "type": "PLAYING",
    "desc": "What is even our purpose here?"
  },
  {
    "type": "PLAYING",
    "desc": "Scoobidoel bidoel where are you?"
  },
  {
    "type": "PLAYING",
    "desc": "Genshin impact"
  },
  {
    "type": "PLAYING",
    "desc": "Playing with life"
  },
  {
    "type": "PLAYING",
    "desc": "An illusion is not real"
  },
  {
    "type": "PLAYING",
    "desc": "CSGO"
  },
  {
    "type": "PLAYING",
    "desc": "Apex Legends"
  },
  {
    "type": "PLAYING",
    "desc": "Trying to survive in this miserable world"
  },
  {
    "type": "PLAYING",
    "desc": "Travelling all around the world in my dream"
  },
  {
    "type": "PLAYING",
    "desc": "Speedrunning life"
  },
  {
    "type": "PLAYING",
    "desc": "Browsing google on How to speedrun life"
  },
  {
    "type": "PLAYING",
    "desc": "Playing with money"
  },
  {
    "type": "PLAYING",
    "desc": "Diluc is best carry"
  },
  {
    "type": "PLAYING",
    "desc": "Continous dmg > burst dmg"
  },
  {
    "type": "PLAYING",
    "desc": "1 bit 2 bits 8 bits 16 bits 32 bits 64 bits 128 bits"
  },
  {
    "type": "PLAYING",
    "desc": "Fuck bad guys, all my homies hate bad guys"
  },
  {
    "type": "PLAYING",
    "desc": "Cringe"
  },
  {
    "type": "PLAYING",
    "desc": "Help just help"
  },
  {
    "type": "PLAYING",
    "desc": "When will it end?"
  },
  {
    "type": "PLAYING",
    "desc": "If only we could log out"
  },
  {
    "type": "PLAYING",
    "desc": "Stuck on hardcore difficulty"
  },
  {
    "type": "PLAYING",
    "desc": "̿̿ ̿̿ ̿̿ ̿'̿'\̵͇̿\\"
  },
  {
    "type": "PLAYING",
    "desc": "Run"
  },
  {
    "type": "PLAYING",
    "desc": "Hope we meet again when it all ends"
  },
  {
    "type": "PLAYING",
    "desc": "Aaaaaaaaaaaaaa"
  },
  {
    "type": "LISTENING",
    "desc": "Again and again"
  },
  {
    "type": "LISTENING",
    "desc": "Sukinanode"
  },
  {
    "type": "PLAYING",
    "desc": "Isn't it all pointless?"
  },
  {
    "type": "PLAYING",
    "desc": "What's the point?"
  },
  {
    "type": "PLAYING",
    "desc": "Hope you all are having a great day!"
  },
  {
    "type": "PLAYING",
    "desc": "<p><a><i><n>"
  },
  {
    "type": "PLAYING",
    "desc": "Survive"
  },
  {
    "type": "PLAYING",
    "desc": "With player 2"
  },
  {
    "type": "PLAYING",
    "desc": "rip"
  },
  {
    "type": "PLAYING",
    "desc": "As player 1"
  },
  {
    "type": "PLAYING",
    "desc": "Running on glitch.com (With exploits lol)"
  },
  {
    "type": "PLAYING",
    "desc": "Running with no problems (I hope)"
  },
  {
    "type": "PLAYING",
    "desc": "This bot is coded great... I guess"
  }, 
  {
    "type": "PLAYING",
    "desc": "Emus cannot walk backwards, did you know that?"
  },
  {
    "type": "PLAYING",
    "desc": `Try ${prefix}facts`
  },
  {
    "type": "PLAYING",
    "desc": `Try out ${prefix}animequote`
  },
  {
    "type": "PLAYING",
    "desc": `You can download anime from this bot. Cool huh? I guess...`
  },
  {
    "type": "PLAYING",
    "desc": `Try ${prefix}neko`
  },
  {
    "type": "PLAYING",
    "desc": `Check out -> ${prefix}ship`
  },
  {
    "type": "PLAYING",
    "desc": `Check out -> ${prefix}kitsune`
  },
  {
    "type": "PLAYING",
    "desc": `Did you know that you can search anime using this bot? Well now you do`
  },
  {
    "type": "PLAYING",
    "desc": `Running on 100% pure js`
  },
  {
    "type": "PLAYING",
    "desc": `I wonder how long will this bot last`
  },
  {
    "type": "PLAYING",
    "desc": `Running since 2020, with lots of features and... some bugs ? i guess`
  },
  {
    "type": "PLAYING",
    "desc": `Reports bugs using ${prefix}reportbug`
  },
  {
    "type": "PLAYING",
    "desc": `Contact me using for problem using ${prefix}reportbug`
  },
  {
    "type": "PLAYING",
    "desc": `Secretly spying the outside world...`
  },
  {
    "type": "PLAYING",
    "desc": `Misaka should just be with touma already, what took them so long`
  },
  {
    "type": "PLAYING",
    "desc": `I recommend you guys to watch serial experiment lain`
  },
  {
    "type": "PLAYING",
    "desc": `Randomfact: The bot activities changes every 15 minutes`
  },
  {
    "type": "PLAYING",
    "desc": `Current Version is ${build}`
  }
]

const len = activity.length;

module.exports = function activityRand(x) {
  return {
    activity: activity[x], 
    actLen: len
  };
}