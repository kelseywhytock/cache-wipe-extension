// Default settings
const DEFAULT_SETTINGS = {
  includeCookies: false,
  showNotification: true
};

// Initialize settings on install
chrome.runtime.onInstalled.addListener(() => {
  // Set default settings
  chrome.storage.sync.get(['includeCookies', 'showNotification'], (result) => {
    if (result.includeCookies === undefined) {
      chrome.storage.sync.set(DEFAULT_SETTINGS);
    }
  });
  
  // Create context menus
  chrome.contextMenus.create({
    id: 'toggleCookies',
    title: 'Also clear cookies',
    type: 'checkbox',
    contexts: ['action']
  });
  
  chrome.contextMenus.create({
    id: 'toggleNotifications',
    title: 'Show notifications',
    type: 'checkbox',
    checked: true,
    contexts: ['action']
  });
  
  // Set initial checkbox states
  chrome.storage.sync.get(['includeCookies', 'showNotification'], (result) => {
    chrome.contextMenus.update('toggleCookies', {
      checked: result.includeCookies || false
    });
    chrome.contextMenus.update('toggleNotifications', {
      checked: result.showNotification !== false
    });
  });
});

// Handle extension icon click
chrome.action.onClicked.addListener(async (tab) => {
  if (!tab || !tab.url) {
    console.error('No URL found for tab');
    return;
  }
  
  try {
    // Get user settings
    const settings = await chrome.storage.sync.get(['includeCookies', 'showNotification']);
    const includeCookies = settings.includeCookies || false;
    const showNotification = settings.showNotification !== false; // default true
    
    // Extract origin from URL
    const url = new URL(tab.url);
    const origin = url.origin;
    
    // Skip chrome:// and other special URLs
    if (url.protocol === 'chrome:' || url.protocol === 'chrome-extension:' || url.protocol === 'about:') {
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icons/icon-128.png',
        title: 'Cache Wipe',
        message: 'Cannot clear cache for system pages',
        priority: 1
      });
      return;
    }
    
    // Calculate time range (1 hour ago)
    const oneHourAgo = Date.now() - (60 * 60 * 1000);
    
    // Define what to remove
    const removalOptions = {
      since: oneHourAgo,
      origins: [origin]
    };
    
    // Build data types to remove
    const dataToRemove = {
      appcache: true,
      cache: true,
      cacheStorage: true,
      cookies: includeCookies
    };
    
    // Show badge to indicate clearing
    await chrome.action.setBadgeText({ text: '...', tabId: tab.id });
    await chrome.action.setBadgeBackgroundColor({ color: '#0073e6' });
    
    // Clear browsing data
    await chrome.browsingData.remove(removalOptions, dataToRemove);
    
    // Reload the tab
    await chrome.tabs.reload(tab.id);
    
    // Success feedback
    await chrome.action.setBadgeText({ text: '✓', tabId: tab.id });
    await chrome.action.setBadgeBackgroundColor({ color: '#4CAF50' });
    
    // Clear badge after 2 seconds
    setTimeout(async () => {
      try {
        await chrome.action.setBadgeText({ text: '', tabId: tab.id });
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
      await chrome.action.setBadgeText({ text: '!', tabId: tab.id });
      await chrome.action.setBadgeBackgroundColor({ color: '#F44336' });
      
      // Clear error badge after 3 seconds
      setTimeout(async () => {
        try {
          await chrome.action.setBadgeText({ text: '', tabId: tab.id });
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

// Keep service worker alive
self.addEventListener('activate', event => {
  console.log('Cache Wipe service worker activated');
});