# Deployment guide for lost-found-system

Prerequisites:
- MongoDB Atlas cluster and user
- Email provider credentials (SendGrid or Gmail App Password)
- Render (or Railway/Heroku) account

Quick local test:
1. Copy `.env.example` to `.env` and fill values.
2. Install deps:

```bash
npm install
```

3. Run locally (development):

```bash
npm run dev
```

Deploying to Render (recommended single-service flow):
1. Push this repository to GitHub.
2. Create a new Web Service on Render and connect your GitHub repo.
3. Set the root to the `lost-found-system` folder (if your repo contains multiple projects).
4. Set the start command to `npm start`.
5. Add the environment variables from `.env.example` in Render's dashboard (do not paste secrets into repo).
6. Deploy and monitor logs for successful MongoDB connection and server start.

Frontend options:
- If you prefer a separate frontend deploy (Netlify/Vercel), build the frontend repo then point Netlify to the static build folder or let Vercel handle the build.
- Alternatively, the frontend is already served from Express static files under `public/` and `views/` so a single backend deploy will serve both.

Next steps I can do for you:
- Create a GitHub Action to build & deploy (CI/CD).
- Prepare a `netlify.toml` or Vercel config for the frontend repo.
