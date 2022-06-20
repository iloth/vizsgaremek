#clean destination
Write-Output "#clean destination"
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
Write-Output "#backend"
Set-Location -Path .\source\backend
tsc --build --verbose
Set-Location -Path ..\..
Copy-Item -Path ".\source\backend\dist\*" -Destination ".\distributable\web" -Recurse
Copy-Item -Path ".\source\backend\config" -Destination ".\distributable\web" -Recurse
Copy-Item -Path ".\source\backend\package.json" -Destination ".\distributable\web"
Copy-Item -Path ".\source\backend\src\swagger" -Destination ".\distributable\web" -Recurse

#build frontend
Write-Output "#frontend"
Set-Location -Path .\source\frontend
ng build
Set-Location -Path ..\..
Copy-Item -Path ".\source\frontend\dist\*" -Destination ".\distributable\web\public" -Recurse

#starting...
Set-Location -Path .\distributable\web
npm i
node index.js

