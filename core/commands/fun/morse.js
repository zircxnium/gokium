/* Export our launch() function */
exports.launch = (client, message, args) => {
  const alpha = " ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split(""),
  morse = "/,.-,-...,-.-.,-..,.,..-.,--.,....,..,.---,-.-,.-..,--,-.,---,.--.,--.-,.-.,...,-,..-,...-,.--,-..-,-.--,--..,.----,..---,...--,....-,.....,-....,--...,---..,----.,-----".split(",");
  let text = args.join(" ").toUpperCase();

  while (text.includes("Ä") || text.includes("Ö") || text.includes("Ü")) text = text.replace("Ä","AE").replace("Ö","OE").replace("Ü","UE");

  if (text.startsWith(".") || text.startsWith("-")) {
    text = text.split(" ");
    let length = text.length;
    for (i = 0; i < length; i++) {
      text[i] = alpha[morse.indexOf(text[i])];
    }
    text = text.join("");
  } else {
    text = text.split("");
    const length = text.length;
    for (i = 0; i < length; i++) {
      text [i] = morse[alpha.indexOf(text[i])];
    }
    text = text.join(" ");
  }

  return message.channel.send("`" + text + "`");
}

exports.commands = {
  description: "Transforme un texte en morse.",
  use: "morse [texte]"
}