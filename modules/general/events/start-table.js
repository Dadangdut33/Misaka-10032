const { readdirSync } = require("fs");
const ascii = require("ascii-table");
const table = new ascii().setHeading("Command", "Load status");
var i = 0;
var x = 0;

module.exports = (option) => {
    readdirSync("./modules/general/commands").forEach(dir => {
        const commands = readdirSync(`./modules/general/commands/${dir}/`).filter(f => f.endsWith(".js"));
        
        for (let file of commands) {
            let pull = require(`../commands/${dir}/${file}`);

            if (pull.name) {
                table.addRow(file, '✅');
                i++;
            } else {
                table.addRow(file, '❎ -> missing something??'); 
                x++;
                continue;
            } 
        }
    });
    var state;
    if(x !== 0){
        state = `Some error occured, You should probably check it!`
    } else {
        state = `All Green and Good to Go!`
    }

    // console.log
    if (option == "table") {
        console.log(table.toString());
        console.log(`${i} Command(s) Loaded. ${x} Command(s) Fail to load. ${state}`);
    } else 
    if (option == "notable") {
        console.log(`${i} Command(s) Loaded. ${x} Command(s) Fail to load. ${state}`);
    } else {
        console.log(`Start Table Module failed to load! Pls check the option`);
    }
}