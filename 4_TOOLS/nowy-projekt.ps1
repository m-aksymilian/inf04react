# Creates the exam folder structure and a ready React project (works OFFLINE).
#   4_TOOLS\nowy-projekt.bat 12345678901
#   4_TOOLS\nowy-projekt.bat 12345678901 -Web web -Konsola konsola -Dokumentacja testy -Cel D:\
# Result (default names = 2025/2026 sheets; CHECK THE SHEET and pass the right ones):
#   <Cel>\<numer>\konsolowa\
#   <Cel>\<numer>\webowa\egzamin\   <- Vite + React + Bootstrap, node_modules already inside
#   <Cel>\<numer>\dokumentacja\egzamin.txt
param(
    [Parameter(Mandatory = $true)][string]$Numer,
    [string]$Konsola = 'konsolowa',
    [string]$Web = 'webowa',
    [string]$Dokumentacja = 'dokumentacja',
    [string]$Cel = [Environment]::GetFolderPath('Desktop'),
    [string]$Projekt = 'egzamin'
)
$ErrorActionPreference = 'Stop'
$repo = Split-Path -Parent $PSScriptRoot
$baza = Join-Path $Cel $Numer
$projektDir = Join-Path (Join-Path $baza $Web) $Projekt

if (Test-Path $projektDir) {
    Write-Host "Folder $projektDir already exists - nothing changed." -ForegroundColor Yellow
    exit 1
}

foreach ($f in @($Konsola, $Web, $Dokumentacja)) {
    New-Item -ItemType Directory -Force (Join-Path $baza $f) | Out-Null
}

# project files
Copy-Item -Recurse (Join-Path $repo '3_EXAM_TEMPLATE\egzamin') $projektDir

# VS Code snippets (form03, state04, ...) work only inside the opened folder -> copy them in
$snip = Join-Path $repo '.vscode\inf04_react.code-snippets'
if (Test-Path $snip) {
    New-Item -ItemType Directory -Force (Join-Path $projektDir '.vscode') | Out-Null
    Copy-Item $snip (Join-Path $projektDir '.vscode')
}

# node_modules from the toolbox (same versions) -> no npm install / no internet needed
$nm = Join-Path $repo 'node_modules'
if (Test-Path $nm) {
    Write-Host 'Copying node_modules (offline install)...'
    robocopy $nm (Join-Path $projektDir 'node_modules') /E /XD .vite .vite-temp /NFL /NDL /NJH /NJS /NP | Out-Null
    if ($LASTEXITCODE -ge 8) { throw "robocopy failed ($LASTEXITCODE)" }
} else {
    Write-Host 'No node_modules in the toolbox - run "npm install" in the project.' -ForegroundColor Yellow
}

# egzamin document skeleton (2026 = plain text file; 2022-2025 = office document with screenshots)
$doc = Join-Path (Join-Path $baza $Dokumentacja) 'egzamin.txt'
if (-not (Test-Path $doc)) {
    @(
        'System operacyjny: Windows 11',
        'Środowiska programistyczne: Visual Studio Code, <IDE konsola>',
        'Języki programowania: JavaScript (React), C++',
        'Biblioteki / frameworki: React, Bootstrap, Vite'
    ) | Set-Content $doc -Encoding utf8
}

Write-Host ''
Write-Host "Ready: $baza" -ForegroundColor Green
Write-Host "  cd `"$projektDir`""
Write-Host '  npm run dev          (if PowerShell blocks npm: npm.cmd run dev)'
Write-Host "  code `"$projektDir`""
