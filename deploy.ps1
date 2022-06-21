#clean destination
Write-Output "####  clean destination"
if (Test-Path -Path ".\distributable") {
  Remove-Item -Path ".\distributable\*" -Recurse -Force
} else {
  New-Item -Path ".\distributable" -itemType Directory
}

#build backend
Write-Output "####  build and copy backend"
Remove-Item -Path ".\source\backend\dist\*" -Recurse -Force
Set-Location -Path ".\source\backend"
tsc --build --verbose
Set-Location -Path "..\.."
Copy-Item -Path ".\source\backend\dist\*" -Destination ".\distributable" -Recurse
Copy-Item -Path ".\source\backend\config" -Destination ".\distributable" -Recurse
Copy-Item -Path ".\source\backend\package.json" -Destination ".\distributable"
Copy-Item -Path ".\source\backend\src\swagger" -Destination ".\distributable" -Recurse

#build frontend
Write-Output "####  build and copy frontend"
Set-Location -Path ".\source\frontend"
ng build
Set-Location -Path "..\.."
if (-not(Test-Path -Path ".\distributable\public")) {
  New-Item -Path ".\distributable\public" -itemType Directory
}
Copy-Item -Path ".\source\frontend\dist\*" -Destination ".\distributable\public" -Recurse

#docker image
if (-not($args.Contains("-docker"))) {
  Write-Output "####  build docker image"
  docker build distributable -f .\dockerfile -t iloth-vizsgaremek

  if ($args.Contains("docker")) {
    Write-Output "####  run docker image"
    docker run -d -p 8080:8080 --name iloth-vizsgaremek-run iloth-vizsgaremek
    Start-Process "http://localhost:8080"
  }
}

#nodejs
if (-not($args.Contains("-node"))) {
  Write-Output "####  install npm dependencies"
  Set-Location -Path ".\distributable"
  npm i --omit=dev

  if ($args.Contains("node")) {
    Write-Output "####  start nodejs server"
    Start-Process "http://localhost:8080"
    node index.js
  }
  Set-Location -Path ".."
}
