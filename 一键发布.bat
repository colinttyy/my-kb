@echo off
setlocal
chcp 65001 >nul 2>nul
title Knowledge Base - Publish
cd /d "%~dp0"

echo.
echo  ==========================================
echo   Publish  (GitHub push)
echo  ==========================================
echo.

git rev-parse --is-inside-work-tree >nul 2>nul
if errorlevel 1 goto nogit

set "MSG=%~1"
if "%MSG%"=="" set /p "MSG=Update message (press Enter for default): "
if "%MSG%"=="" set "MSG=update content"

echo.
echo  [1/4] staging changes...
git add .
if errorlevel 1 goto fail

echo  [2/4] committing...
git commit -m "%MSG%"

echo  [3/4] pushing to origin (my-kb)...
git push origin main
if errorlevel 1 goto fail

git remote | findstr /x /c:"pages" >nul
if not errorlevel 1 (
  echo  [4/4] pushing to pages (colinttyy.github.io)...
  git push pages main
  if errorlevel 1 goto fail
) else (
  echo  [4/4] no "pages" remote configured, skipped.
  echo.
  echo  To publish your live site, add it once:
  echo    git remote add pages https://github.com/colinttyy/colinttyy.github.io.git
)

echo.
echo  ==========================================
echo   Done. GitHub Pages rebuilds in 1-2 minutes.
echo   Open https://colinttyy.github.io and press Ctrl+F5
echo  ==========================================
echo.
pause
exit /b 0

:nogit
echo  [ERROR] This folder is not a Git repository.
echo.
pause
exit /b 1

:fail
echo.
echo  [FAILED] Copy the error above and ask for help.
echo.
pause
exit /b 1