@echo off
setlocal EnableExtensions
rem ======================================================================
rem  Inicia o Front-End (site) do Tere Verde.
rem  Chamado por ABRIR_TERE_VERDE.vbs. Uso manual:
rem     iniciar-frontend.cmd            grava tudo em logs\frontend.log
rem     iniciar-frontend.cmd console    mostra tudo nesta janela
rem ======================================================================

for %%I in ("%~dp0..") do set "ROOT=%%~fI"
set "APP=%ROOT%\frontend"
set "LOGDIR=%ROOT%\logs"
set "LOG=%LOGDIR%\frontend.log"
set "ERRFLAG=%LOGDIR%\frontend.error"
set "NO_COLOR=1"
set "FORCE_COLOR=0"

if not exist "%LOGDIR%" mkdir "%LOGDIR%"
if exist "%ERRFLAG%" del /q "%ERRFLAG%" >nul 2>&1

if /i "%~1"=="console" goto :main
type nul > "%LOG%"
call :main >> "%LOG%" 2>&1
exit /b %errorlevel%

:main
echo ===== %date% %time% - Iniciando Front-End =====
echo Pasta: "%APP%"
cd /d "%APP%"
if errorlevel 1 goto :falha_pasta
where node >nul 2>&1
if errorlevel 1 goto :falha_node

rem Dependencias ausentes ou quebradas? (rollup e esbuild trazem binarios nativos)
if not exist "node_modules\vite\package.json" goto :instalar
node -e "require('rollup'); require('esbuild').transformSync('1',{})" >nul 2>&1
if errorlevel 1 goto :reinstalar
goto :iniciar

:reinstalar
echo [AVISO] Os binarios do Vite nao funcionam nesta maquina. Reinstalando as dependencias...
if exist "node_modules" rmdir /s /q "node_modules"

:instalar
echo Instalando dependencias do Front-End. Na primeira vez isso pode levar alguns minutos...
call npm install --no-audit --no-fund
if errorlevel 1 goto :falha_npm

:iniciar
echo Iniciando o Vite...
call npm run dev
echo [AVISO] O Front-End foi encerrado, codigo %errorlevel%.
goto :falha

:falha_pasta
echo [ERRO] Pasta do Front-End nao encontrada: "%APP%"
goto :falha

:falha_node
echo [ERRO] Node.js nao encontrado. Instale a versao LTS em https://nodejs.org e tente de novo.
goto :falha

:falha_npm
echo [ERRO] O comando npm install falhou. Verifique a conexao com a internet e tente de novo.
goto :falha

:falha
echo FALHOU> "%ERRFLAG%"
exit /b 1
