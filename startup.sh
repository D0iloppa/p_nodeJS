#!/bin/bash

# Set environment variables if needed
export NODE_ENV=production

# Check if the process is already running
if ps aux | grep "node dist/server.js" | grep -v grep > /dev/null
then
  pid=$(ps aux | grep "node dist/server.js" | grep -v grep | awk '{print $2}')
  echo "Process is already running with PID $pid"
  exit 0
else
  echo "No server process found. Let's start the server"
fi

# Start the Node.js app with nohup
#nohup babel-node src/server.js > app.log 2>&1 &
nohup npm start > app.log 2>&1 &

# Display a message indicating the app has started
pid=$!
echo "App started with PID $pid"