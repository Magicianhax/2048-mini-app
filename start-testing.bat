@echo off
echo ========================================
echo Farcaster 2048 Game - Testing Setup
echo ========================================
echo.
echo Step 1: Starting development server in new window...
echo.
start "Dev Server" cmd /k "cd /d %~dp0 && npm run dev"
timeout /t 8 /nobreak >nul
echo.
echo Step 2: Starting ngrok tunnel...
echo.
echo IMPORTANT: Copy the HTTPS URL shown below (starts with https://)
echo This is your public URL for testing in Farcaster
echo.
echo Example: https://abc123.ngrok.io
echo.
echo Press Ctrl+C in this window to stop ngrok
echo.
ngrok http 3000

