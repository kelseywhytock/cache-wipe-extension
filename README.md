# Cache Wipe Chrome Extension

A one-click Chrome extension that instantly clears cache for the active tab.

## Features

- **One-click operation** - Just click the extension icon
- **Site-specific clearing** - Only affects the current tab's site (origin)
- **Smart feedback** - Badge indicators show progress and status
- **Optional cookie clearing** - Right-click the icon to toggle
- **Configurable notifications** - Choose your feedback preference
- **1-hour time limit** - Prevents accidental data loss
- **Automatic tab reload** - Refreshes after clearing

## Installation

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top right)
3. Click "Load unpacked"
4. Select this repository's folder (the one containing `manifest.json`)
5. The Cache Wipe icon will appear in your toolbar

## Usage

### Basic Operation
Simply click the Cache Wipe icon in your toolbar. The extension will:
1. Show "..." badge while clearing
2. Clear cache for the current tab's site (origin)
3. Show "✓" badge on success (or "!" on error)
4. Reload the tab automatically

### Settings
Right-click the extension icon to access settings:
- **Also clear cookies** - Toggle whether cookies are cleared
- **Show notifications** - Toggle desktop notifications

## Visual Feedback

- **Blue "..."** - Clearing in progress
- **Green "✓"** - Successfully cleared
- **Red "!"** - Error occurred

## Technical Details

### What Gets Cleared
- Browser Cache  
- Cache Storage
- Cookies (optional)

### Scope
- Only affects the current tab's origin (scheme + host + port); other open tabs on that same origin are affected too
- Only clears data from the past hour
- Preserves data from other sites

### Architecture
- Uses service worker for instant response
- No popup delays or extra clicks
- Minimal memory footprint
- Chrome storage API for preferences

## Files

- `manifest.json` - Extension configuration (v1.1.2)
- `background.js` - Core service worker logic
- `icons/` - Extension icons (16px, 48px, 128px)
- `PRIVACY_POLICY.md` / `privacy-policy.html` - Privacy policy
- `LICENSE` - MIT license
- `TESTING_GUIDE.md` - Comprehensive testing instructions
- `test-page.html` - Manual testing page
- `CHANGELOG.md` - Version history

## Privacy

This extension:
- Only clears data for the current tab's origin
- Does not collect or transmit any data
- Stores two preferences via `chrome.storage.sync` (synced by Chrome only if Chrome Sync is on)

## Browser Compatibility

- Chrome 88+ (Manifest V3 minimum; `minimum_chrome_version` is set to 88)
- Edge 88+ (Chromium-based)
- Only tested on current Chrome; older versions are unverified

## Testing

1. Open `test-page.html` in Chrome
2. Load the extension in developer mode
3. Follow testing instructions in `TESTING_GUIDE.md`
4. Use Chrome DevTools Network tab for verification

## Error Handling

- Non-http(s) pages (`chrome://`, `file://`, `about:`, New Tab, etc.) show a notification and are left untouched, including pages where Chrome hides the URL from the extension
- If clearing fails, a red "!" badge and an error notification appear
- Error and system-page notifications are shown even if "Show notifications" is off; that setting only controls the success message
- Service worker errors are logged to the console

## License

[MIT](LICENSE)
