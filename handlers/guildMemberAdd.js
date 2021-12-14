const { MessageEmbed } = require("discord.js");

module.exports = (client) => {
    client.on("guildMemberAdd", async member => {
        member.send(new MessageEmbed()
            .setDescription(`Witaj ${member.user.username}, \nWłaśnie dołączyłeś/aś na Discorda serwera SaitRPG.\n\n🔰 Aby móc w pełni korzystać z discorda zaakceptuj regulamin poprzez zostawienie reakcji 👍\n📰 Regulamin znajdziesz na kanale #📰┇regulamin\n❓ Jeżeli masz jakieś pytania odnośnie serwera napisz wiadomość do naszej Administracji\n🔰 Połącz swoje konto Discord z grą przy użyciu komendy .polacz\n\n🕹️ Życzymy miłej gry!`)
            .setColor("GREEN")
        )
    })
}