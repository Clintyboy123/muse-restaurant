# Muse Restaurant: the tech stack, explained

A plain-language walkthrough of how muserestaurant.co.za is built, for whoever looks after it next.
The short version of the commands is in `README.md`.

## 1. The idea in one paragraph

Muse's own line is the design: *"We see food as an art form and chefs as the artist."* So the site behaves like a
small gallery. Sections are numbered like rooms (I, II, III…), photographs are hung with wall labels ("Plate No. 04"),
the hero shows a single plate lit like a painting in a dark room, and the menu is set out like an exhibition catalogue.
Everything is built from the restaurant's real material: its photography, its three menu PDFs, the MUSE wordmark
(traced from the vector artwork inside the wine list) and the chefs' crossed-knives emblem. Visitors can read the full
menu, drinks and wine list, see the room and the plates, and send reservation, event and general enquiries that are
saved in a database and emailed to the restaurant.

## 2. How a visit works

```
Visitor's browser
   |  https://muserestaurant.co.za
VPS Nginx (HTTPS certificate, the domain)            <- on the server, not in this project
   |  127.0.0.1:8104
frontend container: Nginx serving the built React site, menu PDFs and music
   |  /api/* only
backend container: Express API (validates, saves, emails, reads the Google rating)
   |
database container: MySQL 8.4 (data in a Docker volume)
```

Pages are served by the frontend container. When someone sends an enquiry, the browser posts it to `/api/...` on the
same domain; Nginx passes it to the API over Docker's private network. The API and the database are never reachable
from the internet.

## 3. The three containers

| Container | Job | Reachable from |
| --- | --- | --- |
| `frontend` | Serves the site, the menu PDFs and the music; forwards `/api` | The VPS itself only (`127.0.0.1:8104`) |
| `backend` | Checks and saves enquiries, sends email, serves the rating | Inside the stack only |
| `database` | Stores reservation, event and general enquiries | Inside the stack only |

The Compose project name `muserestaurant` keeps its containers, network and data separate from every other site on the VPS.

## 4. Frontend: the website people see

- React + Vite, styled with Tailwind CSS. All colours, fonts, the type scale and the spacing rhythm are named once in
  `frontend/src/styles/index.css` (the design system). All animation timing is in `frontend/src/utils/motion.js`.
- **Pages** (`frontend/src/pages/`): Home, Restaurant (menu, drinks, wine list), Our Story, Events (with the enquiry
  form), Gallery, Contact (reservation and general forms, map), and a 404 page. Every page except Home loads on demand.
- **Content files** (`frontend/src/content/`): `menu.js` (every dish, drink, wine and price, plus the season name),
  `site.js` (address, phones, hours, social links, navigation), `story.js` (the chefs), `events.js` (occasions and event
  types), `reviews.js` (guest quotes, awards, press), `music.js` (the playlist), `photos.json` (every photo, its alt
  text and gallery category).
- **Photos:** the restaurant's own photography, exported as WebP at two widths by `tools/photos.py`, never upscaled,
  lazy-loaded below the first screen, each with its own average colour as a placeholder.
- **Motion:** a one-time MUSE loader (bars draw out, letters rise), a curtain between pages, headings rising word by
  word out of a mask, photos revealed by a lifting mask and drifting gently on scroll. Visitors who ask their device for
  reduced motion get simple fades.
- **Always-on controls:** a "Sound" button (bottom left; music starts on every load), back to top with a progress ring (bottom right),
  a Reserve button between them on phones, and social links in the left margin on wide screens.

## 5. Backend: the API

Express, built in layers for each feature:

```
routes/*.routes.js        which fields are required and what is valid
controllers/*.js          turn the request into a response
services/*.service.js     save, then email the restaurant (and the guest)
services/mail.service.js  SMTP (optional; without it submissions are only saved)
services/reviews.service.js  Google rating: live from Google Places with a key, else the values in .env
models/*.js               the tables
config/hours.js           trading hours, so no one can request a closed day or time
```

Reservation rules: name, a real-looking email and phone, 1 to 30 guests, a date from today up to six months ahead on
Tuesday to Saturday, and a time between 12:00 and 21:00 (one hour before closing).

## 6. Database

Three tables, each created by a migration that runs automatically when the backend starts:

- `reservations`: name, email, phone, guests, date, time, requests, `status` (pending / confirmed / declined),
  `notified_at`, timestamps.
- `event_enquiries`: name, email, phone, event type, preferred date, guests, requirements, `status` (new / in progress /
  closed), `notified_at`, timestamps.
- `enquiries`: name, email, phone, subject, message, `notified_at`, timestamps.

## 7. Security

- Only the frontend port is published, and only on `127.0.0.1`.
- Every field is validated on the server; unexpected fields are dropped.
- 10 form submissions per hour per visitor, plus a hidden honeypot field that catches spam bots.
- Secrets (database passwords, SMTP password, Google API key) live only in `.env` on the server, never in the website code.
- Security headers from Helmet (API) and Nginx (pages). Fonts are self-hosted, so there are no third-party requests on load.

## 8. Testing

`./scripts/smoke-test.sh` builds the real production stack and checks it end to end (see README). The three forms
were also tested through the API and by hand in the browser: empty submit, invalid fields, a closed day, a time after
the last sitting, the honeypot, real submissions and the thank-you screens, at desktop and phone widths.

## 9. Deployment

Identical to the other sites on this VPS: GitHub Actions builds the images, pushes them to GHCR and deploys over SSH
with `deploy/deploy.sh` (backup first, health check, automatic rollback). See README, "Deploying with GitHub Actions".
The deploy job stays off until the repository variable `DEPLOY_ENABLED` is `true`.

## 10. Known limits and what's next

- **No chef portraits.** The current site has none, so Allan's and Simone's chapters use kitchen photography that is
  deliberately not captioned with their names. Swap in real portraits in `content/story.js` when they are supplied.
- **The seasonal menu is "Winter 2026"**, the latest PDF on the current site. Replace it when the new season's menu is ready.
- **Photo resolution.** The best originals are about 1,500–1,800 px wide. Higher-resolution files from the photographer
  would sharpen the full-screen images noticeably on large and retina screens.
- **No admin screen.** Enquiries are emailed (once SMTP is set) and can be listed with the command in the README. A
  small password-protected bookings page is the natural next feature.
- **WhatsApp** opens a chat with the mobile number from the current site (+27 73 991 5011); confirm it is on WhatsApp.
