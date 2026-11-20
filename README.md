# Muse Restaurant

Website for Muse, a fine-dining restaurant at 182 Main Road, Walmer, Gqeberha, run by chefs Allan and Simone Bezuidenhout: home, the restaurant and its menus (seasonal, drinks, wine), our story, events & catering with an enquiry form, a filterable gallery, and contact with reservation enquiries.

- **Domain:** muserestaurant.co.za
- **Compose project name:** `muserestaurant`
- **Host port (VPS Nginx forwards here):** `8104`

## How it fits together

```
Browser
   |
VPS Nginx  (HTTPS, domain; lives on the server, not in this project)
   |
frontend container  (Nginx: serves the built React site)
   |-- /api/*  -->  backend container  (Express API)
                        |
                    database container  (MySQL, data kept in a Docker volume)
```

Only the frontend is reachable from the server itself (on `127.0.0.1:8104`). The API and the database
can only be reached from inside this site's own Docker network. Every website on the VPS is its own stack like
this one, with its own database, so sites cannot affect each other.

## Technologies

| Part | Built with |
| --- | --- |
| Frontend | React (JavaScript), Vite, Tailwind CSS, Motion for React, React Router, Axios, Lucide React |
| Backend | Node.js, Express, Sequelize, express-validator, Helmet, express-rate-limit |
| Database | MySQL 8.4 |
| Hosting | Docker Compose, Nginx |

## Folders

```
frontend/   the website people see
  src/pages        one file per page
  src/components   reusable pieces (ui/ = buttons, fields, cards ...)
  src/layouts      shared page frames (header, footer)
  src/services     api.js: the one place that talks to the backend
  src/styles       index.css: colours, fonts and easing (the design tokens)
  nginx/           how the site and /api are served in production
backend/    the API and business logic
  src/routes -> controllers -> services -> models   one request, top to bottom
  src/migrations   every change to the database structure, in order
  src/seeders      starting data
docker-compose.yml       the production stack
docker-compose.dev.yml   extra settings for local development only
.env.example             list of settings; copy to .env
scripts/smoke-test.sh    builds the stack and checks it works
```

## Settings (.env)

```bash
cp .env.example .env
```

Open `.env` and set the name, port and passwords. Generate each password with:

```bash
openssl rand -base64 32
```

`.env` holds real passwords. It is ignored by git and must never be committed or sent to anyone.

**Form emails.** Every reservation enquiry, event enquiry and message is saved in the database first. If `SMTP_HOST`
is filled in, the restaurant (`MAIL_TO`, default info@muserestaurant.co.za) is emailed and the guest gets an
acknowledgement that says clearly the booking is *not yet confirmed*. With `SMTP_HOST` empty, nothing is emailed:
submissions are only saved (and a warning is logged). Ask the restaurant's email host for the SMTP details.

**Google rating.** The rating and review count on the home page come from the API (`/api/reviews/summary`), never from
the page itself. Two ways to keep them current:
- *Automatic:* create a Google Cloud API key with the **Places API (New)** enabled and put it in `GOOGLE_PLACES_API_KEY`.
  The live numbers are then fetched at most every `REVIEWS_CACHE_HOURS` (default 12).
- *Manual:* leave the key empty and update `REVIEWS_RATING` and `REVIEWS_COUNT`, then `docker compose restart backend`.
If Google is unreachable the API falls back to the manual values, so the page always has numbers.

## Run it

Build and start (also the command for the first launch on the VPS):

```bash
docker compose up -d --build
```

Check that all three containers are `healthy`:

```bash
docker compose ps
```

Stop the site (the database is kept):

```bash
docker compose down
```

> Never add `-v` to `down` unless you mean to delete the database. `docker compose down -v` erases all saved data.

Full check of the production build:

```bash
./scripts/smoke-test.sh
```

## Logs

```bash
docker compose logs -f backend
```

Swap `backend` for `frontend` or `database`, or leave the name off to see all three.

## Database migrations

Migrations run automatically every time the backend container starts. To run or inspect them by hand:

```bash
docker compose exec backend npm run migrate
```

```bash
docker compose exec backend npm run migrate:status
```

Undo the most recent migration:

```bash
docker compose exec backend npm run migrate:undo
```

Load starting data (only when the project has seeders):

```bash
docker compose exec backend npm run seed
```

## The API

The API is not public on its own port. It is reached through the site: `https://muserestaurant.co.za/api/...`

Health check, from the VPS:

```bash
curl http://127.0.0.1:8104/api/health
```

Expected: `{"success":true,"message":"API is operational","database":"connected"}`

