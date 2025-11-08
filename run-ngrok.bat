@echo off
echo ========================================
echo NGROK TUNNEL - This window will stay open
echo ========================================
echo.
echo Starting ngrok tunnel on port 3000...
echo.
echo IMPORTANT: Look for the HTTPS URL below
echo Example: https://abc123.ngrok-free.app
echo.
echo Press Ctrl+C to stop ngrok
echo.
echo ========================================
echo.

ngrok http 3000

echo.
echo ========================================
echo Ngrok stopped.
echo ========================================
pause

