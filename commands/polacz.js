const { MessageEmbed } = require("discord.js"),
      mysql = require("mysql"); 
require("dotenv").config()  

module.exports = {
    name: "polacz",
    category: "default",
    run: (client, message, args) => {
        const connection = mysql.createConnection({
            host     : process.env.HOST,
            port     : "3306",
            user     : process.env.USER,
            password : process.env.PASSWORD,
            database : process.env.DATABASE
        });

        if (message.guild) return message.channel.send(new MessageEmbed()
            .setDescription("Tej komendy możesz użyc jedynie poprzez prywatną wiadomość z botem!")
            .setColor("RED")
        )
        else if (!args[0] || isNaN(args[0])) return message.channel.send(new MessageEmbed()
            .setDescription("Podaj prawidłowy kod weryfikacyjny!")
            .setColor("RED")
        )

        connection.query(`SELECT * FROM pystories_users WHERE kod = "${args[0]}"`, (err, rows) => {
            if (!rows.length) return message.channel.send(new MessageEmbed()
                .setDescription("Podany kod weryfikacyjny jest nieprawidłowy!")
                .setColor("RED")
            )

            connection.query(`SELECT * FROM discord_connect WHERE serial = "${rows[0].serial}"`, (err, rows1) => {
                connection.query(`SELECT * FROM discord_connect WHERE did = "${message.author.id}"`, (err, rows2) => {
                    if (rows1.length || rows2.length) return message.channel.send(new MessageEmbed()
                        .setDescription("To konto jest już połączone z naszym serwerem!")
                        .setColor("RED")
                    )

                    message.channel.send(new MessageEmbed()
                        .setDescription("Pomyślnie połączono konto z naszym serwerem! \nWykonaj `reconnect` w swojej konsoli, aby zobaczyć swój avatar!")
                        .setColor("GREEN")
                    )

                    connection.query(`INSERT INTO discord_connect (did, sid, serial, avatarurl) VALUES ("${message.author.id}", "${rows[0].id}", "${rows[0].register_serial}", "${message.author.avatarURL({ format: "png", size: 512 })}")`, (err) => { if (err) throw err; return; })
                    connection.query(`UPDATE pystories_users SET discordconnected = "TAK" WHERE kod = "${args[0]}"`, (err) => { if (err) throw err; return; })
                })
            })
        })
    }
}