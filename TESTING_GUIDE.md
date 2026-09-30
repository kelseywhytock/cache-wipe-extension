# Testing Guide for Cache Wipe

## Method 1: Chrome DevTools Network Tab (Most Reliable)

1. **Open a test website** (e.g., a site with images/CSS/JS)
2. **Open DevTools** (F12 or right-click → Inspect)
3. **Go to Network tab**
4. **Reload the page** (Ctrl+R) - note the "Size" column shows:
   - `(from cache)` or `(disk cache)` for cached resources
   - Actual file sizes for fresh downloads
5. **Click Cache Wipe extension**
6. **Check Network tab again** - you should see:
   - All resources showing actual file sizes (not cached)
   - Longer load times (no cache hits)
   - Status 200 instead of 304

## Method 2: Response Headers Test

1. In DevTools Network tab, click on any resource
2. Check Response Headers for:
   - **Before cache clear**: Often shows `304 Not Modified`
   - **After cache clear**: Should show `200 OK`

## Method 3: Application Tab Test

1. Open DevTools → Application tab
2. Look at Storage section:
   - **Cache Storage** - should be empty after clearing
   - **Cookies** - should be empty if cookie clearing is enabled
3. Click Cache Wipe and refresh - storage should be cleared

## Method 4: Visual Changes Test

1. Make a visible change to a website you control:
   ```html
   <!-- Change CSS file -->
   <link rel="stylesheet" href="style.css?v=2">
   ```
2. Visit the site (old version loads from cache)
3. Click Cache Wipe
4. New version should appear immediately

## Method 5: Console Timestamp Test

1. Add this to a test HTML file:
   ```html
   <script>
   console.log('Page loaded at:', new Date().toISOString());
   console.log('Cached:', performance.getEntriesByType('navigation')[0].transferSize === 0);
   </script>
   ```
2. The "Cached" value should change from `true` to `false` after cache clear

## Method 6: Chrome Internal Pages

1. Visit `chrome://net-internals/#events`
2. Filter by your test domain
3. Click Cache Wipe
4. You should see cache clear events for that specific domain

## Method 7: Service Worker Test

For sites with service workers:
1. DevTools → Application → Service Workers
2. Check "Update on reload"
3. After Cache Wipe, service worker cache should be empty

## Test Scenarios Checklist

- [ ] Test on HTTP site
- [ ] Test on HTTPS site  
- [ ] Test with cookies enabled
- [ ] Test with cookies disabled
- [ ] Test on site with service workers
- [ ] Test on site with large images
- [ ] Test on single-page application
- [ ] Verify only current tab is affected
- [ ] Verify only past hour of data is cleared
- [ ] Test error handling on chrome:// pages

## Common Issues to Watch For

1. **False Positives**: Browser may still show `(from memory cache)` for the current session
2. **CDN Caching**: Some resources may be cached at CDN level
3. **Service Workers**: May need additional clearing
4. **HTTP/2 Push**: Pushed resources might behave differently

## Automated Testing Script

Create a test page that logs cache status:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Cache Wipe Test</title>
</head>
<body>
    <h1>Cache Test Page</h1>
    <img src="test-image.jpg?t=1" alt="Test">
    <script>
        // Check if resources were cached
        window.addEventListener('load', () => {
            const entries = performance.getEntriesByType('resource');
            entries.forEach(entry => {
                const wasCached = entry.transferSize === 0 && entry.decodedBodySize > 0;
                console.log(`${entry.name}: ${wasCached ? 'CACHED' : 'FRESH'}`);
            });
        });
    </script>
</body>
</html>
```

## Quick Verification

The fastest way to verify cache clearing:
1. Open any website
2. Open DevTools (F12) → Network tab
3. Refresh page - note resources showing "(from cache)"
4. Click Cache Wipe icon
5. All resources should now show actual sizes, not "(from cache)"

Badge indicators also confirm operation:
- Blue "..." = Currently clearing
- Green "✓" = Successfully cleared
- Red "!" = Error occurred