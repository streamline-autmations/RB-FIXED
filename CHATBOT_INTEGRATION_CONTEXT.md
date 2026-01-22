# Convocore Chatbot Integration - Complete Context Document

## Overview
This document contains the complete history, issues, fixes, and current state of the Convocore chatbot integration for the RecklessBear website. Use this when handing off to a new AI assistant or developer.

---

## Project Details

- **Project**: RecklessBear Website (React + Vite + Tailwind CSS)
- **Deployment**: Netlify
- **Chatbot Provider**: Convocore
- **Agent ID**: `6BhLW2avFF69X0ydpkZ3`
- **Region**: `na`
- **Integration Mode**: Modal mode (opens as centered modal, not sidebar)

---

## Initial Requirements

1. **Widget Bubble**: Small bubble widget in bottom-right corner of screen
2. **Modal Opening**: When clicked, opens as centered modal taking 90% of screen (95% on mobile)
3. **No Proactive Notifications**: Prevent any "massive big red block" proactive notifications from appearing
4. **No Conflicts**: Ensure chatbot doesn't conflict with other forms (Cal.com, Tally.so)

---

## Files Involved

### Primary Files
1. **`index.html`** - Main entry point containing:
   - `<div id="VG_OVERLAY_CONTAINER"></div>` - Container where Convocore renders
   - `window.VG_CONFIG` configuration object
   - JavaScript for loading `vg_bundle.js`
   - Inline CSS styles for widget/modal positioning
   - JavaScript functions: `fixWidgetPosition()`, `fixModalPosition()`, `fixModalZoom()`

2. **`public/convocore-overrides.css`** - Custom CSS file with:
   - Rules to hide proactive notifications
   - Widget positioning rules
   - Modal sizing and centering rules
   - Content zoom fixes
   - CSS isolation from site styles

3. **`src/components/ui/ContactForm.tsx`** - Contains logic to hide chatbot when other forms are active

---

## Configuration

### VG_CONFIG Object (in `index.html`)
```javascript
window.VG_CONFIG = {
  ID: "6BhLW2avFF69X0ydpkZ3",
  region: "na",
  render: "bottom-right",
  modalMode: true,
  stylesheets: [
    "https://vg-bunny-cdn.b-cdn.net/vg_live_build/styles.css",
    "/convocore-overrides.css"
  ]
};
```

---

## Issues Encountered & Fixes Applied

### Issue 1: Images Not Loading (404 Errors)
**Problem**: All site images returning 404 errors after chatbot integration
**Root Cause**: Build process not copying public assets to `dist` folder
**Fix**: Added post-build script to copy public assets
**Status**: ✅ RESOLVED

---

### Issue 2: Chatbot Not Showing/Loading
**Problem**: Chatbot widget not appearing on page
**Root Cause**: Script loading timing issues, DOM not ready
**Fix**: Added proper `DOMContentLoaded` checks and script loading sequence
**Status**: ✅ RESOLVED

---

### Issue 3: "Massive Big Red Block" (Proactive Notification)
**Problem**: Large red proactive notification appearing instead of small bubble
**Root Cause**: Convocore's default proactive notification feature
**Fix**: Added aggressive CSS rules to hide all proactive notification containers:
```css
.vg-proactive-notification--container,
[class*="proactive-notification"],
[class*="proactive"] {
  display: none !important;
  visibility: hidden !important;
  opacity: 0 !important;
  /* ... additional hiding rules ... */
}
```
**Status**: ✅ RESOLVED

---

### Issue 4: Chatbot Widget in Top-Left Corner
**Problem**: Widget appearing in top-left instead of bottom-right
**Root Cause**: Convocore overriding `render: "bottom-right"` config
**Fix**: 
- Added inline CSS in `<head>` with `!important` rules
- Created `fixWidgetPosition()` JavaScript function
- Uses `setInterval` (500ms) and `MutationObserver` to continuously enforce position
- Targets multiple selectors: `.vg-widget-controls-container`, `#vg_chat_toggle`, `[class*="vg-widget"]`, etc.
**Status**: ✅ RESOLVED

---

### Issue 5: Modal Stuck in Bottom-Right Corner
**Problem**: When opened, modal appeared in bottom-right corner instead of centered
**Root Cause**: Convocore's default modal positioning
**Fix**:
- Added CSS rules for `.vg-chat-overlay-container`, `#vg-mother-container`, `.vg-chat-view-container`
- Created `fixModalPosition()` JavaScript function
- Forces: `position: fixed`, `top: 50%`, `left: 50%`, `transform: translate(-50%, -50%)`
- Sets width/height to `90vw`/`90vh` (95vw/95vh on mobile)
**Status**: ✅ RESOLVED

---

