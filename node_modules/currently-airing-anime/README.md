# Currently Airing Anime

Currently Airing Anime is a simple package that allows you to retrieve currently airing anime from AniList.

[Demo](https://ricklancee.github.io/currently-airing-anime/) | [Demo source code](https://github.com/ricklancee/currently-airing-anime/blob/gh-pages/index.html)

```js
const currentlyAiringAnime = require('currently-airing-anime')

currentlyAiringAnime().then(({shows, next}) => {

  // logs up an array containing up to 50 array airing anime shows
  // See below for which properties the object contains.
  console.log(shows)

  // The next variable allows for paginating to the next 50 items.
  if (next) {

    next().then(({shows, next}) => {

      // logs shows
      console.log(shows) 
  
      if (next) {
        // ...
      }
    })  
  }
})
```

```js
// Possible configuration options
currentlyAiringAnime({
  season: 'SUMMER', // 'WINTER', 'SPRING', 'SUMMER', 'FALL'
  seasonYear: 2017,
  malIdIn: [34914, 34902, 34881], // Include only these MyAnimeList Ids
  aniIdIn: [98292, 98291, 98251], // Include only these AniList ids
  sort: ['START_DATE'], // An array of sort options (see below for all sort options)
  includeSchedule: true // Include an array of the airing schedule
})
```

See the `example/` folder for an implementation example for the browser and node (with babel preset es2015).

#### Show object

```
show {
  id
  idMal
  description
  title {
    romaji
    native
    english
  }
  studios {
    edges {
      node {
        name
      }
    }
  }
  format
  genres
  status
  coverImage {
    large
  }
  episodes
  nextAiringEpisode {
    id
    episode
    airingAt
    timeUntilAiring
  }
  startDate {
    year
    month
    day
  }
  // Airing shedule gets included if option includeSchedule is true
  airingSchedule {
    edges {
      node {
        episode
        airingAt
        timeUntilAiring
      }
    }
  }
}
```

### Installing

Install the package with npm or download include the `currentlyAiringAnime.js` file in the browser.

```sh
npm install currently-airing-anime
```

For node you will need to include the package `node-fetch`

```sh
npm install node-fetch
```

```js
const fetch = require('node-fetch');

global.fetch = fetch

const currentlyAiringAnime = require('currently-airing-anime');

currentlyAiringAnime().then(({shows, next}) => {
  console.log(shows)
})
```

#### Sort Options

```
ID
ID_DESC
TITLE_ROMAJI
TITLE_ROMAJI_DESC
TITLE_ENGLISH
TITLE_ENGLISH_DESC
TITLE_NATIVE
TITLE_NATIVE_DESC
TYPE
TYPE_DESC
FORMAT
FORMAT_DESC
START_DATE
START_DATE_DESC
END_DATE
END_DATE_DESC
SCORE
SCORE_DESC
POPULARITY
POPULARITY_DESC
EPISODES
EPISODES_DESC
DURATION
DURATION_DESC
STATUS
STATUS_DESC
UPDATED_AT
UPDATED_AT_DESC
```
