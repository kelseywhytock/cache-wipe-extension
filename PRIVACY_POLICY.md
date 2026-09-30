# Privacy Policy for Cache Wipe

**Last Updated: September 30, 2026**

## Overview

Cache Wipe is a Chrome extension developed by Kelsey Whytock that respects your privacy. This extension does not collect, store, transmit, or share any personal information or browsing data.

## Data Collection

**Cache Wipe does NOT:**
- Collect any personal information
- Track your browsing history
- Store website data
- Transmit data to external servers
- Use analytics or tracking tools
- Access or read website content
- Share data with third parties

## Data Storage

The extension stores only the following preferences locally on your device using Chrome's storage API:
- **Cookie clearing preference** (boolean: true/false)
- **Notification preference** (boolean: true/false)

This data:
- Never leaves your device
- Is stored using Chrome's storage API (`chrome.storage.sync`)
- Can be cleared by uninstalling the extension
- Is synced across your devices by Chrome only if you have Chrome Sync enabled; the extension itself never transmits it

## Permissions Used

Cache Wipe requires the following permissions to function:

### Required Permissions:
- **activeTab**: To identify which tab's site to clear and reload it, only when you click the icon
- **browsingData**: To clear cache and cookies for the active tab
- **storage**: To save your preferences locally
- **notifications**: To show optional success/error messages
- **contextMenus**: To provide right-click settings options

### How Permissions Are Used:
- **activeTab**: Only used to get the current tab's URL and reload it
- **browsingData**: Only removes data from the specific domain you're visiting
- **storage**: Only stores your two preference settings
- **notifications**: Only displays status messages when enabled
- **contextMenus**: Only creates two checkbox options for settings

## Data Removal

Cache Wipe only removes browsing data that:
- Belongs to the current tab's domain
- Was created within the past hour
- Includes only: App Cache, Browser Cache, Cache Storage, and optionally Cookies

The extension cannot and does not:
- Access cached content before deletion
- Store any deleted data
- Remove data from other websites
- Access your passwords, bookmarks, or history

## Third-Party Services

Cache Wipe does not use any third-party services, libraries, or APIs. All functionality is self-contained within the extension.

## Updates

When the extension is updated through the Chrome Web Store:
- No additional data is collected
- Your preferences are preserved
- No telemetry is sent

## Children's Privacy

This extension does not knowingly collect any information from children under 13 years of age.

## Contact Information

For questions about this privacy policy or the extension, contact:

**Kelsey Whytock**
Email: kewhytock@gmail.com
Website: https://github.com/kelseywhytock

## Changes to This Policy

Any changes to this privacy policy will be reflected in the "Last Updated" date. Continued use of the extension after changes constitutes acceptance of the updated policy.

## User Rights

You have the right to:
- Use the extension without providing any personal data
- Disable notifications and cookie clearing at any time
- Uninstall the extension to remove all stored preferences
- Contact us with any privacy concerns

---

By using Cache Wipe, you acknowledge that you have read and understood this Privacy Policy.