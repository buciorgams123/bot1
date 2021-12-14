const fs = require("fs");

module.exports = (client) => {
    fs.readdirSync("./commands").forEach(async(category, file) => {
        const cmds = fs.readdirSync("./commands/");
        for (const cmdFile of cmds) {
            if (!cmdFile.endsWith(".js")) return;

            const cmd = require("../commands/" + cmdFile);

            if (cmd.name && !cmd.disabled) { 
                client.commands.set(cmd.name, cmd);
            }

            if (cmd.aliases && cmd.aliases.length < 0 && Array.isArray(cmd.aliases)) cmd.aliases.forEach((alias) => client.aliases.set(alias, cmd.name));
        }
    });
}