@echo off
echo Starting ngrok tunnel for port 3000...
echo.
echo Your ngrok URL will appear below. Copy the HTTPS URL (starts with https://)
echo.
echo Press Ctrl+C to stop ngrok
echo.
ngrok http 3000

