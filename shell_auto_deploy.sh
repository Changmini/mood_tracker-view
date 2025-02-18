#!/bin/bash

##### PROCESS KILL
processes=$(ps -ef | grep java | grep -v grep)
if [ -z "$processes" ]; then
    echo "Java process is not running"
else
    echo "$processes" | while read -r line; do
        pid=$(echo "$line" | awk '{print $2}')
        echo "Java process PID $pid shutdown..."
        kill -15 "$pid"
    done
    echo "Java process terminated"
fi

if ! command -v git &> /dev/null; then
    echo "git command is not installed.. please install git"
    exit 1
fi



##### GIT - VIEW
echo "frontend processing"
cd
cd mood_tracker-view
if [ ! -d ".git" ]; then
    echo "frontend-file does not have a .git repository"
    exit 1
fi
echo "running 'git reset --hard'"
git reset --hard
echo "running 'git pull'"
git pull

FILENAME="src/common.js"
sed -i "s|^const API_HOST = \"localhost\"; *|//const API API_HOST = \"localhost\";|" "$FILENAME"
sed -i "s|^//const API_HOST = \"3.38.99.65\"; *|const API API_HOST = \"3.38.99.65\";|" "$FILENAME"
echo "API Origin modification completed"

### NPM BUILD....
echo "npm run build...."
npm run build



echo "success"