### Issue 6: Site Loads Then Goes Blank
**Problem**: Site loads for a second then goes fully blank
**Root Cause**: Overly expensive DOM queries (`querySelectorAll('*')`) in `setInterval` loops
**Fix**:
- Optimized intervals (500ms for widget, 300ms for modal)
- Made expensive checks conditional (every 10 iterations)
- Reduced logging overhead
- Added interval clearing after 30 seconds
**Status**: ✅ RESOLVED

---

### Issue 7: Chat Bubble Squished
**Problem**: Widget bubble appearing vertically compressed
**Root Cause**: Missing aspect ratio constraints
**Fix**: Added `aspect-ratio: 1 !important` and explicit `min/max-width/height` rules
**Status**: ✅ RESOLVED

---

### Issue 8: Chat Content "Super Zoomed In" ⚠️ CURRENT ISSUE
**Problem**: Modal container is correct size (90% of screen), but content inside is extremely zoomed in, showing only ~10% of the interface
**Root Cause**: Convocore's child elements use Tailwind classes `vg-w-[100vw]` and `vg-h-[100dvh]` which set width/height to 100% of viewport, not 100% of parent container. When parent is 90vw, child tries to be 100vw, causing zoom effect.

**Fixes Attempted**:

1. **CSS Overrides** (in `convocore-overrides.css`):
   ```css
   /* Override Tailwind viewport classes */
   [class*="vg-w-[100vw]"],
   [class*="w-[100vw]"],
   .vg-w-\[100vw\] {
     width: 100% !important;
     max-width: 100% !important;
   }
   
   [class*="vg-h-[100dvh]"],
   [class*="h-[100dvh]"],
   .vg-h-\[100dvh\] {
     height: 100% !important;
     max-height: 100% !important;
   }
   
   /* Target overlay root container */
   .vg-overlay-root-container,
   [class*="overlay-root-container"] {
     width: 100% !important;
     height: 100% !important;
     /* ... */
   }
   ```

2. **JavaScript Fixes** (in `index.html`):
   - Created `fixModalZoom()` function that runs every 300ms
   - Removes `scale` transforms from modal and children
   - Forces children to `width: 100%` and `height: 100%` of parent
   - Specifically targets elements with `vg-w-[100vw]` and `vg-h-[100dvh]` classes
   - Removes transform matrices that might cause zoom

3. **CSS Isolation**:
   - Added rules to reset inherited styles from site CSS
   - Ensures `box-sizing: border-box` is consistent
   - Resets `transform-origin` to prevent scaling issues

**Current Status**: ⚠️ PARTIALLY WORKING
- Modal container: ✅ Correctly sized and centered
- Widget bubble: ✅ Correctly positioned in bottom-right
- Content zoom: ⚠️ Still experiencing zoom issues, though improved

**Why Demo Works But Integration Doesn't**:
- Convocore's demo likely uses full viewport (100vw) for modal
- Our integration constrains modal to 90vw
- Convocore's internal elements are hardcoded to use viewport units
- Need to override at CSS level AND JavaScript level continuously

---

## Current Implementation Details

### JavaScript Functions

#### `fixWidgetPosition()`
- **Purpose**: Ensures widget bubble stays in bottom-right corner
- **Frequency**: Runs every 500ms, clears after 30 seconds
- **Selectors Used**: Multiple selectors to catch all widget variations
- **Also Uses**: `MutationObserver` to fix immediately when widget is added to DOM

#### `fixModalPosition()`
- **Purpose**: Centers modal and sets it to 90vw/90vh
- **Frequency**: Runs every 300ms (within `modalFixInterval`)
- **Targets**: `.vg-chat-overlay-container`, `#vg-mother-container`, `.vg-chat-view-container`
- **Also Uses**: `MutationObserver` to fix when modal opens

#### `fixModalZoom()`
- **Purpose**: Fixes zoomed content inside modal
- **Frequency**: Runs every 300ms (within `modalFixInterval`)
- **Actions**:
  - Removes `scale` transforms from modal and all children
  - Forces children to use `100%` of parent, not viewport units
  - Specifically overrides `vg-w-[100vw]` and `vg-h-[100dvh]` classes
  - Targets `.vg-overlay-root-container` specifically

### CSS Strategy

1. **Inline Styles in `<head>`**: Highest priority, applied immediately
2. **`convocore-overrides.css`**: Loaded via `VG_CONFIG.stylesheets`
3. **JavaScript Style Overrides**: Applied continuously via `setInterval` to combat Convocore's dynamic styling

### Key CSS Selectors

**Widget Positioning**:
- `.vg-widget-controls-container`
- `#vg_chat_toggle`
- `[class*="vg-widget"]`
- `[id*="vg_chat"]`

**Modal Containers**:
- `.vg-chat-overlay-container`
- `#vg-mother-container`
- `.vg-chat-view-container`

