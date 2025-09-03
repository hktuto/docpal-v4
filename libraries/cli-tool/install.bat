@echo off
REM DocPal CLI Tool Installation Script for Windows
REM This script installs the CLI tool globally

echo 🚀 Installing DocPal CLI Tool...

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    pause
    exit /b 1
)

REM Check if pnpm is installed
where pnpm >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ pnpm is not installed. Please install pnpm first.
    pause
    exit /b 1
)

REM Get the directory where this script is located
set "SCRIPT_DIR=%~dp0"

REM Navigate to the CLI tool directory
cd /d "%SCRIPT_DIR%"

echo 📦 Installing dependencies...
pnpm install

echo 🔨 Building the CLI tool...
pnpm build

echo 🔗 Linking globally...
pnpm link --global

echo ✅ DocPal CLI Tool installed successfully!
echo.
echo Usage:
echo   docpal package my-feature     # Generate a new package
echo   docpal page my-page          # Generate a new page
echo   docpal --help                # Show help
echo.
echo You can now use 'docpal' command from anywhere!
pause
