How to get Render API key and Service ID

1. API Key (RENDER_API_KEY):
   - Sign in to Render: https://dashboard.render.com
   - Click your avatar → Account → API Keys → "Generate API Key".
   - Copy the key and add it to GitHub Secrets as `RENDER_API_KEY`.

2. Service ID (RENDER_SERVICE_ID):
   - In Render dashboard, open the service you created for this app.
   - In the URL you'll see `/services/srv-xxxxxxxx`; the `srv-xxxxxxxx` is the Service ID.
   - Alternatively, open service settings → General → Service ID.
   - Add the Service ID to GitHub Secrets as `RENDER_SERVICE_ID`.

3. Add the secrets to your GitHub repo: Settings → Secrets → Actions → New repository secret.
