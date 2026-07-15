$keelDir = "C:\Users\Administrator\projects\keel"
$desktopDir = "C:\Users\Administrator\projects\keel-desktop"

Write-Host "Syncing $keelDir → $desktopDir" -ForegroundColor Cyan

$exclude = @(
  ".git", "node_modules", "dist", "dist.zip",
  "src-tauri\target", ".vercel", ".env", ".env*",
  "supabase\.temp", "tmp\"
)

Copy-Item -Path "$keelDir\*" -Destination $desktopDir -Recurse -Force -Exclude $exclude

Write-Host "Synced. Now commit and push a new tag to trigger CI build." -ForegroundColor Green
