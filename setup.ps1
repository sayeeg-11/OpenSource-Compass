<#
.SYNOPSIS
Sets up the OpenSource Compass environment locally.
#>
$ErrorActionPreference = "Continue"

Write-Host ""
Write-Host "    ____  _____   ______                               " -ForegroundColor Cyan
Write-Host "   / __ \/ ___/  / ____/___  ____ ___  ____  ____  __________" -ForegroundColor Cyan
Write-Host "  / / / /\__ \  / /   / __ \/ __ ``__ \/ __ \/ __ \/ ___/ ___/" -ForegroundColor Cyan
Write-Host " / /_/ /___/ / / /___/ /_/ / / / / / / /_/ / /_/ (__  )__  ) " -ForegroundColor Cyan
Write-Host " \____//____/  \____/\____/_/ /_/ /_/ .___/\__,_/____/____/  " -ForegroundColor Cyan
Write-Host "                                   /_/                       " -ForegroundColor Cyan
Write-Host ""
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "*              Setup Environment                       *" -ForegroundColor Yellow
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host ""

# Step 1
Write-Host "[1/3] > " -NoNewline -ForegroundColor Magenta
Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
Push-Location backend
$null = npm install *>&1
Write-Host "        - Dependencies installed magically." -ForegroundColor Magenta
Write-Host ""

# Step 2
Write-Host "[2/3] > " -NoNewline -ForegroundColor Cyan
Write-Host "Setting up environment variables..." -ForegroundColor Green
if (-not (Test-Path ".env")) {
    Copy-Item ".env.example" ".env"
    Write-Host "        - Created .env file from .env.example." -ForegroundColor Cyan
} else {
    Write-Host "        - .env file already exists." -ForegroundColor Gray
}
Write-Host ""

# Check for GEMINI_API_KEY
$envContent = Get-Content ".env" -Raw
if ($envContent -notmatch '(?m)^GEMINI_API_KEY=[ \t]*\S') {
    Write-Host "                          _._     " -ForegroundColor Yellow
    Write-Host "                         /   \    " -ForegroundColor Yellow
    Write-Host "                        /  !  \   " -ForegroundColor Yellow
    Write-Host "                       /_______\  " -ForegroundColor Yellow
    Write-Host ""
    Write-Host "========================================================" -ForegroundColor Yellow
    Write-Host "!                  MISSING API KEY                     !" -ForegroundColor Red
    Write-Host "========================================================" -ForegroundColor Yellow
    Write-Host " - " -NoNewline
    Write-Host "GEMINI_API_KEY" -NoNewline -ForegroundColor Red
    Write-Host " is missing or empty in " -NoNewline
    Write-Host "backend/.env" -ForegroundColor Magenta
    Write-Host " - AI features like " -NoNewline
    Write-Host "`"PR Generator`"" -NoNewline -ForegroundColor Cyan
    Write-Host " and " -NoNewline
    Write-Host "`"Issue Validator`"" -ForegroundColor Cyan
    Write-Host "   will sleep until the key is provided!" -ForegroundColor White
    Write-Host " - Please add your API key to " -NoNewline
    Write-Host "backend/.env" -NoNewline -ForegroundColor Magenta
    Write-Host " to wake them up."
    Write-Host "========================================================" -ForegroundColor Yellow
    Write-Host ""
    Read-Host "Press Enter to continue..." | Out-Null
} else {
    Write-Host "  [+] GEMINI_API_KEY found, AI powers engaged!" -ForegroundColor Green
}
Pop-Location
Write-Host ""

# Step 3
Write-Host "[3/3] > " -NoNewline -ForegroundColor Green
Write-Host "Ignition... Starting backend and frontend..." -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Magenta
Write-Host "🚀 The web app will blast off in your browser shortly!" -ForegroundColor Yellow
Write-Host "========================================================" -ForegroundColor Magenta
npx -y concurrently "cd backend && npm start" "npx -y live-server --port=5500"
