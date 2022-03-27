# Project moved to <https://github.com/Dadangdut33/Misaka-10032-ts>

# Misaka-10032
A Personal discord bot i made. I use it for my private discord server. Originally this bot repository was private but I opened it to public now cause why not ¯\\_(ツ)_/¯

Please note that i started making it when i have little experience in programming so the code might be a bit messy (I am trying to refactor it as much as i can when i have the free time now), but it still works tho... xD

<details open>
  <summary><b>Preview</b></summary>
  <p align="center">
    <img src="https://github.com/Dadangdut33/Misaka-10032/blob/main/preview.png?raw=true">
  </p>
</details>

---

## Getting Started
If you want to clone it and use it for your server, you gonna have to change some stuff.

   - What you will need to modify
     1. **[Channel ID to send Bug Report]** You need to change the channel id to send messages in [reportbug.js](https://github.com/Dadangdut33/Misaka-10032/blob/main/modules/general/commands/info-bot/reportbug.js). 
     2. **[Channel ID & Server ID for member count, channel log, and server info]** You need to change the id if you want to use it. It is used in [Member-count.js](https://github.com/Dadangdut33/Misaka-10032/blob/main/modules/general/events/types/private/member-count.js), [start.js](https://github.com/Dadangdut33/Misaka-10032/blob/main/modules/general/events/start.js), and [server-info](https://github.com/Dadangdut33/Misaka-10032/blob/main/modules/general/events/types/private/server-info.js) 
     3. **[The repository link]** change the repository links in [help.js](https://github.com/Dadangdut33/Misaka-10032/blob/main/modules/general/commands/info-bot/help.js) 
     4. **[The .env]** The .env contains many sensitive information. You need to create a .env file based on the .env.example.
     <br/>
     
   - Optional
     1. You should probably change the [about](https://github.com/Dadangdut33/Misaka-10032/blob/main/modules/general/commands/info-bot/about.js) info commands
     2. You can also changed the haiku detection settings in [msgListener.js](https://github.com/Dadangdut33/Misaka-10032/blob/main/modules/general/events/types/msgListener.js), i turned up the sensitivity cause it's not really working in the language that i use (Indonesia)
     3. You can also change [this meme responses](https://img-comment-fun.9cache.com/media/aOv2bpN/axNG6q5j_700w_0.jpg). That are located in [meme-response.js](https://github.com/Dadangdut33/Misaka-10032/blob/main/modules/general/events/types/public/random-response/meme-response.js)
     4. You can change the bot activity that changes every 15 minutes. You can customize the settting in [start.js](https://github.com/Dadangdut33/Misaka-10032/blob/main/modules/general/events/start.js). For the activity lists you can change it in [bot-activity.js](https://github.com/Dadangdut33/Misaka-10032/blob/main/modules/general/events/types/public/bot-activity.js)
     
## Questions?
Feel free to ask me in discussions if you have any questions

## Disclaimer
Originally i used an open source template for this discord bot but i can't remember the link of the repository. I'm really sorry that i cannot link it. If you are the owner of that repo and you want me to link it please message me.<br/><br/>
