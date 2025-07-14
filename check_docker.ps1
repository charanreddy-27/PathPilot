# Check if Docker Desktop is installed
$dockerDesktop = Get-WmiObject -Class Win32_Product | Where-Object { $_.Name -like "*Docker Desktop*" }
Write-Host "`nDocker Desktop Installation Status:"
if ($dockerDesktop) {
    Write-Host "Docker Desktop is installed" -ForegroundColor Green
} else {
    Write-Host "Docker Desktop is not installed" -ForegroundColor Red
}

# Check Docker in PATH
$path = $env:Path
$dockerPaths = $path.Split(';') | Where-Object { $_ -like "*docker*" }
Write-Host "`nDocker PATH entries:"
if ($dockerPaths) {
    $dockerPaths | ForEach-Object { Write-Host $_ -ForegroundColor Green }
} else {
    Write-Host "No Docker entries found in PATH" -ForegroundColor Red
}

# Expected Docker paths
$expectedPaths = @(
    "${env:ProgramFiles}\Docker\Docker\resources\bin",
    "${env:ProgramFiles}\Docker\Docker\resources"
)

Write-Host "`nChecking expected Docker paths:"
foreach ($path in $expectedPaths) {
    if (Test-Path $path) {
        Write-Host "Found: $path" -ForegroundColor Green
    } else {
        Write-Host "Missing: $path" -ForegroundColor Red
    }
}

# Try to get Docker version
Write-Host "`nTrying to run Docker commands:"
try {
    $dockerVersion = docker --version
    Write-Host "Docker version: $dockerVersion" -ForegroundColor Green
} catch {
    Write-Host "Failed to get Docker version" -ForegroundColor Red
    Write-Host $_.Exception.Message
}

# Enable WSL features
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart 