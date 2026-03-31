param(
  [int]$Port = 8080
)

$root = $PSScriptRoot
$prefix = "http://localhost:$Port/"

function Get-ContentType {
  param([string]$Path)

  switch ([System.IO.Path]::GetExtension($Path).ToLowerInvariant()) {
    ".html" { "text/html; charset=utf-8" }
    ".css" { "text/css; charset=utf-8" }
    ".js" { "application/javascript; charset=utf-8" }
    ".json" { "application/json; charset=utf-8" }
    ".svg" { "image/svg+xml" }
    ".png" { "image/png" }
    ".jpg" { "image/jpeg" }
    ".jpeg" { "image/jpeg" }
    ".webp" { "image/webp" }
    ".gif" { "image/gif" }
    ".ico" { "image/x-icon" }
    ".pdf" { "application/pdf" }
    ".mp4" { "video/mp4" }
    ".webm" { "video/webm" }
    ".woff" { "font/woff" }
    ".woff2" { "font/woff2" }
    ".ttf" { "font/ttf" }
    default { "application/octet-stream" }
  }
}

function Send-Response {
  param(
    [System.Net.HttpListenerContext]$Context,
    [int]$StatusCode,
    [string]$Body,
    [string]$ContentType = "text/plain; charset=utf-8"
  )

  $buffer = [System.Text.Encoding]::UTF8.GetBytes($Body)
  $Context.Response.StatusCode = $StatusCode
  $Context.Response.ContentType = $ContentType
  $Context.Response.ContentLength64 = $buffer.Length
  $Context.Response.OutputStream.Write($buffer, 0, $buffer.Length)
  $Context.Response.OutputStream.Close()
}

$listener = [System.Net.HttpListener]::new()
$listener.Prefixes.Add($prefix)
$listener.Start()

Write-Host ""
Write-Host "Delta Force site local:"
Write-Host "  $prefix"
Write-Host ""
Write-Host "Apasa Ctrl+C ca sa opresti serverul."
Write-Host ""

Start-Process $prefix | Out-Null

try {
  while ($listener.IsListening) {
    $context = $listener.GetContext()

    try {
      $requestPath = [System.Uri]::UnescapeDataString($context.Request.Url.AbsolutePath.TrimStart("/"))
      if ([string]::IsNullOrWhiteSpace($requestPath)) {
        $requestPath = "index.html"
      }

      $safeRelativePath = $requestPath -replace "/", "\"
      $targetPath = Join-Path $root $safeRelativePath

      if ((Test-Path $targetPath) -and (Get-Item $targetPath).PSIsContainer) {
        $targetPath = Join-Path $targetPath "index.html"
      }

      if (-not (Test-Path $targetPath)) {
        Send-Response -Context $context -StatusCode 404 -Body "404 Not Found"
        continue
      }

      $resolvedRoot = [System.IO.Path]::GetFullPath($root)
      $resolvedTarget = [System.IO.Path]::GetFullPath($targetPath)

      if (-not $resolvedTarget.StartsWith($resolvedRoot, [System.StringComparison]::OrdinalIgnoreCase)) {
        Send-Response -Context $context -StatusCode 403 -Body "403 Forbidden"
        continue
      }

      $bytes = [System.IO.File]::ReadAllBytes($resolvedTarget)
      $context.Response.StatusCode = 200
      $context.Response.ContentType = Get-ContentType $resolvedTarget
      $context.Response.ContentLength64 = $bytes.Length
      $context.Response.OutputStream.Write($bytes, 0, $bytes.Length)
      $context.Response.OutputStream.Close()
    } catch {
      if ($context.Response.OutputStream.CanWrite) {
        Send-Response -Context $context -StatusCode 500 -Body "500 Internal Server Error"
      }
    }
  }
} finally {
  $listener.Stop()
  $listener.Close()
}
