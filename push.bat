@echo off
title Git Push Script

echo ============================
echo   GIT AUTO PUSH
echo ============================

set /p msg=Scrie mesajul commit: 

git add .
git commit -m "%msg%"
git push

echo.
echo ===== DONE =====
pause