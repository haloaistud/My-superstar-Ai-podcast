#!/bin/bash

# This script initializes a git repository, commits the code,
# sets up the remote origin, and pushes the main branch to GitHub.

# Make sure you have the correct repository URL.
REPO_URL="https://github.com/haloaistud/My-superstar-Ai-podcast.git"
COMMIT_MESSAGE="Exported from IDX"

# Exit immediately if a command exits with a non-zero status.
set -e

echo "Initializing Git repository..."
# Check if .git directory exists to avoid re-initializing
if [ ! -d ".git" ]; then
  git init
else
  echo "Git repository already initialized."
fi


echo "Adding all files to staging..."
git add .

echo "Committing changes..."
# Only commit if there are changes to be committed
if git diff-index --quiet HEAD --; then
  echo "No changes to commit."
else
  git commit -m "$COMMIT_MESSAGE"
fi

echo "Adding remote origin..."
# Check if remote 'origin' already exists
if git remote | grep -q 'origin'; then
  echo "Remote 'origin' already exists. Setting URL..."
  git remote set-url origin "$REPO_URL"
else
  git remote add origin "$REPO_URL"
fi


echo "Pushing to GitHub..."
git push -u origin main

echo "Successfully synced with GitHub!"