| Method | Path | What it does |
| --- | --- | --- |
| GET | `/api/health` | Health check (used by Docker and the deploy script) |
| GET | `/api/reviews/summary` | Google rating and review count (live from Google with an API key, otherwise from `.env`) |
| POST | `/api/reservations` | Reservation enquiry: name, email, phone, guests (1–30), date (Tue–Sat, today to 6 months), time (12:00–21:00), requests. Saved as `pending`; never an automatic confirmation |
| POST | `/api/event-enquiries` | Event / catering enquiry: name, email, phone, event type, preferred date, guests, requirements |
| POST | `/api/enquiries` | General message: name, email, phone (optional), subject, message |

All three forms are rate limited (10 per hour per visitor), validated on the server, and have a hidden honeypot field
that rejects most spam bots.

**Reading submissions** (until there is an admin page), on the server:

```bash
docker compose exec database sh -c 'mysql -u"$MYSQL_USER" -p"$MYSQL_PASSWORD" "$MYSQL_DATABASE" -e "SELECT id, name, guests, date, time, status, created_at FROM reservations ORDER BY id DESC LIMIT 20;"'
```


## Back up the database

```bash
mkdir -p backups && docker compose exec -T database sh -c 'exec mysqldump --single-transaction --no-tablespaces -u root -p"$MYSQL_ROOT_PASSWORD" "$MYSQL_DATABASE"' | gzip > "backups/$(date +%F-%H%M).sql.gz"
```

Restore a backup (replaces the current data):

```bash
gunzip -c backups/FILE.sql.gz | docker compose exec -T database sh -c 'exec mysql -u root -p"$MYSQL_ROOT_PASSWORD" "$MYSQL_DATABASE"'
```

Take a backup before every update. Keep copies somewhere other than the VPS.

## Deploying with GitHub Actions

Push to `main` and `.github/workflows/ci-cd.yml` does the rest:

1. **verify:** builds both apps and runs `scripts/smoke-test.sh` against the real Docker stack.
2. **image:** pushes `ghcr.io/<owner>/<repo>-frontend` and `-backend`, tagged `sha-<commit>`.
3. **deploy:** over SSH it runs `deploy/deploy.sh`, which backs up the database and uploads, pulls the images,
   restarts, waits for all three containers to be healthy, and rolls back to the previous images by itself if
   they aren't.

Pull requests only run step 1.

One-time setup:

1. **Repository secrets:** `DEPLOY_HOST`, `DEPLOY_USER` (in the docker group), `DEPLOY_SSH_KEY`, `DEPLOY_PATH`
   (e.g. `/srv/muserestaurant`), and `DEPLOY_PORT` if it isn't 22. Optional variable: `SITE_URL`.
2. **On the VPS:** create `DEPLOY_PATH` containing a filled-in `.env` (new passwords, a free `FRONTEND_PORT`).
3. **Log the VPS in to GHCR once**, with a token that has only `read:packages`:

```bash
echo "<token>" | docker login ghcr.io -u <github-username> --password-stdin
```

4. **Switch deploying on:** add the repository variable `DEPLOY_ENABLED` = `true`. Until it's set, the deploy job is
   skipped, so pushes stay green while the server isn't ready.

Roll back by hand to an earlier commit's images:

```bash
./deploy/deploy.sh ghcr.io/<owner>/<repo>-frontend:sha-<old> ghcr.io/<owner>/<repo>-backend:sha-<old>
```

## Update and redeploy

Without GitHub, on a server that builds from the source:

1. Back up the database (above).
2. Get the new version of the project onto the VPS (replace the project files, keeping `.env`).
3. Rebuild and restart. New migrations are applied on start:

```bash
docker compose up -d --build
```

4. Confirm everything is healthy:

```bash
docker compose ps
```

5. Clear out old image layers:

```bash
docker image prune -f
```

## Local development

```bash
docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build database backend
```

```bash
cd frontend && npm install && npm run dev
```

The site runs on the address Vite prints, with live reload. `/api` is forwarded to the backend container.

## VPS Nginx (the server's own reverse proxy)

