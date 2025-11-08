# Farcaster 2048 Mini App

A classic 2048 puzzle game built as a Farcaster Mini App.

## Features

- 🎮 Classic 2048 gameplay
- 📱 Touch/swipe controls for mobile
- ⌨️ Keyboard controls (arrow keys)
- 🏆 Score tracking with best score saved
- 🎨 Beautiful, responsive UI
- 🚀 Optimized for Farcaster Mini Apps

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Testing Locally

1. Start the dev server: `npm run dev`
2. Use ngrok to expose it: `ngrok http 3000`
3. Update `public/.well-known/farcaster.json` with your ngrok URL
4. Test in Farcaster Developer Tools

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Vercel will auto-detect Vite settings
4. Update manifest with production URL after deployment

### Manual Build

```bash
npm run build
# Deploy the `dist` folder to your hosting service
```

## Manifest Configuration

Update `public/.well-known/farcaster.json` with your production domain after deployment.

## License

MIT

