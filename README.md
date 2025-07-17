# Cache Wipe Chrome Extension

A one-click Chrome extension that instantly clears cache for the active tab.

## Features

- **One-click operation** - Just click the extension icon
- **Tab-specific clearing** - Only affects the current tab's domain
- **Smart feedback** - Badge indicators show progress and status
- **Optional cookie clearing** - Right-click the icon to toggle
- **Configurable notifications** - Choose your feedback preference
- **1-hour time limit** - Prevents accidental data loss
- **Automatic tab reload** - Refreshes after clearing

## Installation

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top right)
3. Click "Load unpacked"
4. Select the `cache-cleaner-extension` folder
5. The Cache Wipe icon will appear in your toolbar

## Usage

### Basic Operation
Simply click the Cache Wipe icon in your toolbar. The extension will:
1. Show "..." badge while clearing
2. Clear cache for the current tab's domain
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
- App Cache
- Browser Cache  
- Cache Storage
- Cookies (optional)

### Scope
- Only affects the current tab's origin
- Only clears data from the past hour
- Preserves data from other sites

### Architecture
- Uses service worker for instant response
- No popup delays or extra clicks
- Minimal memory footprint
- Chrome storage API for preferences

## Files

- `manifest.json` - Extension configuration
- `background.js` - Core service worker logic
- `icon.png` - Extension icon

## Privacy

This extension:
- Only clears data for the specific tab
- Does not collect or transmit any data
- Stores preferences locally only

## Browser Compatibility

- Chrome 93+ (Manifest V3 with service workers)
- Edge 93+ (Chromium-based)

## Error Handling

The extension handles common errors gracefully:
- Invalid URLs are ignored
- Protected pages show error badge
- All errors display clear notifications (if enabled)