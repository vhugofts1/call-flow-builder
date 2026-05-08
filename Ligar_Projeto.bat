@echo off
setlocal enabledelayedexpansion
title DelMatch - Inicializador de Projeto

echo.
echo ==========================================
echo    INICIALIZADOR ROBUSTO - DELMATCH
echo ==========================================
echo.

:: 1. Limpeza de processos travados
echo [1/3] Limpando processos antigos do Node...
taskkill /f /im node.exe >nul 2>&1

:: 2. Verificação de porta
echo [2/3] Liberando porta 8082...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :8082') do (
    taskkill /f /pid %%a >nul 2>&1
)

:: 3. Iniciar Servidor
echo [3/3] Iniciando servidor de desenvolvimento...
echo.
echo O projeto abrira em: http://localhost:8082/
echo Mantenha esta janela aberta enquanto estiver usando o sistema.
echo.

npm run dev
pause
