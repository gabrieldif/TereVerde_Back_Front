@echo off
setlocal EnableExtensions
rem Encerra o Back-End (porta 3001) e o Front-End (porta 5173) do Tere Verde.
rem A busca pela porta nao depende do idioma do Windows (usa o endereco 0.0.0.0:0 do netstat).

for %%P in (3001 5173) do call :matar %%P
exit /b 0

:matar
for /f "tokens=5" %%I in ('netstat -ano ^| findstr /R /C:":%1  *0\.0\.0\.0:0" /C:":%1  *\[::\]:0"') do taskkill /PID %%I /T /F >nul 2>&1
exit /b 0
