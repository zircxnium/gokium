const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch');
const Coutries = ["USA", "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burma", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Congo (Brazzaville)", "Congo (Kinshasa)", "Costa Rica", "Cote d'Ivoire", "Croatia", "Cuba", "Cyprus", "Czechia", "Denmark", "Diamond Princess", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Holy See", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Korea, South", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "MS Zaandam", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania", "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan*", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Trinidad and Tobago", "Tunisia", "Turkey", "US", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "West Bank and Gaza", "Western Sahara", "Yemen", "Zambia", "Zimbabwe"];

/* Export our launch() function */
module.exports.launch = (bot, config, message, args) => {
  if (!args[1]) {
    fetch("https://covid19.mathdro.id/api")
    .then(res => res.json()).then(body => {
      if(!body) return message.reply("whoops. ya eu un prob!");
      var lastUpdate = body.lastUpdate.replace(/.000Z|.648Z|T/gi, " ");
  
      let theEmbed = new MessageEmbed()
        .setColor(0xCC0000)
        .setTitle("Stats COVID-19 dans le monde")
        .setAuthor(`Coronavirus`, "https://i.imgur.com/5ullcP7.png")
        .addField("**Confirmés**", `${body.confirmed.value}`, true)
        .addField("**Soignés**", `${body.recovered.value}`, true)
        .addField("**Morts**", `${body.deaths.value}`, true)
        .addField("**Dernière update**", `${lastUpdate}`, true)
        .setTimestamp()
        .setFooter("Gokium", bot.user.displayAvatarURL({ format: 'png' || 'gif', dynamic: true })); 
  
        return message.channel.send(theEmbed);
    })
  } else if (Coutries.indexOf(args[1]) > -1) {
    fetch(`https://covid19.mathdro.id/api/countries/${args[1]}`)
    .then(res => res.json()).then(body => {
      if(!body) return message.reply("whoops. ya eu un prob!");
      var lastUpdate = body.lastUpdate.replace(/.000Z|.648Z|T/gi, " ");

      let theEmbed = new MessageEmbed()
        .setColor(0xCC0000)
        .setTitle(`Stats COVID-19 - ${args[1]}`)
        .setAuthor(`Coronavirus`, "https://i.imgur.com/5ullcP7.png")
        .addField("**Confirmés**", `${body.confirmed.value}`, true)
        .addField("**Soignés**", `${body.recovered.value}`, true)
        .addField("**Morts**", `${body.deaths.value}`, true)
        .addField("**Dernière update**", `${lastUpdate}`, true)
        .setTimestamp()
        .setFooter("Gokium", bot.user.displayAvatarURL({ format: 'png' || 'gif', dynamic: true }));

        return message.channel.send(theEmbed);
    })
  }
}

/* Exports */
exports.commands = {
  description: 'Afficher les stats du coronavirus en France.',
  use: "coronavirus (Pays optionnel)"
}