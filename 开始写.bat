@echo off
setlocal
chcp 65001 >nul 2>nul
title Knowledge Base - Local Preview
cd /d "%~dp0"

echo.
echo  ==========================================
echo   Personal Knowledge Base - local preview
echo  ==========================================
echo.

where node >nul 2>nul
if errorlevel 1 goto nonode

where pnpm >nul 2>nul
if errorlevel 1 goto nopnpm

if not exist "node_modules" (
  echo  First run: installing dependencies, 1-3 minutes...
  echo.
  call pnpm install
  echo.
)

echo  Starting preview...
echo  Your browser will open http://localhost:4321
echo.
echo  - Edit any .md file, save, page refreshes automatically.
echo  - Stop: press Ctrl+C, or just close this window.
echo  - Publish online: double-click 一键发布.bat
echo.

start "" http://localhost:4321
call pnpm dev
echo.
echo  Preview stopped.
pause
exit /b 0

:nonode
echo  [ERROR] Node.js was not found in PATH.
echo.
echo  Fix: install Node.js LTS from https://nodejs.org/zh-cn
echo       then close this window and double-click this file again.
echo.
pause
exit /b 1

:nopnpm
echo  [ERROR] pnpm was not found in PATH.
echo.
echo  Fix: open PowerShell and run:  npm install -g pnpm
echo       then close this window and double-click this file again.
echo.
echo  If PowerShell says script execution is disabled, run once:
echo     Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
echo.
pause
exit /b 1