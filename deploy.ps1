#clean destination
Write-Output "####  clean destination"
if (Test-Path -Path ".\distributable\web") {
  Remove-Item -Path ".\distributable\web\*" -Recurse -Force
} else {
  if (-not(Test-Path -Path ".\distributable\")) {
    New-Item -Path ".\distributable\" -itemType Directory
  }
  if (-not(Test-Path -Path ".\distributable\web")) {
    New-Item -Path ".\distributable\web" -itemType Directory
  }
}

#build backend
Write-Output "####  backend"
Set-Location -Path .\source\backend
tsc --build --verbose
Set-Location -Path ..\..
Copy-Item -Path ".\source\backend\dist\*" -Destination ".\distributable\web" -Recurse
Copy-Item -Path ".\source\backend\config" -Destination ".\distributable\web" -Recurse
Copy-Item -Path ".\source\backend\package.json" -Destination ".\distributable\web"
Copy-Item -Path ".\source\backend\src\swagger" -Destination ".\distributable\web" -Recurse

#build frontend
Write-Output "####  frontend"
Set-Location -Path .\source\frontend
ng build
Set-Location -Path ..\..
if (-not(Test-Path -Path ".\distributable\web\public")) {
  New-Item -Path ".\distributable\web\public" -itemType Directory
}
Copy-Item -Path ".\source\frontend\dist\*" -Destination ".\distributable\web\public" -Recurse

#build docker image
Write-Output "####  docker image..."
if (-not(Test-Path -Path ".\distributable\docker")) {
  New-Item -Path ".\distributable\docker" -itemType Directory
}
docker build distributable\web -f .\dockerfile -t iloth-vizsgaremek

if ($args[0] -eq "docker") {
  docker run -d -p 8080:8080 --name iloth-vizsgaremek-run iloth-vizsgaremek
  Start-Process "http://localhost:8080"
}

#starting...
if ($args[0] -eq "web") {
  Write-Output "####  starting..."
  Set-Location -Path .\distributable\web
  npm i --omit=dev
  node index.js
  # Set-Location -Path ..\..
  # Start-Process "http://localhost:8080"
}
