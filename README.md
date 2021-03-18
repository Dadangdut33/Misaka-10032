# Misaka-10032
A Personal discord bot made by [me](https://github.com/Dadangdut33)\
This is the repository of Misaka-10032 Discord bot that i use in my private discord server (Para Pencari Waifu)\
Originally this bot repository was private but I opened it to public now cause why not ¯\_(ツ)_/¯

## Getting Started
If you want to clone it and use it for your server, you gonna have to change some stuff.

   - What you will need to modify
     1. **[User ID to send Messages]** You need to change the id to send messages in [handler.js](https://github.com/Dadangdut33/Misaka-10032/blob/main/handler/Handler.js) and [reportbug.js](https://github.com/Dadangdut33/Misaka-10032/blob/main/modules/general/commands/info_bot/reportbug.js). 
     2. **[Channel ID & Server ID for member count, channel log, and server info]** You need to change the id used [Member-count.js](https://github.com/Dadangdut33/Misaka-10032/blob/main/modules/general/events/member-count.js), [start.js](https://github.com/Dadangdut33/Misaka-10032/blob/main/modules/general/events/start.js), and [server-info](https://github.com/Dadangdut33/Misaka-10032/blob/main/modules/general/events/server-info.js) 
     4. **[Bot Token]** You need to create a .env file and add your own token there
     5. **[API Keys]** And last, You will also need to create api.json file and add your own API keys from bitly and rapidAPI if you want to use [shortlink](https://github.com/Dadangdut33/Misaka-10032/blob/main/modules/general/commands/tool/shortlink.js) and [translate](https://github.com/Dadangdut33/Misaka-10032/blob/main/modules/general/commands/tool/translate.js). 

   - Optional
     1. You should probably change the [about](https://github.com/Dadangdut33/Misaka-10032/blob/main/modules/general/commands/info_bot/about.js) info commands
     2. You can also changed the haiku detection settings in [msgListener.js](https://github.com/Dadangdut33/Misaka-10032/blob/main/modules/general/events/msgListener.js), i turned up the sensitivity cause it's not really working in the language that i use (Indonesia)
     3. You can also change [this meme responses](https://img-comment-fun.9cache.com/media/aOv2bpN/axNG6q5j_700w_0.jpg) from the same file. The response are located in [bot-respone.js](https://github.com/Dadangdut33/Misaka-10032/blob/main/modules/general/events/bot-response.js)
     4. You can change the bot activity that changes every 15 minutes. You can customize the settting in [start.js](https://github.com/Dadangdut33/Misaka-10032/blob/main/modules/general/events/start.js). For the activity lists you can change it in [bot-activity.js](https://github.com/Dadangdut33/Misaka-10032/blob/main/modules/general/events/bot-activity.js)
     
## Questions?
Feel free to ask me in discussions if you have any questions

## Disclaimer
PLease credit me if you take stuff from this repository. You can use this however you want, but please don't use it for evil lol.\
Also, originally i used an open source template for this discord bot but i can't remember the link of the repository. I'm really sorry that i cannot link it. If you are the owner of that repo and you want me to link it please message me.<br/><br/>
**P.S.**\
The code is not really that great, i'm just gonna give an early warning xD\
Also special thanks to [@dameeraf](https://github.com/dameeraf) for the help on genshin commands