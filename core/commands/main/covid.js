const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch');
const coutries = ["USA", "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burma", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Congo (Brazzaville)", "Congo (Kinshasa)", "Costa Rica", "Cote d'Ivoire", "Croatia", "Cuba", "Cyprus", "Czechia", "Denmark", "Diamond Princess", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Holy See", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Korea, South", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "MS Zaandam", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania", "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan*", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Trinidad and Tobago", "Tunisia", "Turkey", "US", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "West Bank and Gaza", "Western Sahara", "Yemen", "Zambia", "Zimbabwe"];
const utils = require('../../utils');

exports.launch = (client, message, args) => {
  fetch(args[0] ? (coutries.find(country => country.toLowerCase() === args[0].toLowerCase()) ? `https://covid19.mathdro.id/api/countries/${args[0]}` : "https://covid19.mathdro.id/api") : "https://covid19.mathdro.id/api")
  .then(res => res.json())
  .then(body => {
    if(!body) return message.reply("Impossible de get le `body`");
  
    const embed = new MessageEmbed()
      .setColor(0x2F3136)
      .setTitle(`Statistiques ${args[0] ? utils.capitalize(args[0]) : "Mondiales"}`)
      .setAuthor(`COVID-19`, "https://i.imgur.com/5ullcP7.png")
      .addField("**Confirmés**", `${utils.formatString(body.confirmed.value)}`, true)
      .addField("**Soignés**", `${utils.formatString(body.recovered.value)}`, true)
      .addField("**Morts**", `${utils.formatString(body.deaths.value)}`, true)
      .addField("**Dernière update**", `${body.lastUpdate.replace(/.000Z|.648Z|T/gi, " ")}`, true)
      .setTimestamp()
      .setFooter("Gokium", client.user.displayAvatarURL({format: "png" || "gif"}));
  
    return message.channel.send(embed);
  });
}

exports.commands = {
  description: 'Afficher les stats du coronavirus',
  use: "covid (Pays optionnel)"
}