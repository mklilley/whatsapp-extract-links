# whatsapp-extract-links

## What's it for?

This repo will help you migrate away from WhatsApp.

If you are anything like me, then you've got lots of group chats where you've shared plenty of interesting links over the years. WhatsApp doesn't give you an easy way to export those so I created this repo to help with that.

## How to use it?

### Simple node.js usage

- Make sure you've got [`node.js`](https://nodejs.org/en/download/) installed
- Download `index.js` from this repository - easiest to do this is by [saving the raw file from here](https://raw.githubusercontent.com/mklilley/whatsapp-extract-links/main/index.js)
- Run `node index.js` in the directory where you just downloaded the file
- You'll then need to type the name of the file that contains your WhatsApp chat
  - You should be able to start typing and use `tab` to autocomplete the file name but I must confess I've not thoroughly tested this feature
  - If you need help exporting WhatsApp chat history, take a look at the [WhatsApp FAQs](https://faq.whatsapp.com/android/chats/how-to-save-your-chat-history/)
- You'll end up with two files:
  - `whatsapp-messages-with-links.txt` - a list of messages that contain a link (so you've got some context, e.g. who shared the link, when etc. )
  - `whatsapp-only-links.txt` - just contains a list of the links shared in the chat

### Using npm

- Make sure you've got [`node.js`](https://nodejs.org/en/download/) installed - this will include `npm`
- Download or clone the entire repo
- Run `npm start` in the directory where you downloaded/cloned the repo
- You'll then need to type the name of the file that contains your WhatsApp chat
  - You should be able to start typing and use `tab` to autocomplete the file name but I must confess I've not thoroughly tested this feature
  - If you need help exporting WhatsApp chat history, take a look at the [WhatsApp FAQs](https://faq.whatsapp.com/android/chats/how-to-save-your-chat-history/)
- You'll end up with two files:
  - `whatsapp-messages-with-links.txt` - a list of messages that contain a link (so you've got some context, e.g. who shared the link, when etc. )
  - `whatsapp-only-links.txt` - just contains a list of the links shared in the chat

---

If you've found this tool helpful, then please consider the gift of caffeination 😁 . Thanks 🙏 .

<a href="https://www.buymeacoffee.com/mklilley" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height = "60" ></a>
