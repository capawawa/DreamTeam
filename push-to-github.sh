#!/bin/bash
# Push DreamTeam to GitHub
# 
# FIRST: Create the repository on GitHub
# Go to: https://github.com/new
# Repository name: DreamTeam
# Don't initialize with README
# Click "Create repository"
#
# THEN: Run this script

echo "Pushing DreamTeam to GitHub..."
cd /home/skate/DreamTeam

# Rename branch to main
git branch -M main

# Add remote (if not already added)
if ! git remote get-url origin &> /dev/null; then
    git remote add origin https://github.com/capawawa/DreamTeam.git
    echo "✓ Added remote origin"
else
    echo "✓ Remote origin already exists"
fi

# Push to GitHub
echo "Pushing to GitHub..."
git push -u origin main

echo ""
echo "🎉 Done! Your repository is now at:"
echo "https://github.com/capawawa/DreamTeam"
