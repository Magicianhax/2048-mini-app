import { createCanvas } from 'canvas';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper function to create an image
function createImage(width, height, filename, drawFunction) {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  
  // Background gradient
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#667eea');
  gradient.addColorStop(1, '#764ba2');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  
  // Call the custom draw function
  drawFunction(ctx, width, height);
  
  // Save the image
  const buffer = canvas.toBuffer('image/png');
  const publicDir = path.join(__dirname, 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  fs.writeFileSync(path.join(publicDir, filename), buffer);
  console.log(`✅ Created ${filename} (${width}x${height})`);
}

// Create icon.png (256x256)
createImage(256, 256, 'icon.png', (ctx, width, height) => {
  ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.fillRect(20, 20, width - 40, height - 40);
  
  // Draw "2048" text
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 80px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('2048', width / 2, height / 2);
});

// Create og-image.png (1200x630)
createImage(1200, 630, 'og-image.png', (ctx, width, height) => {
  // Background already set by gradient
  
  // Draw game board representation
  const boardSize = 4;
  const cellSize = 80;
  const boardWidth = boardSize * cellSize + (boardSize + 1) * 10;
  const boardHeight = boardSize * cellSize + (boardSize + 1) * 10;
  const boardX = (width - boardWidth) / 2;
  const boardY = (height - boardHeight) / 2 - 40;
  
  // Draw cells
  const colors = ['#eee4da', '#ede0c8', '#f2b179', '#f59563', '#f67c5f'];
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      const x = boardX + j * (cellSize + 10) + 10;
      const y = boardY + i * (cellSize + 10) + 10;
      ctx.fillStyle = colors[(i + j) % colors.length];
      ctx.fillRect(x, y, cellSize, cellSize);
    }
  }
  
  // Draw title
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 72px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('2048 Game', width / 2, boardY + boardHeight + 80);
  
  // Draw subtitle
  ctx.font = '36px Arial';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.fillText('Join the tiles, get to 2048!', width / 2, boardY + boardHeight + 130);
});

// Create splash.png (1080x1920)
createImage(1080, 1920, 'splash.png', (ctx, width, height) => {
  // Background already set by gradient
  
  // Draw centered game representation
  const boardSize = 4;
  const cellSize = 120;
  const boardWidth = boardSize * cellSize + (boardSize + 1) * 15;
  const boardHeight = boardSize * cellSize + (boardSize + 1) * 15;
  const boardX = (width - boardWidth) / 2;
  const boardY = height / 2 - boardHeight / 2 - 100;
  
  // Draw cells with numbers
  const values = [
    [2, 4, 8, 16],
    [32, 64, 128, 256],
    [512, 1024, 2048, 4096],
    [8192, 16384, 32768, 65536]
  ];
  
  const cellColors = {
    0: '#cdc1b4',
    2: '#eee4da',
    4: '#ede0c8',
    8: '#f2b179',
    16: '#f59563',
    32: '#f67c5f',
    64: '#f65e3b',
    128: '#edcf72',
    256: '#edcc61',
    512: '#edc850',
    1024: '#edc53f',
    2048: '#edc22e'
  };
  
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      const x = boardX + j * (cellSize + 15) + 15;
      const y = boardY + i * (cellSize + 15) + 15;
      const value = values[i][j];
      ctx.fillStyle = cellColors[value] || '#3c3a32';
      ctx.fillRect(x, y, cellSize, cellSize);
      
      if (value <= 2048) {
        ctx.fillStyle = value <= 4 ? '#776e65' : '#f9f6f2';
        ctx.font = `bold ${value >= 1000 ? 36 : value >= 100 ? 42 : 48}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(value.toString(), x + cellSize / 2, y + cellSize / 2);
      }
    }
  }
  
  // Draw title
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 96px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('2048', width / 2, boardY - 150);
  
  // Draw subtitle
  ctx.font = '48px Arial';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.fillText('Join the tiles', width / 2, boardY + boardHeight + 100);
  ctx.fillText('get to 2048!', width / 2, boardY + boardHeight + 160);
});

console.log('\n🎨 All images created successfully!');
console.log('📁 Images saved to: public/');
console.log('\nNext steps:');
console.log('1. Review the images');
console.log('2. Commit and push to GitHub');
console.log('3. Vercel will auto-deploy the new images');

