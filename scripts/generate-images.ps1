# PowerShell script to create simple placeholder images
# This uses .NET System.Drawing which is available on Windows

Add-Type -AssemblyName System.Drawing

function Create-Image {
    param(
        [int]$Width,
        [int]$Height,
        [string]$Filename,
        [scriptblock]$DrawFunction
    )
    
    $bitmap = New-Object System.Drawing.Bitmap($Width, $Height)
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    
    # Create gradient background
    $brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
        [System.Drawing.Point]::new(0, 0),
        [System.Drawing.Point]::new($Width, $Height),
        [System.Drawing.Color]::FromArgb(102, 126, 234),  # #667eea
        [System.Drawing.Color]::FromArgb(118, 75, 162)     # #764ba2
    )
    $graphics.FillRectangle($brush, 0, 0, $Width, $Height)
    
    # Call custom draw function
    & $DrawFunction $graphics $Width $Height
    
    # Save the image
    $publicDir = Join-Path $PSScriptRoot "public"
    if (-not (Test-Path $publicDir)) {
        New-Item -ItemType Directory -Path $publicDir | Out-Null
    }
    
    $filePath = Join-Path $publicDir $Filename
    $bitmap.Save($filePath, [System.Drawing.Imaging.ImageFormat]::Png)
    
    Write-Host "✅ Created $Filename ($Width x $Height)" -ForegroundColor Green
    
    $graphics.Dispose()
    $bitmap.Dispose()
    $brush.Dispose()
}

# Create icon.png (256x256)
Create-Image -Width 256 -Height 256 -Filename "icon.png" -DrawFunction {
    param($g, $w, $h)
    
    # Draw white box
    $whiteBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(51, 255, 255, 255))
    $g.FillRectangle($whiteBrush, 20, 20, $w - 40, $h - 40)
    
    # Draw "2048" text
    $font = New-Object System.Drawing.Font("Arial", 60, [System.Drawing.FontStyle]::Bold)
    $textBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
    $format = New-Object System.Drawing.StringFormat
    $format.Alignment = [System.Drawing.StringAlignment]::Center
    $format.LineAlignment = [System.Drawing.StringAlignment]::Center
    $g.DrawString("2048", $font, $textBrush, $w/2, $h/2, $format)
    
    $whiteBrush.Dispose()
    $textBrush.Dispose()
    $font.Dispose()
    $format.Dispose()
}

# Create og-image.png (1200x630)
Create-Image -Width 1200 -Height 630 -Filename "og-image.png" -DrawFunction {
    param($g, $w, $h)
    
    # Draw title
    $titleFont = New-Object System.Drawing.Font("Arial", 72, [System.Drawing.FontStyle]::Bold)
    $textBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
    $format = New-Object System.Drawing.StringFormat
    $format.Alignment = [System.Drawing.StringAlignment]::Center
    $g.DrawString("2048 Game", $titleFont, $textBrush, $w/2, 200, $format)
    
    # Draw subtitle
    $subtitleFont = New-Object System.Drawing.Font("Arial", 36, [System.Drawing.FontStyle]::Regular)
    $g.DrawString("Join the tiles, get to 2048!", $subtitleFont, $textBrush, $w/2, 300, $format)
    
    $textBrush.Dispose()
    $titleFont.Dispose()
    $subtitleFont.Dispose()
    $format.Dispose()
}

# Create splash.png (1080x1920)
Create-Image -Width 1080 -Height 1920 -Filename "splash.png" -DrawFunction {
    param($g, $w, $h)
    
    # Draw title
    $titleFont = New-Object System.Drawing.Font("Arial", 96, [System.Drawing.FontStyle]::Bold)
    $textBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
    $format = New-Object System.Drawing.StringFormat
    $format.Alignment = [System.Drawing.StringAlignment]::Center
    $g.DrawString("2048", $titleFont, $textBrush, $w/2, 600, $format)
    
    # Draw subtitle
    $subtitleFont = New-Object System.Drawing.Font("Arial", 48, [System.Drawing.FontStyle]::Regular)
    $g.DrawString("Join the tiles", $subtitleFont, $textBrush, $w/2, 1200, $format)
    $g.DrawString("get to 2048!", $subtitleFont, $textBrush, $w/2, 1280, $format)
    
    $textBrush.Dispose()
    $titleFont.Dispose()
    $subtitleFont.Dispose()
    $format.Dispose()
}

Write-Host ""
Write-Host "All images created successfully!" -ForegroundColor Green
Write-Host "Images saved to: public/" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Review the images in the public folder" -ForegroundColor White
Write-Host "2. Commit and push to GitHub" -ForegroundColor White
Write-Host "3. Vercel will auto-deploy the new images" -ForegroundColor White
Write-Host ""

