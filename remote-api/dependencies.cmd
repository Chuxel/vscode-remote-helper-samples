@ECHO OFF
SETLOCAL

SET CURDIR="%CD%"

echo.
echo (*) Compiling remote-example-api
cd "%~dp0\remote-example-api"
CALL yarn install
CALL yarn pack

echo.
echo (*) Compiling and installing Helper Extension
cd ..\helper-extension
CALL yarn install
CALL vsce package 
CALL code-insiders --install-extension api-helper-0.0.1.vsix

echo (*) Installing Example Extension dependencies
cd ..\example-extension
CALL yarn install

cd "%CURDIR%"

echo.
echo (*) PLEASE RESTART VISUAL STUDIO CODE.
echo.
