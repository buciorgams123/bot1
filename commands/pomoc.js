const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "pomoc",
    category: "default",
    run: (client, message, args) => {
        const embed = new MessageEmbed()
            .setAuthor("SaitRPG", client.user.avatarURL())
            .setDescription(client.commands.map(cmd => `\`${cmd.name}\``).join(", "))
            .setColor("GREEN")
            .setThumbnail(client.user.avatarURL())
            .setTimestamp()
            .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }))
        message.channel.send(embed)
    }
}