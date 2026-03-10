$files = Get-ChildItem "app\src\pages\*.tsx"
foreach ($f in $files) {
    $bytes = [System.IO.File]::ReadAllText($f.FullName, [System.Text.Encoding]::UTF8)
    $bytes = $bytes -replace "rose-", "emerald-"
    [System.IO.File]::WriteAllText($f.FullName, $bytes, [System.Text.Encoding]::UTF8)
}
Write-Host "Done - UTF8 safe replacement complete"
