// Default settings
const DEFAULT_SETTINGS = {
  includeCookies: false,
  showNotification: true
};

// Initialize settings and context menus on install/update
chrome.runtime.onInstalled.addListener(async () => {
  const stored = await chrome.storage.sync.get(['includeCookies', 'showNotification']);
  if (stored.includeCookies === undefined && stored.showNotification === undefined) {
    await chrome.storage.sync.set(DEFAULT_SETTINGS);
  }
  const settings = { ...DEFAULT_SETTINGS, ...stored };

  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({
      id: 'toggleCookies',
      title: 'Also clear cookies',
      type: 'checkbox',
      checked: settings.includeCookies,
      contexts: ['action']
    });

    chrome.contextMenus.create({
      id: 'toggleNotifications',
      title: 'Show notifications',
      type: 'checkbox',
      checked: settings.showNotification,
      contexts: ['action']
    });
  });
});

function notifyUnsupportedPage() {
  chrome.notifications.create({
    type: 'basic',
    iconUrl: 'icons/icon-128.png',
    title: 'Cache Wipe',
    message: 'Cache can only be cleared for http(s) pages',
    priority: 1
  });
}

// Handle extension icon click
chrome.action.onClicked.addListener(async (tab) => {
  // Without the `tabs` permission, activeTab does not expose the URL of
  // privileged pages (chrome://, New Tab, etc.), so tab.url is undefined there
  if (!tab || !tab.url) {
    notifyUnsupportedPage();
    return;
  }
  
  try {
    // Get user settings
    const settings = await chrome.storage.sync.get(['includeCookies', 'showNotification']);
    const includeCookies = settings.includeCookies || false;
    const showNotification = settings.showNotification !== false; // default true
    
    // Only http(s) pages have an origin that browsingData can clear
    const url = new URL(tab.url);
    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
      notifyUnsupportedPage();
      return;
    }
    const origin = url.origin;
    
    // Calculate time range (1 hour ago)
    const oneHourAgo = Date.now() - (60 * 60 * 1000);
    
    // Define what to remove
    const removalOptions = {
      since: oneHourAgo,
      origins: [origin]
    };
    
    // Build data types to remove
    const dataToRemove = {
      cache: true,
      cacheStorage: true,
      cookies: includeCookies
    };
    
    // Show badge to indicate clearing
    await chrome.action.setBadgeText({ text: '...' });
    await chrome.action.setBadgeBackgroundColor({ color: '#0073e6' });
    
    // Clear browsing data
    await chrome.browsingData.remove(removalOptions, dataToRemove);

    // Reload the tab
    await chrome.tabs.reload(tab.id);
    
    // Success feedback
    await chrome.action.setBadgeText({ text: '✓' });
    await chrome.action.setBadgeBackgroundColor({ color: '#4CAF50' });
    
    // Clear badge after 2 seconds
    setTimeout(async () => {
      try {
        await chrome.action.setBadgeText({ text: '' });
      } catch (e) {
        // Tab might be closed
      }
    }, 2000);
    
    // Show notification if enabled
    if (showNotification) {
      const message = includeCookies 
        ? `Cache and cookies cleared for ${url.hostname}`
        : `Cache cleared for ${url.hostname}`;
        
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icons/icon-128.png',
        title: 'Cache Wipe',
        message: message,
        priority: 1
      });
    }
    
  } catch (error) {
    console.error('Error clearing cache:', error);
    
    // Error feedback
    try {
      await chrome.action.setBadgeText({ text: '!' });
      await chrome.action.setBadgeBackgroundColor({ color: '#F44336' });
      
      // Clear error badge after 3 seconds
      setTimeout(async () => {
        try {
          await chrome.action.setBadgeText({ text: '' });
        } catch (e) {
          // Tab might be closed
        }
      }, 3000);
    } catch (e) {
      console.error('Error setting badge:', e);
    }
    
    // Show error notification
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icons/icon-128.png',
      title: 'Cache Wipe Error',
      message: `Failed to clear cache: ${error.message}`,
      priority: 2
    });
  }
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'toggleCookies') {
    chrome.storage.sync.set({ includeCookies: info.checked });
  } else if (info.menuItemId === 'toggleNotifications') {
    chrome.storage.sync.set({ showNotification: info.checked });
  }
});
