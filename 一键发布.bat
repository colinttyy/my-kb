@echo off
setlocal
chcp 65001 >nul 2>nul
title Knowledge Base - Publish
cd /d "%~dp0"

echo.
echo  ==========================================
echo   Publish to GitHub (Vercel auto-deploys)
echo  ==========================================
echo.

git rev-parse --is-inside-work-tree >nul 2>nul
if errorlevel 1 goto nogit

set "MSG=%~1"
if "%MSG%"=="" set /p "MSG=Update message (press Enter for default): "
if "%MSG%"=="" set "MSG=update content"

echo.
echo  [1/3] staging changes...
git add .
if errorlevel 1 goto fail

echo  [2/3] committing...
git commit -m "%MSG%"

echo  [3/3] pushing to GitHub...
git push
if errorlevel 1 goto fail

echo.
echo  ==========================================
echo   Pushed. Vercel rebuilds in about 1 minute.
echo   Open your site and press Ctrl+F5 to refresh.
echo  ==========================================
echo.
pause
exit /b 0

:nogit
echo  [ERROR] This folder is not a Git repository yet.
echo.
echo  Do step 4 of the setup manual first (git init + git remote add),
echo  then use this script for every update.
echo.
pause
exit /b 1

:fail
echo.
echo  [FAILED] Copy the error above and ask for help.
echo.
pause
exit /b 1