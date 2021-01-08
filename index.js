// Created by : Matt Lilley
// Created on : 08/01/2021
// Purpose    : To help people extract links from an exported WhatsApp chat
// References : https://attacomsian.com/blog/reading-a-file-line-by-line-in-nodejs
//              https://stackoverflow.com/questions/49078570/check-for-end-of-file-in-nodejs-with-line-by-line-read#49078670
//              https://nodesource.com/blog/understanding-streams-in-nodejs/
//              https://stackoverflow.com/questions/1500260/detect-urls-in-text-with-javascript/8943487#8943487
//              https://stackoverflow.com/questions/10384340/how-to-append-to-new-line-in-node-js
//              https://stackoverflow.com/questions/53981103/wait-for-user-input-from-readline-module-node-js
//              https://flaviocopes.com/how-to-check-if-file-exists-node/
//              https://stackoverflow.com/questions/42197385/node-js-file-folder-auto-completion-on-user-input

const os = require("os");
const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  completer: completer // completer function at the bottom of the file
});

// Prompt the user for the name of the file where the WhatsApp messags are
rl.setPrompt("File name (start typing and hit tab for autocomplete): ");
rl.prompt();

rl.on("line", input => {
  // First check that the user actually supplied a filename
  if (input) {
    // Next check the file exists in the current folder
    if (fs.existsSync(input)) {
      rl.close();
      extractLinks(input);
    } else {
      console.log(`Cannot find your file in this folder`);
      rl.prompt();
    }
  } else {
    console.log(`Please supply a file name`);
    rl.prompt();
  }
});

function extractLinks(fileName) {
  // Create two files:
  // onlyLinks - just stores the links
  // messagesWithLinks - stores the message that contains the links
  const onlyLinks = fs.createWriteStream("whatsapp-only-links.txt");
  const messagesWithLinks = fs.createWriteStream(
    "whatsapp-messages-with-links.txt"
  );

  // This regex pattern will recogise most standard links. Improvements are welcome 🙏.
  const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;

  // Open the text file containing the whatsapp messages and allow it to be read
  // line by line. This helps to avoid having to load the entire file into memory
  // because maybe you chat a LOT 🤷‍♂️.
  const whatsAppMessages = readline.createInterface({
    input: fs.createReadStream(fileName),
    output: process.stdout,
    terminal: false
  });

  // Extracts the messages line by line (each message is a line of text)
  whatsAppMessages
    .on("line", line => {
      // Find links on each line
      const links = line.match(urlRegex);

      if (links !== null) {
        // If there are some links, then output that line (which is a single message)
        // to whatsapp-messages-with-links.txt and then end the line with os.EOL
        messagesWithLinks.write(line + os.EOL);
        // Add each link as a separate line in the whatsapp-only-links.txt file
        for (const link of links) {
          onlyLinks.write(link + os.EOL);
        }
      }
    })
    .on("close", function() {
      // End of file so close the files
      messagesWithLinks.end();
      onlyLinks.end();
    });
}

// Modified from https://stackoverflow.com/questions/42197385/node-js-file-folder-auto-completion-on-user-input
function completer(line) {
  const directories =
    line.indexOf("/") != -1 ? line.substring(0, line.lastIndexOf("/") + 1) : "";
  const partialFileName = line.substr(line.lastIndexOf("/") + 1);
  const path = __dirname + "/" + directories;
  const completions = fs.readdirSync(path);
  const hits = completions.filter(function(c) {
    return c.indexOf(partialFileName) === 0;
  });

  const strike = [];
  if (hits.length === 1) strike.push(directories + hits[0]);

  return strike.length
    ? [strike, line]
    : [hits.length ? hits : completions, line];
}
