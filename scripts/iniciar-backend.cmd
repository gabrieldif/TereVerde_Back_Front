@echo off
setlocal EnableExtensions
rem ======================================================================
rem  Inicia o Back-End (API) do Tere Verde.
rem  Chamado por ABRIR_TERE_VERDE.vbs. Uso manual:
rem     iniciar-backend.cmd            grava tudo em logs\backend.log
rem     iniciar-backend.cmd console    mostra tudo nesta janela
rem ======================================================================

for %%I in ("%~dp0..") do set "ROOT=%%~fI"
set "APP=%ROOT%\backend"
set "LOGDIR=%ROOT%\logs"
set "LOG=%LOGDIR%\backend.log"
set "ERRFLAG=%LOGDIR%\backend.error"
set "NO_COLOR=1"
set "FORCE_COLOR=0"

if not exist "%LOGDIR%" mkdir "%LOGDIR%"
if exist "%ERRFLAG%" del /q "%ERRFLAG%" >nul 2>&1

if /i "%~1"=="console" goto :main
type nul > "%LOG%"
call :main >> "%LOG%" 2>&1
exit /b %errorlevel%

:main
echo ===== %date% %time% - Iniciando Back-End =====
echo Pasta: "%APP%"
cd /d "%APP%"
if errorlevel 1 goto :falha_pasta
where node >nul 2>&1
if errorlevel 1 goto :falha_node

rem Dependencias ausentes ou quebradas? (o modulo sqlite3 e nativo e depende da maquina)
if not exist "node_modules\express\package.json" goto :instalar
node -e "require('sqlite3')" >nul 2>&1
if errorlevel 1 goto :reinstalar
goto :iniciar

:reinstalar
echo [AVISO] O modulo sqlite3 nao carrega nesta maquina. Reinstalando as dependencias...
if exist "node_modules" rmdir /s /q "node_modules"

:instalar
echo Instalando dependencias do Back-End. Na primeira vez isso pode levar alguns minutos...
call npm install --no-audit --no-fund
if errorlevel 1 goto :falha_npm

:iniciar
node -e "require('sqlite3')" >nul 2>&1
if errorlevel 1 goto :falha_sqlite
echo Iniciando a API...
call npm start
echo [AVISO] O Back-End foi encerrado, codigo %errorlevel%.
goto :falha

:falha_pasta
echo [ERRO] Pasta do Back-End nao encontrada: "%APP%"
goto :falha

:falha_node
echo [ERRO] Node.js nao encontrado. Instale a versao LTS em https://nodejs.org e tente de novo.
goto :falha

:falha_npm
echo [ERRO] O comando npm install falhou. Verifique a conexao com a internet e tente de novo.
goto :falha

:falha_sqlite
echo [ERRO] O modulo sqlite3 nao carregou, mesmo apos reinstalar. Detalhes:
node -e "require('sqlite3')"
echo Dica: instale o "Microsoft Visual C++ Redistributable" (x64) e tente de novo.
goto :falha

:falha
echo FALHOU> "%ERRFLAG%"
exit /b 1
