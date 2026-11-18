# Zips the React project WITHOUT node_modules and copies the modified source files next to the zip.
#   4_TOOLS\spakuj.bat C:\Users\...\Desktop\12345678901\webowa
#   4_TOOLS\spakuj.bat <web folder> -Zip web.zip -Projekt egzamin -UsunProjekt
# Result in <web folder>:
#   web.zip   (the whole project folder, no node_modules / dist / .vite / .vscode; .git IS kept - some sheets require a repo)
#   App.jsx, App.css, ... (every file from src\ + index.html that differs from the template)
# -UsunProjekt deletes the project folder afterwards (the sheets say: leave only the archive and the
# modified files). Do it LAST, after the screenshots, and check the zip opens first.
param(
    [Parameter(Mandatory = $true)][string]$WebFolder,
    [string]$Zip = 'web.zip',
    [string]$Projekt = 'egzamin',
    [switch]$UsunProjekt
)
$ErrorActionPreference = 'Stop'
$repo = Split-Path -Parent $PSScriptRoot
$WebFolder = (Get-Item $WebFolder).FullName   # long path (no MAKSYM~1 short names)
$projektDir = Join-Path $WebFolder $Projekt
if (-not (Test-Path (Join-Path $projektDir 'package.json'))) {
    throw "No project in $projektDir (use -Projekt <name> if the folder is named differently)"
}

# 1) stage a copy without heavy folders, then zip the staged folder (keeps the top folder name)
$staging = Join-Path $env:TEMP ('spakuj_' + [guid]::NewGuid().ToString('N'))
$stagedProject = Join-Path $staging $Projekt
robocopy $projektDir $stagedProject /E /XD node_modules dist .vite .vscode /NFL /NDL /NJH /NJS /NP | Out-Null
if ($LASTEXITCODE -ge 8) { throw "robocopy failed ($LASTEXITCODE)" }
$zipPath = Join-Path $WebFolder $Zip
if (Test-Path $zipPath) { Remove-Item $zipPath -Force }
# .NET zip instead of Compress-Archive: PS 5.1 Compress-Archive silently skips hidden files (.git)
Add-Type -AssemblyName System.IO.Compression.FileSystem
[IO.Compression.ZipFile]::CreateFromDirectory($stagedProject, $zipPath, [IO.Compression.CompressionLevel]::Optimal, $true)
$oczekiwane = @(Get-ChildItem -Recurse -File -Force $stagedProject).Count
Remove-Item -Recurse -Force $staging

# verify: the zip opens and holds every staged file + App.jsx
$archiwum = [IO.Compression.ZipFile]::OpenRead($zipPath)
$wpisy = @($archiwum.Entries | Where-Object { $_.Name -ne '' })
$archiwum.Dispose()
$maApp = @($wpisy | Where-Object { $_.FullName -match '[\\/]src[\\/]App\.jsx$' }).Count -eq 1
$zipOk = ($wpisy.Count -eq $oczekiwane) -and $maApp
if ($zipOk) {
    Write-Host "Zip OK: $zipPath ($($wpisy.Count) files, $([math]::Round((Get-Item $zipPath).Length / 1KB)) KB)" -ForegroundColor Green
} else {
    Write-Host "ZIP CHECK FAILED: $($wpisy.Count) of $oczekiwane files, src/App.jsx present: $maApp" -ForegroundColor Red
}

# 2) copy the modified source files out of the project (compared with the clean template)
$szablon = Join-Path $repo '3_EXAM_TEMPLATE\egzamin'
$pliki = @(Get-ChildItem -Recurse -File (Join-Path $projektDir 'src')) + @(Get-Item (Join-Path $projektDir 'index.html'))
foreach ($plik in $pliki) {
    $wzgledna = $plik.FullName.Substring((Get-Item $projektDir).FullName.Length + 1)
    $wzor = Join-Path $szablon $wzgledna
    $zmieniony = -not (Test-Path $wzor) -or ((Get-FileHash $wzor).Hash -ne (Get-FileHash $plik.FullName).Hash)
    if ($zmieniony -and $plik.Extension -in @('.jsx', '.js', '.css', '.html')) {
        Copy-Item $plik.FullName (Join-Path $WebFolder $plik.Name) -Force
        Write-Host "  copied out: $wzgledna"
    }
}

# 3) optional cleanup
if ($UsunProjekt) {
    $pelna = (Get-Item $projektDir).FullName
    $node = @(Get-CimInstance Win32_Process -Filter "Name = 'node.exe' OR Name = 'esbuild.exe'" -ErrorAction SilentlyContinue |
        Where-Object { $_.CommandLine -and $_.CommandLine.ToLower().Contains($pelna.ToLower()) })
    if (-not $zipOk) {
        Write-Host 'Project NOT deleted: the zip check failed. Fix it and run spakuj again.' -ForegroundColor Red
        exit 1
    }
    if ($node.Count -gt 0) {
        Write-Host 'Project NOT deleted: "npm run dev" is still running from it.' -ForegroundColor Red
        Write-Host 'Stop it first (Ctrl+C in its terminal, then answer T/Y), then run spakuj again.'
        exit 1
    }
    try {
        Remove-Item -Recurse -Force $projektDir -ErrorAction Stop
        Write-Host "Removed project folder $projektDir" -ForegroundColor Yellow
    } catch {
        Write-Host 'Could not delete everything (a file is in use - close VS Code / the terminal in that folder).' -ForegroundColor Red
        Write-Host "The zip is fine. Delete $projektDir by hand afterwards."
        exit 1
    }
} else {
    Write-Host "Project folder kept. When finished, delete it (or rerun with -UsunProjekt) so only the zip + files remain."
}
