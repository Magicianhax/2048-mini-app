# Vercel Deployment Steps

## Quick Deploy

1. **Go to Vercel**: https://vercel.com
2. **Sign in** with GitHub
3. **Click "Add New Project"**
4. **Import** your repository: `Magicianhax/2048-mini-app`
5. **Vercel will auto-detect**:
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. **Click "Deploy"**

## After Deployment

1. **Get your Vercel URL** (e.g., `https://2048-mini-app.vercel.app`)

2. **Update the manifest file**:
   - Edit `public/.well-known/farcaster.json`
   - Replace `YOUR-VERCEL-URL.vercel.app` with your actual Vercel URL
   - Commit and push:
     ```bash
     git add public/.well-known/farcaster.json
     git commit -m "Update manifest with production URL"
     git push
     ```
   - Vercel will auto-deploy the update

3. **Verify manifest is accessible**:
   - Visit: `https://your-app.vercel.app/.well-known/farcaster.json`
   - You should see the JSON manifest

4. **Publish in Farcaster**:
   - Go to: https://farcaster.xyz/~/developers/mini-apps/manifest
   - Enter your Vercel domain (without https://)
   - Fill in app details
   - Publish!

## Custom Domain (Optional)

1. In Vercel dashboard, go to your project → Settings → Domains
2. Add your custom domain
3. Update manifest with your custom domain
4. Push changes

## Environment Variables

No environment variables needed for this app!

## Build Settings

Vercel will automatically use:
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

These are configured in `vercel.json` and `package.json`.

