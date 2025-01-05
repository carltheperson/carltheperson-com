#!/bin/bash

run_go_app() {
    pkill -f "go run ." 2>/dev/null
    go run . &
}

run_static_server() {
    pkill -f "live-server" 2>/dev/null
    live-server build --watch &
}

if [ ! -d "content" ]; then
    echo "Error: content/ directory does not exist."
    exit 1
fi

if [ ! -d "build" ]; then
    mkdir build
    echo "Created missing build/ directory."
fi

go run .
run_static_server

echo "Watching content/ for changes..."
inotifywait -m -r -e create,close_write,delete content | while read changed_file; do
    echo "Detected change in $changed_file, restarting Go app..."
    run_go_app
done
