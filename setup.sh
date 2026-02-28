#!/bin/bash

# ANSI Color Codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
CYAN='\033[0;36m'
MAGENTA='\033[0;35m'
RESET='\033[0m'

echo ""
echo -e "${CYAN}    ____  _____   ______                               ${RESET}"
echo -e "${CYAN}   / __ \/ ___/  / ____/___  ____ ___  ____  ____  __________${RESET}"
echo -e "${CYAN}  / / / /\__ \  / /   / __ \/ __ \`__ \/ __ \/ __ \/ ___/ ___/${RESET}"
echo -e "${CYAN} / /_/ /___/ / / /___/ /_/ / / / / / / /_/ / /_/ (__  )__  ) ${RESET}"
echo -e "${CYAN} \____//____/  \____/\____/_/ /_/ /_/ .___/\__,_/____/____/  ${RESET}"
echo -e "${CYAN}                                   /_/                       ${RESET}"
echo ""
echo -e "${CYAN}========================================================${RESET}"
echo -e "${YELLOW}*              Setup Environment                       *${RESET}"
echo -e "${CYAN}========================================================${RESET}"
echo ""

echo -e "${MAGENTA}[1/3] >${RESET} ${YELLOW}Installing backend dependencies...${RESET}"
cd backend || exit
npm install >/dev/null 2>&1
echo -e "        - ${MAGENTA}Dependencies installed magically.${RESET}"
echo ""

echo -e "${CYAN}[2/3] >${RESET} ${GREEN}Setting up environment variables...${RESET}"
if [ ! -f .env ]; then
    cp .env.example .env
    echo -e "        - ${CYAN}Created .env file from .env.example.${RESET}"
else
    echo -e "        - ${YELLOW}.env file already exists.${RESET}"
fi
echo ""

if ! grep -q "^GEMINI_API_KEY=." .env; then
    echo -e "${YELLOW}                          _._     ${RESET}"
    echo -e "${YELLOW}                         /   \    ${RESET}"
    echo -e "${YELLOW}                        /  !  \   ${RESET}"
    echo -e "${YELLOW}                       /_______\  ${RESET}"
    echo ""
    echo -e "${YELLOW}========================================================${RESET}"
    echo -e "${RED}!                  MISSING API KEY                     !${RESET}"
    echo -e "${YELLOW}========================================================${RESET}"
    echo -e " - ${RED}GEMINI_API_KEY${RESET} is missing or empty in ${MAGENTA}backend/.env${RESET}"
    echo -e " - AI features like ${CYAN}\"PR Generator\"${RESET} and ${CYAN}\"Issue Validator\"${RESET}"
    echo -e "   will sleep until the key is provided!"
    echo -e " - Please add your API key to ${MAGENTA}backend/.env${RESET} to wake them up."
    echo -e "${YELLOW}========================================================${RESET}"
    echo ""
    read -p "Press Enter to continue..."
else
    echo -e "  ${GREEN}[+] GEMINI_API_KEY found, AI powers engaged!${RESET}"
fi

cd ..
echo -e "${GREEN}[3/3] >${RESET} ${CYAN}Ignition... Starting backend and frontend...${RESET}"
echo -e "${MAGENTA}========================================================${RESET}"
echo -e "${YELLOW}🚀 The web app will blast off in your browser shortly!${RESET}"
echo -e "${MAGENTA}========================================================${RESET}"
npx -y concurrently "cd backend && npm start" "npx -y live-server --port=5500"
