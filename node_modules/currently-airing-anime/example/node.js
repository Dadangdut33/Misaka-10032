const fetch = require('node-fetch');
global.fetch = fetch;

const currentlyAiringAnime = require('../lib/currentlyAiringAnime.js');

currentlyAiringAnime().then(res => console.log(res));
