#! /bin/bash

# get current path
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# change cwd
cd "$DIR"
cd v1

# run
export NODE_OPTIONS=--openssl-legacy-provider 
npm run build

# keep terminal alive: send shell to prevent exit after run
$SHELL

# send exit that closes the window if set in terminal-prefs > shell
exit
