# Frontend deployment (lost-found-frontend)

If you want to host the frontend separately (recommended for faster CDN delivery):

1. In the frontend repo, ensure `package.json` has a build script like `"build": "vite build"` or `"build": "react-scripts build"` depending on framework.
2. Run locally to verify:

```bash
npm install
npm run build
```

3. Deploy options:
- Netlify: Connect repo, set build command (`npm run build`) and publish directory (`dist` or `build`).
- Vercel: Connect repo and let Vercel detect framework; it will run `npm run build` automatically.

4. If keeping a single deploy, push frontend `dist` into backend `public/` before deploying backend.
