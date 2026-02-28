@echo off
color 0B
echo.
echo     ____  _____   ______                               
echo    / __ \/ ___/  / ____/___  ____ ___  ____  ____  __________
echo   / / / /\__ \  / /   / __ \/ __ `__ \/ __ \/ __ \/ ___/ ___/
echo  / /_/ /___/ / / /___/ /_/ / / / / / / /_/ / /_/ (__  )__  )
echo  \____//____/  \____/\____/_/ /_/ /_/ .___/\__,_/____/____/ 
echo                                    /_/                      
echo.
echo   ========================================================
echo   *              Setup Environment                       *
echo   ========================================================
echo.

color 0D
echo   [1/3] ^> Installing backend dependencies...
cd backend
call npm install >nul 2>&1
echo         - Dependencies installed magically.
echo.

color 0B
echo   [2/3] ^> Setting up environment variables...
if not exist .env (
    copy .env.example .env >nul
    echo         - Created .env file from .env.example.
) else (
    echo         - .env file already exists.
)
echo.

findstr /R "^GEMINI_API_KEY=" .env | findstr /V "^GEMINI_API_KEY=$" >nul
if %errorlevel% neq 0 (
    color 0E
    echo                          _._     
    echo                         /   \    
    echo                        /  !  \   
    echo                       /_______\  
    echo.
    echo   ========================================================
    echo   !                 MISSING API KEY                      !
    echo   ========================================================
    echo   - GEMINI_API_KEY is missing or empty in backend/.env
    echo   - AI features like "PR Generator" and "Issue Validator"
    echo            will sleep until the key is provided!
    echo   - Please add your API key to backend/.env to wake them up.
    echo   ========================================================
    echo.
    pause
    color 0B
) else (
    echo   [+] GEMINI_API_KEY found, AI powers engaged!
)

cd ..
color 0A
echo   [3/3] ^> Ignition... Starting backend and frontend...
echo   ========================================================
echo   🚀 The web app will blast off in your browser shortly!
echo   ========================================================
call npx -y concurrently "cd backend && npm start" "npx -y live-server --port=5500"
