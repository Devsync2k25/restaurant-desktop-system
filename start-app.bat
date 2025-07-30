@echo off
echo Starting Restaurant Desktop System...
echo.
echo Step 1: Starting development server...
cd frontend
start "Dev Server" cmd /k "npm run dev"
echo.
echo Step 2: Waiting for server to start...
timeout /t 5 /nobreak > nul
echo.
echo Step 3: Starting Electron app...
start "Electron App" cmd /k "npm run electron"
echo.
echo Restaurant Desktop System is starting!
echo Dev server: http://localhost:5173
echo Electron app should open automatically.
echo.
pause 