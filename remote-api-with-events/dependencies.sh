#!/usr/bin/env bash

BASEDIR=$(dirname "$0")

echo ""
echo "(*) Compiling remote-example-api"
cd "${BASEDIR}/remote-example-api"
yarn install
yarn pack --prod

echo ""
echo "(*) Compiling and installing Helper Extension"
cd ../helper-extension
yarn install
vsce package
if [ "$(uname)" == "Darwin" ]; then
    "/Applications/Visual Studio Code.app/Contents/Resources/app/bin/code" --install-extension ./api-with-events-helper-0.0.1.vsix
else
    code --install-extension ./api-with-events-helper-0.0.1.vsix
fi

echo ""
echo "(*) Installing Example Extension dependencies"
cd ../example-extension
yarn install

echo ""
echo "(*) PLEASE RESTART VISUAL STUDIO CODE."
echo ""


