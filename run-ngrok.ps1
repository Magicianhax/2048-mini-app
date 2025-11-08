# Ngrok Helper Script - Keeps window open
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Starting ngrok tunnel..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if ngrok is authenticated
$ngrokConfig = "$env:USERPROFILE\.ngrok2\ngrok.yml"
if (-not (Test-Path $ngrokConfig)) {
    Write-Host "⚠️  Ngrok needs authentication!" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Steps to authenticate:" -ForegroundColor Cyan
    Write-Host "1. Sign up at: https://dashboard.ngrok.com (free)" -ForegroundColor White
    Write-Host "2. Get your authtoken from: https://dashboard.ngrok.com/get-started/your-authtoken" -ForegroundColor White
    Write-Host "3. Run this command:" -ForegroundColor White
    Write-Host "   ngrok config add-authtoken YOUR_TOKEN_HERE" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Press any key to continue anyway (or Ctrl+C to exit)..." -ForegroundColor Gray
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    Write-Host ""
}

Write-Host "Starting ngrok... (This window will stay open)" -ForegroundColor Green
Write-Host "Press Ctrl+C to stop ngrok" -ForegroundColor Gray
Write-Host ""

# Run ngrok - this will keep the window open
ngrok http 3000

# Keep window open after ngrok stops
Write-Host ""
Write-Host "Ngrok stopped. Press any key to close..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

