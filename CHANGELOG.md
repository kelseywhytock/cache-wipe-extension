# Changelog

All notable changes to the Cache Wipe extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2025-09-23

### Changed
- **Redesigned extension icon** - Replaced recycling symbol with clear trash can icon
- **Improved visual clarity** - New icon immediately communicates cache deletion/clearing
- **Professional design** - Clean, minimal design suitable for Chrome Web Store
- **Multiple formats** - Created SVG versions for all required sizes (16px, 48px, 128px)

- **Privacy policy** - Developer/contact details updated in PRIVACY_POLICY.md and privacy-policy.html (removed placeholder contacts and prior organization name)
- **manifest.json** - Version bumped 1.0 → 1.1.0, added `author`
- **Repository cleanup** - Removed LICENSE (extension is distributed unlisted, not as open source), moved root icons into `icons/`, added .gitignore

### Technical Details
- New icon uses universally recognized trash can symbol for deletion
- Maintained consistent blue (#4285f4) brand color scheme
- Optimized for visibility at all sizes (16px to 128px)
- SVG format for crisp rendering and scalability

## [1.0.0] - 2025-09-23

### Added
- Initial release of Cache Wipe extension
- One-click cache clearing for active tab from past hour
- Optional cookie clearing via context menu setting
- Optional notification display via context menu setting
- Visual badge feedback during cache clearing operation
- Support for HTTP/HTTPS websites with origin-specific clearing
- Error handling for system pages (chrome://, chrome-extension://)
- Auto-reload tab after successful cache clearing
- Settings persistence using Chrome storage sync API
- Privacy policy compliance with Chrome Web Store requirements

### Technical Details
- Manifest V3 compliance for Chrome Web Store 2025 requirements
- Service worker background script implementation
- Uses Chrome browsingData API for selective cache clearing
- Implements contextMenus API for user preferences
- Badge API for visual feedback (loading, success, error states)
- Notifications API for optional user feedback
- Time-based filtering (1 hour) for targeted cache clearing

### Files Added
- manifest.json v1.0.0 - Extension manifest with required permissions
- background.js v1.0.0 - Main service worker with cache clearing logic
- icons/ - Extension icons in 16px, 48px, 128px sizes
- PRIVACY_POLICY.md - Comprehensive privacy policy
- README.md - User documentation and installation guide
- TESTING_GUIDE.md - Detailed testing methodology
- test-page.html - Manual testing page for cache verification

### Chrome Web Store Compliance
- ✅ Manifest V3 format
- ✅ Self-contained code (no remote scripts)
- ✅ Appropriate permission usage
- ✅ Privacy policy included
- ✅ Author information specified
- ✅ Semantic versioning format
- ✅ All functionality discernible from source code

### Permissions Justification
- `activeTab` - Required to identify current tab's domain for targeted clearing
- `browsingData` - Required to clear cache and storage data
- `tabs` - Required to reload tab after clearing and get tab information
- `storage` - Required to save user preferences (cookie clearing, notifications)
- `notifications` - Required to show optional success/error feedback
- `contextMenus` - Required to provide settings interface via right-click menu

### Browser Support
- Chrome 88+ (Manifest V3 minimum requirement)
- Works with all HTTP/HTTPS websites
- Handles error cases for system pages gracefully