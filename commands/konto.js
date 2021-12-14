const { MessageEmbed } = require("discord.js"),
      mysql = require("mysql");  
require("dotenv").config()

module.exports = {
    name: "konto",
    category: "default",
    run: (client, message, args) => {
        const connection = mysql.createConnection({
            host     : process.env?.HOST,
            port     : "3306",
            user     : process.env?.USER,
            password : process.env?.PASSWORD,
            database : process.env?.DATABASE
        });

        if (!args[0]) return message.channel.send(new MessageEmbed()
            .setDescription("Podaj sid osoby!")
            .setColor("RED")
        )

        connection.query(`SELECT * FROM pystories_users WHERE id = "${args[0]}"`, (err, rows) => {
            if (err) throw err;
            if (!rows.length) return message.channel.send(new MessageEmbed()
                .setDescription("Taka osoba nie istnieje w naszej bazie danych!")
                .setColor("RED")
            )

            const replace = {
                "1": "Tak",
                "0": "Nie"
            }

            const embed = new MessageEmbed()
                .setAuthor("Informacje o koncie")
                .setDescription(`Witaj, w systemie kont ${client.user.username}, znajdziesz tutaj wiele informacji na temat koncie użytkownika. Poniżej, jak możesz zauważyć zostały ukazane wszystkie informacje o koncie użytkownika.`)
                .addFields(
                    { name: "Login", value: `${rows[0].login}` },
                    { name: "Drugi login", value: `${rows[0].login2 || "brak"}` },
                    { name: "Zetony", value: `${rows[0].zetony}` },
                    { name: "Skin", value: `${rows[0].skin}` },
                    { name: "SRP", value: `${rows[0].srp}` },
                    { name: "Prawo jazdy (A)", value: `${replace[rows[0].pjA]}` },
                    { name: "Prawo jazdy (B)", value: `${replace[rows[0].pjB]}` },
                    { name: "Prawo jazdy (C)", value: `${replace[rows[0].pjC]}` },
                    { name: "Prawo jazdy (L)", value: `${replace[rows[0].pjL]}` },
                    { name: "Prawo jazdy (T)", value: `${replace[rows[0].pjT]}` },
                    { name: "Zarejestrowany", value: `${rows[0].registered}` },
                    { name: "Serial", value: `${rows[0].register_serial}` },
                    { name: "Pieniądze", value: `${rows[0].money}` },
                    { name: "Pieniądze w banku", value: `${rows[0].bank_money}` },
                    { name: "Połączone konto", value: `${rows[0].discordconnected}` }
                ) 
                .setColor("GREEN")
                .setThumbnail(client.user.avatarURL())
                .setTimestamp()
                .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }))
            message.channel.send(embed)
        })
    }
}