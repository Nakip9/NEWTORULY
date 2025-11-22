<div align="center">
  
  ![GitHub repo size](https://img.shields.io/github/repo-size/codewithsadee/tourly)
  ![GitHub stars](https://img.shields.io/github/stars/codewithsadee/tourly?style=social)
  ![GitHub forks](https://img.shields.io/github/forks/codewithsadee/tourly?style=social)
[![Twitter Follow](https://img.shields.io/twitter/follow/codewithsadee_?style=social)](https://twitter.com/intent/follow?screen_name=codewithsadee_)
  [![YouTube Video Views](https://img.shields.io/youtube/views/FYFmQEpZywc?style=social)](https://youtu.be/FYFmQEpZywc)

  <br />
  <br />
  
  <img src="./readme-images/project-logo.png" />

  <h2 align="center">Tourly - Travel website</h2>

  Tourly is fully responsive travel website, <br />Responsive for all devices, built using HTML, CSS, and JavaScript.

  <a href="https://codewithsadee.github.io/tourly/"><strong>➥ Live Demo</strong></a>

</div>

<br />

### Demo Screeshots

![Tourly Desktop Demo](./readme-images/desktop.png "Desktop Demo")

### Run it locally

1) Install a simple static server (any of the following works):
   * Node users: `npm install -g serve`
   * Python users: built-in `python3 -m http.server`

2) Clone and start the site:
```bash
git clone <this-repo-url>
cd NEWTORULY
# Option A: with serve
serve .
# Option B: with Python
python3 -m http.server 8080
```

3) Open the site in your browser at `http://localhost:3000` (serve default) or `http://localhost:8080` (Python).

### Deploy it

Because the project is static HTML/CSS/JS, you can deploy by uploading the folder contents to any static host:
* **GitHub Pages**: push to a GitHub repo, enable Pages for the main branch, and the site will be served automatically.
* **Netlify/Vercel**: create a new site and point it at this folder; no build step required.
* **Any static host / S3 / Cloud Storage**: upload the files as-is and enable public hosting.

### Telegram bot hookup

1) Create a bot via [@BotFather](https://t.me/BotFather) and copy the bot token it gives you.
2) Find the chat ID where you want to receive messages (for a group, add the bot to the group; for direct messages, start a chat with the bot). Use a bot like `@userinfobot` or call `https://api.telegram.org/bot<token>/getUpdates` to see the `chat.id` value after sending a message.
3) Open `index.html` and set your credentials on the contact form element:
```html
<form class="contact-form"
  data-telegram-form
  data-telegram-token="YOUR_TELEGRAM_BOT_TOKEN"
  data-telegram-chat-id="YOUR_CHAT_ID">
```
Replace `YOUR_TELEGRAM_BOT_TOKEN` and `YOUR_CHAT_ID` with your values. The frontend will send inquiries directly to that chat.

### What you can customize

* **Countries showcase** (`index.html`, Countries section): each `.country-card` has an image, tagline, name, description, and the “Discover” button link. Swap the image sources in `./assets/images`, edit the text, or duplicate cards to add more countries.
* **Contact form fields** (`index.html`): the form currently collects name, email, phone, and message. You can add inputs, but keep the `data-telegram-*` attributes and update `assets/js/script.js` if you change field names.
* **Animations & styles** (`assets/css/style.css`): hover/scroll effects and responsive grid breakpoints live here; adjust timings, shadows, or column counts as desired.
* **Branding** (`assets/images/logo.svg`, footer in `index.html`): update logos, colors, and footer text to match your brand/year.

### License

This project is **free to use** and does not contains any license.