**Content Containers**:
- `.vg-overlay-root-container`
- Elements with classes containing `vg-w-[100vw]` or `vg-h-[100dvh]`

---

## Known Limitations

1. **Continuous JavaScript Fixes Required**: Convocore's internal logic continuously reapplies styles, requiring our fixes to run repeatedly
2. **Performance**: Multiple `setInterval` functions running (though optimized and cleared after 30s)
3. **CSS Specificity Wars**: Heavy reliance on `!important` to override Convocore's styles
4. **Viewport vs Container Units**: Convocore uses viewport units (vw/vh) internally, making it difficult to constrain to container size

---

## Testing Checklist

- [ ] Widget bubble appears in bottom-right corner
- [ ] Widget bubble is square (not squished)
- [ ] No proactive notifications appear
- [ ] Clicking widget opens modal centered on screen
- [ ] Modal is 90% of screen width/height (95% on mobile)
- [ ] Content inside modal is NOT zoomed in
- [ ] Full chat interface is visible
- [ ] Modal works on desktop and mobile
- [ ] No conflicts with Cal.com or Tally.so forms

---

## Potential Solutions to Try

### If Zoom Issue Persists:

1. **Check Convocore Configuration Options**:
   - Look for `containerSize`, `modalSize`, `maxWidth`, `maxHeight` options
   - Check if there's a way to set modal size as percentage vs viewport units

2. **CSS Custom Properties**:
   - Convocore might use CSS variables - check their docs
   - Override any `--vg-*` CSS variables if they exist

3. **Contact Convocore Support**:
   - Ask about container-based sizing vs viewport-based sizing
   - Request feature to set modal size relative to container, not viewport

4. **Alternative Approach**:
   - Use `transform: scale()` to shrink content if container is smaller
   - Calculate scale factor: `scale(0.9)` if modal is 90vw but content expects 100vw

5. **Shadow DOM Investigation**:
   - Check if Convocore uses Shadow DOM (would require different approach)
   - Use browser DevTools to inspect actual rendered structure

---

## Browser Testing

Tested in:
- Chrome/Edge (Chromium)
- Firefox
- Safari (if available)

Known Issues:
- Some browsers may handle `!important` differently
- Transform calculations may vary slightly

---

## Git History

- Branch: `convocore-widget`
- Key Commits:
  - Initial chatbot integration
  - Image loading fixes
  - Widget positioning fixes
  - Modal positioning fixes
  - Content zoom fixes (ongoing)

---

## Next Steps

1. **If Current Fixes Don't Work**:
   - Investigate Convocore's internal structure more deeply
   - Check if they use iframes or Shadow DOM
   - Consider using `transform: scale()` as workaround

2. **If Everything Works**:
   - Optimize performance (reduce interval frequency)
   - Remove redundant CSS rules
   - Document final working state

3. **Long-term**:
   - Consider reaching out to Convocore for better container-based sizing support
   - Or evaluate alternative chatbot solutions if issues persist

---

## Important Notes

- **Never remove the `VG_OVERLAY_CONTAINER` div** - Convocore requires it
- **Always keep `modalMode: true`** - Required for modal behavior
- **CSS must load before Convocore's bundle** - Order matters in `stylesheets` array
- **JavaScript fixes must run continuously** - Convocore reapplies styles dynamically
- **Test on live deployment** - Local dev may behave differently

---

## Contact Information

- **Convocore Agent ID**: 6BhLW2avFF69X0ydpkZ3
- **Convocore Docs**: Check their official documentation for latest API
- **Support**: May need to contact Convocore support for container-based sizing options

---

## Last Updated

**Date**: Current session
**Status**: Content zoom issue partially resolved, requires further investigation
**Next Action**: Test current fixes, if not working, try alternative approaches listed above

---

## Code Snippets Reference

### Critical CSS (must be in `convocore-overrides.css`):
```css
/* Hide proactive notifications */
.vg-proactive-notification--container { display: none !important; }

/* Widget positioning */
.vg-widget-controls-container {
  position: fixed !important;
  right: 20px !important;
  bottom: 20px !important;
}

/* Modal sizing */
.vg-chat-overlay-container {
  position: fixed !important;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%) !important;
  width: 90vw !important;
  height: 90vh !important;
}

/* Content zoom fix */
[class*="vg-w-[100vw]"] {
  width: 100% !important;
  max-width: 100% !important;
}
```

### Critical JavaScript (must be in `index.html`):
```javascript
// Must run continuously to combat Convocore's dynamic styling
var modalFixInterval = setInterval(function() {
  fixModalPosition();
  fixModalZoom();
}, 300);

// Clear after 30 seconds to prevent performance issues
setTimeout(function() {
  clearInterval(modalFixInterval);
}, 30000);
```

---

**END OF DOCUMENT**
