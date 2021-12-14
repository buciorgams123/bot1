const { Client, Collection } = require("discord.js"),
      fs = require("fs"),
      Gamedig = require("gamedig");
require("dotenv").config();

class App extends Client {
    constructor() {
        super();

        this.commands = new Collection();
        for (const i of fs.readdirSync("./handlers")) {
            require("./handlers/" + i)(this);
        }
        
        this.login(process.env?.TOKEN).then(() => {
            console.log(`Połączono jako ${this.user.tag}`);
            
            setInterval(() => {
                Gamedig.query({ socketTimeout: 2000, attemptTimeout: 10000, type: "mtasa", host: "178.32.201.167", port: "20444" }).then((state) => {
                    this.user.setActivity(`SaitRPG [${state.raw.numplayers}/${state.maxplayers}]`, { type: "LISTENING" })
                });
            }, 30000)
        })
    }
}

new App();