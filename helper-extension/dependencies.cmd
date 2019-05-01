@ECHO OFF
SETLOCAL

SET CURDIR="%CD%"

echo.
echo (*) Compiling and installing helper extension
cd "%~dp0\helper-extension"
CALL yarn install
CALL vsce package 
CALL code-insiders --install-extension helper-extension-0.0.1.vsix

echo.
echo (*) Installing Main Extension dependencies
cd ..\main-extension
CALL yarn install

cd "%CURDIR%"

echo.
echo (*) PLEASE RESTART VISUAL STUDIO CODE.
echo.