This project does not touch the VPS-level Nginx. Add a server block like this on the VPS by hand, then reload Nginx.
The certificate paths assume Let's Encrypt; adjust them to how SSL is managed on the server.

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name muserestaurant.co.za www.muserestaurant.co.za;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    http2 on;   # Nginx older than 1.25.1: remove this line and use "listen 443 ssl http2;"
    server_name muserestaurant.co.za www.muserestaurant.co.za;

    ssl_certificate     /etc/letsencrypt/live/muserestaurant.co.za/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/muserestaurant.co.za/privkey.pem;

    # Keep in step with client_max_body_size in frontend/nginx/default.conf
    client_max_body_size 10m;

    location / {
        proxy_pass http://127.0.0.1:8104;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Only if this site uses WebSockets:
        # proxy_set_header Upgrade $http_upgrade;
        # proxy_set_header Connection "upgrade";
    }
}
```

## Intro video and music

**Intro.** On every page load the MUSE logo animation plays full screen, then dissolves into the page (with a
"Skip intro" button). The player looks for `frontend/public/intro/muse-intro.webm` and then `muse-intro.mp4`, and plays
the first one the browser can. Until a file is there, or if a browser can't play it, or the visitor has asked their
device for reduced motion, the drawn MUSE loader runs instead, so the site never waits on a missing video.

Export spec (After Effects render queue or Media Encoder):
- **MP4:** H.264, 1920x1080, 25 fps, no audio, VBR about 6–8 Mbps (aim for under 6 MB). MP4 has no transparency, so render
  the animation over a solid **#171816** background (the site's charcoal) so the edges blend into the page.
- **WebM (optional):** VP9; this can keep the alpha channel.
- Save as `frontend/public/intro/muse-intro.mp4` (plus the 1080p copy `muse-intro-1080.mp4`), change `INTRO_VERSION` in
  `frontend/src/components/layout/Intro.jsx` (so browsers don't keep showing a cached older intro), then rebuild/redeploy.

The original `Scene_01.mov` (4K QuickTime "Animation" with alpha, 2.2 GB) can't play in browsers, and macOS can no
longer convert that codec without ffmpeg.

**Music.** It starts by itself, fading in, as the intro hands over to the page. Browsers don't allow sound before a
visitor has interacted with a page, so where it is blocked it starts on the first click, tap or key press (the "Skip
intro" button counts). Switching it off holds for the rest of the visit; the next load starts it again. To change the
music, add files to `frontend/public/music`, list them in `frontend/src/content/music.js` and bump `MUSIC_VERSION`.

## Technical decisions, in plain language

- **One idea, carried through: Muse as a small gallery.** Sections are numbered like gallery rooms (I, II, III…),
  plates have wall-label captions ("Plate No. 04"), and the menu is laid out like an exhibition catalogue. It comes
  straight from the restaurant's own line: *"We see food as an art form and chefs as the artist."*
- **The restaurant's real assets only.** Every photograph, the menus, the wordmark and the chefs' emblem come from
  muserestaurant.co.za. The MUSE wordmark was traced from the vector artwork inside their wine-list PDF, so it is the exact
  brand mark, not a redraw. Originals are kept in `assets-source/`.
- **Photos are web resolution** (the largest is 1,777 px wide; there were no higher-resolution files). The design works
  around it: the hero plate fills two-thirds of the screen rather than all of it, film grain sits over cinematic
  images, and nothing is upscaled when exported. Better originals can be dropped in later (see `tools/photos.py`).
- **Menus are data, not pictures.** Dishes, drinks and wines live in `frontend/src/content/menu.js`, transcribed exactly
  from the PDFs (obvious spelling slips corrected, e.g. Cappuccino, Callebaut, Inverroche). Changing the season means
  editing that file and replacing the PDF in `frontend/public/menus/`.
- **Reservations are enquiries.** Like the current site, a submission never confirms a table. The form, the thank-you
  message and the guest's email all say so and give the phone number.
- **Fonts are self-hosted** (Cormorant Garamond and Manrope, via Fontsource): no requests to Google Fonts, faster first paint,
  no third-party tracking.
- **Motion has rules.** One easing curve, slow mask reveals, nothing loops on its own, no scroll hijacking, and
  everything turns into simple fades when a visitor's device asks for reduced motion.
- **Music starts by itself on every load** as the intro hands over (or on the first interaction where browsers block sound).
  Switching it off holds for the rest of that visit. The three tracks are licensed from Envato (AudioJungle / Elements):
  keep each licence registered to this website. WAV masters are in `assets-source/music`.
- **Reloading always starts on the home page, at the top**; fresh visits to a page's own link still open that page.
- **Instagram:** linking to the profile from photo tiles rather than embedding a live feed. A live feed needs a Meta
  developer app and a token that expires; the tiles never break.
- **Search:** each page sets its own title, description and social preview; `index.html` carries Restaurant structured
  data (address, hours, phone) plus Open Graph tags, and there is a sitemap. Because this is a React site rendered in the
  browser, crawlers that don't run JavaScript only see the home page's tags.
