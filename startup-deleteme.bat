@echo off
cd /d %~dp0
call npm i
call npm run build
call npm start -- --port 3004
pause