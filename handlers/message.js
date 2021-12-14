module.exports = (client) => {
    client.on("message", async message => {
        const prefix = process.env?.PREFIX;

        if (message.author.bot) return;
        if (!message.content.startsWith(prefix)) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/g)
        const cmd = args.shift().toLowerCase();
        let command = client.commands.get(cmd);

        if (!command) return;
        if (!command.name) return;

        if (!command) command = client.commands.get(client.aliases.get(cmd));
        if (cmd.length === 0) return;
        if (command) { command.run(client, message, args) }
    })
}