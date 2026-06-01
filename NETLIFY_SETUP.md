Netlify deploy setup (frontend)

1. Create a Netlify Personal Access Token:
   - Go to https://app.netlify.com/user/applications
   - Under "Personal access tokens" click "New access token", give it a name, and copy the token.
   - Add the token to GitHub Secrets as `NETLIFY_AUTH_TOKEN`.

2. Get your Netlify Site ID:
   - In Netlify, open your site dashboard → Site settings → General → Site details → Site ID.
   - Add the ID to GitHub Secrets as `NETLIFY_SITE_ID`.

3. Decide your publish directory (commonly `build` for Create React App, or `dist` for Vite). Update workflow if different.

4. Place the workflow file `deploy-netlify.yml` (template provided) into the frontend repo at `.github/workflows/deploy-netlify.yml` and push to `main` to trigger deploys.
