@echo off
setlocal EnableExtensions
cd /d "%~dp0"
title Tere Verde Online - modo com janelas
echo ======================================================
echo   Tere Verde Online - modo com janelas (diagnostico)
echo   Duas janelas vao abrir: Back-End e Front-End.
echo   Se aparecer algum erro, ele sera mostrado nelas.
echo   Para encerrar, feche as duas janelas.
echo ======================================================
echo.

start "Tere Verde - Back-End" cmd /k ""%~dp0scripts\iniciar-backend.cmd" console"
start "Tere Verde - Front-End" cmd /k ""%~dp0scripts\iniciar-frontend.cmd" console"

where curl >nul 2>&1
if errorlevel 1 goto :espera_fixa

echo Aguardando o site ficar pronto...
set /a N=0
:espera
curl -s -o nul --max-time 2 http://127.0.0.1:5173/
if not errorlevel 1 goto :abrir
set /a N+=1
if %N% GEQ 120 goto :abrir
timeout /t 2 /nobreak >nul
goto :espera

:espera_fixa
echo Aguardando 20 segundos...
timeout /t 20 /nobreak >nul

:abrir
start "" "http://127.0.0.1:5173/"
echo.
echo Pronto. Voce ja pode fechar esta janela.
timeout /t 5 >nul
