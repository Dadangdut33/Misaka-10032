var response = [
  `Santui gan`,
  `Oi kasar`,
  `Jangan marah pak`,
  `Hati-hati darah tinggi`,
  `Santui gan`,
  `oi bahasanya`,
  `kasar sekali ya`,
  `kasar sekali`,
  `Janganlah kita berkata-kata kasar`,
  `Berkata kasar tidak baik `,
  `Ingat mati, ingat dosa, kalau mati lagi marah kan lucu`
]

// var responseMild = [
//   `Ampun bang jago`
// ]

// Server ppw only
var resGeh = [
  `https://images-ext-2.discordapp.net/external/53UeP3MLRbYGwYfAC410BPi6Dqax2vJPhVvelP_SkG0/https/media.tenor.com/images/321691f773bf4b75a5ad0e2c42708575/tenor.gif`,
  `https://images-ext-2.discordapp.net/external/vqVswG4p95cNn5bcyUH9z4tmL4ws0jhxL4BME5sY2vs/https/media.tenor.com/images/babc31fe30df0e506d182b22a4b24458/tenor.gif`,
  `https://images-ext-2.discordapp.net/external/Nj8MdQ16KwcBDXwR9GG8ghCWbWkHnnocUIvylCfCQFA/https/media.tenor.com/images/11f11d685fe8b55401d16768f5e5789b/tenor.gif`,
  `https://media.discordapp.net/attachments/799595012005822484/812197793947058226/ezgif.com-gif-maker.gif`,
  `https://cdn.discordapp.com/attachments/799595012005822484/812198005637251123/ezgif.com-gif-maker_1.gif`,
  `https://media.discordapp.net/attachments/799595012005822484/812193818874347550/1613712492706.jpg`,
  `https://media.discordapp.net/attachments/799595012005822484/812193819063877632/1613712492713.jpg`,
  `https://media.discordapp.net/attachments/799595012005822484/812193819285651456/1613712492721.jpg`,
  `https://media.discordapp.net/attachments/651015913080094724/812193541304221746/1613712421455.jpg`
]

module.exports = function randomRes(x){
    return {
        response: response[x], 
        reslen: response.length,
        // responseMild: responseMild[x],
        // resMildLen: responseMild.length,
        resGeh: resGeh[x],
        resGehLen: resGeh.length
      };
}