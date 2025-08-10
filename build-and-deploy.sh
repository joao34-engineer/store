#!/bin/bash

# Build the frontend for production
echo "Building frontend for production..."
cd banffStore/frontend
npm run build

echo "✅ Frontend built successfully!"
echo "📦 Built files are in banffStore/frontend/dist/"
echo ""
echo "🚀 Next steps:"
echo "1. Create a GitHub repository"
echo "2. Push this code to GitHub"
echo "3. Enable GitHub Pages in repository settings"
echo "4. Your site will be available at: https://YOUR_USERNAME.github.io/REPO_NAME/"
