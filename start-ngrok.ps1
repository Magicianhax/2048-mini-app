# Run ngrok and get the URL
Write-Host "Starting ngrok tunnel..." -ForegroundColor Cyan
Write-Host ""

# Start ngrok in background
$job = Start-Process -FilePath "ngrok" -ArgumentList "http","3000" -NoNewWindow -PassThru

# Wait for ngrok to start
Start-Sleep -Seconds 5

# Try to get the URL from ngrok API
try {
    $tunnels = Invoke-RestMethod -Uri "http://localhost:4040/api/tunnels" -ErrorAction Stop
    $httpsUrl = ($tunnels.tunnels | Where-Object { $_.proto -eq 'https' } | Select-Object -First 1).public_url
    
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "✅ NGROK IS RUNNING!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Your HTTPS URL:" -ForegroundColor Yellow
    Write-Host $httpsUrl -ForegroundColor Cyan -BackgroundColor Black
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "📋 Next steps:" -ForegroundColor Yellow
    Write-Host "1. Copy the URL above" -ForegroundColor White
    Write-Host "2. Open http://localhost:4040 in browser for ngrok dashboard" -ForegroundColor White
    Write-Host "3. Press Ctrl+C to stop ngrok when done" -ForegroundColor White
    Write-Host ""
    
    # Keep the script running
    Write-Host "Ngrok is running. Press Ctrl+C to stop..." -ForegroundColor Gray
    Wait-Process -Id $job.Id
} catch {
    Write-Host "⚠️  Could not get ngrok URL automatically." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Please:" -ForegroundColor Cyan
    Write-Host "1. Open http://localhost:4040 in your browser" -ForegroundColor White
    Write-Host "2. Copy the HTTPS URL from the ngrok dashboard" -ForegroundColor White
    Write-Host ""
    Write-Host "If ngrok asks for authentication:" -ForegroundColor Yellow
    Write-Host "• Sign up at https://dashboard.ngrok.com (free)" -ForegroundColor White
    Write-Host "• Run: ngrok config add-authtoken YOUR_TOKEN" -ForegroundColor White
    Write-Host ""
    
    # Keep ngrok running
    Wait-Process -Id $job.Id -ErrorAction SilentlyContinue
}

