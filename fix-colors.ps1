$files = Get-ChildItem "app\src\pages\*.tsx"
foreach ($f in $files) {
    $c = Get-Content $f.FullName -Raw
    $c = $c -replace "rose-", "emerald-"
    Set-Content $f.FullName $c
}
Write-Host "Done replacing rose- with emerald- in pages"
