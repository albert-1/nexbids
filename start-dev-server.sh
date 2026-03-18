#!/bin/bash

# NexBids Website - Quick Start Script
# Run this to start the development server

cd /Users/adam/WorkBuddy/20260313123451/nexbids-website

# Kill any existing servers
pkill -f "http.server" 2>/dev/null

# Start the development server
echo "🚀 Starting NexBids development server on http://localhost:8890/"
python3 -m http.server 8890

# Open in browser (macOS)
# open http://localhost:8890/
