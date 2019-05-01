#!/usr/bin/env bash

BASEDIR=$(dirname "$0")

echo ""
echo "(*) Compiling and installing Helper Extension"
cd "${BASEDIR}/helper-extension"
yarn install
vsce package 
if [ "$(uname)" == "Darwin" ]; then 
    "/Applications/Visual Studio Code - Insiders.app/Contents/Resources/app/bin/code" --install-extension ./helper-extension-0.0.1.vsix
else
    code-insiders --install-extension ./helper-extension-0.0.1.vsix
fi

echo ""
echo "(*) Installing Main Extension dependencies"
cd ../main-extension
yarn install

echo ""
echo "(*) PLEASE RESTART VISUAL STUDIO CODE."
echo ""
