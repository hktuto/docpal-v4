#!/bin/bash

# DocPal CLI Tool Installation Script
# This script installs the CLI tool globally

set -e

echo "🚀 Installing DocPal CLI Tool..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "❌ pnpm is not installed. Please install pnpm first."
    exit 1
fi

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Navigate to the CLI tool directory
cd "$SCRIPT_DIR"

echo "📦 Installing dependencies..."
pnpm install

echo "🔨 Building the CLI tool..."
pnpm build

echo "🔗 Linking globally..."
pnpm link --global

echo "✅ DocPal CLI Tool installed successfully!"
echo ""
echo "Usage:"
echo "  docpal package my-feature     # Generate a new package"
echo "  docpal page my-page          # Generate a new page"
echo "  docpal --help                # Show help"
echo ""
echo "You can now use 'docpal' command from anywhere!"
