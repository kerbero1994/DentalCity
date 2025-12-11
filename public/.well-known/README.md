# Deep Links Configuration

This folder contains the configuration files for Universal Links (iOS) and App Links (Android).

## Files

- `apple-app-site-association` - iOS Universal Links configuration
- `assetlinks.json` - Android App Links configuration

## Deployment

These files are served from `/.well-known/` in production.

After deployment, verify:
- https://sitimm.org/.well-known/apple-app-site-association
- https://sitimm.org/.well-known/assetlinks.json

## Current Configuration

### iOS Universal Links
- **Team ID**: G8B5FX3U93
- **Bundle ID**: com.Sitimm.YoSoySitimm
- **Paths**: `/app/*`

### Android App Links
- **Package**: com.sitimm.app
- **SHA-256 Fingerprint**: D0:5D:45:3F:A5:6A:B7:76:53:E4:CA:6E:FF:A5:44:A2:2D:E8:CF:B0:34:6A:E2:59:91:2B:39:E2:64:A2:4A:9D

## Testing

### iOS
1. Test on a physical device (Universal Links don't work in simulator)
2. Long press a link and verify "Open in [App Name]" appears
3. Verify the link format: `https://sitimm.org/app/[path]`

### Android
1. Verify with Android Asset Links:
   ```bash
   curl https://sitimm.org/.well-known/assetlinks.json
   ```
2. Test on device by clicking links in messages or browser
3. Go to Settings > Apps > [App Name] > Open by default to verify

## Notes

- These files must be served with `Content-Type: application/json`
- They must be accessible via HTTPS
- No redirects should occur when accessing these files
- The files should be accessible without authentication
