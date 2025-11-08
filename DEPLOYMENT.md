# Deployment Guide for Farcaster 2048 Mini App

## Quick Deploy Options

### Option 1: Vercel (Recommended - Easiest)

1. **Install Vercel CLI** (optional, or use web interface):
   ```bash
   npm install -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```
   Follow the prompts:
   - Link to existing project or create new
   - Confirm settings
   - Deploy!

3. **Get your production URL** (e.g., `https://your-app.vercel.app`)

4. **Update manifest** with production URL (see below)

### Option 2: Netlify

1. **Install Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```

2. **Build your app**:
   ```bash
   npm run build
   ```

3. **Deploy**:
   ```bash
   netlify deploy --prod --dir=dist
   ```

4. **Or use Netlify web interface**:
   - Go to https://app.netlify.com
   - Drag and drop the `dist` folder
   - Get your URL (e.g., `https://your-app.netlify.app`)

### Option 3: Cloudflare Pages

1. **Install Wrangler CLI**:
   ```bash
   npm install -g wrangler
   ```

2. **Login**:
   ```bash
   wrangler login
   ```

3. **Deploy**:
   ```bash
   npm run build
   wrangler pages deploy dist
   ```

## After Deployment

### Step 1: Update Manifest File

Update `public/.well-known/farcaster.json` with your production domain:

```json
{
  "miniapp": {
    "version": "1",
    "name": "2048 Game",
    "iconUrl": "https://your-production-domain.com/icon.png",
    "homeUrl": "https://your-production-domain.com",
    "imageUrl": "https://your-production-domain.com/og-image.png",
    "buttonTitle": "🎮 Play 2048",
    "splashImageUrl": "https://your-production-domain.com/splash.png",
    "splashBackgroundColor": "#667eea",
    "subtitle": "Classic 2048 puzzle game",
    "description": "Join the tiles and get to 2048! A classic puzzle game optimized for Farcaster.",
    "primaryCategory": "games",
    "tags": ["games", "puzzle", "2048"]
  }
}
```

### Step 2: Verify Manifest

Check that your manifest is accessible:
```
https://your-production-domain.com/.well-known/farcaster.json
```

### Step 3: Publish in Farcaster

1. Go to https://farcaster.xyz/~/developers/mini-apps/manifest
2. Enter your production domain
3. Fill in app details
4. Publish!

## Important Notes

- Make sure `/.well-known/farcaster.json` is accessible at your production URL
- Update all image URLs in the manifest (icon, splash, og-image)
- The manifest must be served over HTTPS
- Keep your production domain stable (can't change later)


