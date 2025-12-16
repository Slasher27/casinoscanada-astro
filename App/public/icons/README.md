# Web App Icons

This directory contains all the icon sizes for the Casinos Canada web app.

## Generated Files

All icons are automatically generated from the master icon using the script:
```bash
node scripts/generate-icons.js
```

### Favicon Icons
- `favicon-16x16.png` - Browser tab icon (small)
- `favicon-32x32.png` - Browser tab icon (standard)
- `favicon-48x48.png` - Browser tab icon (large)

### Apple Touch Icons
- `apple-touch-icon.png` (180x180) - iOS home screen icon

### Android Icons
- `android-chrome-192x192.png` - Standard Android icon
- `android-chrome-512x512.png` - High-resolution Android icon
- `android-chrome-maskable-512x512.png` - Maskable icon with safe zone (for Android 8+)

### Web App Manifest Icons
- `icon-192x192.png` - PWA icon (standard)
- `icon-512x512.png` - PWA icon (high-res)

### Windows Tile
- `mstile-150x150.png` - Windows Start Menu tile

## Source File

Master icon: `/public/images/icons/master-icon-512x512.png`

## Regenerating Icons

If you update the master icon, regenerate all sizes:
```bash
node scripts/generate-icons.js
```

## References

- [Web App Manifest Spec](https://www.w3.org/TR/appmanifest/)
- [Apple Touch Icons](https://developer.apple.com/design/human-interface-guidelines/foundations/app-icons/)
- [Android Adaptive Icons](https://developer.android.com/develop/ui/views/launch/icon_design_adaptive)
