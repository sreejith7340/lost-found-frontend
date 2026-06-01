# Build frontend and copy build output into backend public folder
param(
    [string]$FrontendPath = "..\lost-found-frontend",
    [string]$BackendPublic = ".\public"
)

Write-Host "Building frontend at $FrontendPath"
Push-Location $FrontendPath
npm ci
npm run build
Pop-Location

Write-Host "Copying build to backend public folder"
Remove-Item -Recurse -Force "$BackendPublic\*" -ErrorAction SilentlyContinue
Copy-Item -Recurse -Force "$FrontendPath\build\*" $BackendPublic
Write-Host "Done."