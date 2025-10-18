# Idle Screen Feature 🌟

## Overview
Your portfolio now includes a beautiful idle screen overlay that appears after 30 seconds of inactivity. It displays inspirational quotes with a stunning blurred background.

## Features

### ✨ Automatic Activation
- Triggers after **30 seconds** of no user activity
- Tracks: mouse movements, clicks, scrolls, keyboard input, and touch events

### 🎨 Beautiful Design
- Full-screen overlay with blurred dark background
- Animated gradient blob effects
- Smooth fade-in/fade-out animations
- Responsive design for all screen sizes

### 💬 Inspirational Quotes
**15 curated quotes** from tech leaders and innovators:
- Steve Jobs
- Martin Fowler
- Kent Beck
- And more...

### 🎮 Interactive Controls
1. **Close Button** (top-right) - Dismiss the overlay
2. **New Quote Button** - Instantly get a different random quote
3. **Continue Browsing Button** - Return to portfolio
4. **Click/Touch Anywhere** - Auto-dismiss

### 🔄 Automatic Reset
- Any user activity dismisses the screen
- Timer resets and starts counting 30 seconds again
- Seamlessly returns you to where you were

## How It Works

### Activity Detection
The screen monitors these events:
- `mousedown` - Mouse clicks
- `mousemove` - Mouse movement
- `keypress` - Keyboard input
- `scroll` - Page scrolling
- `touchstart` - Touch on mobile
- `click` - Any clicks

### Timer Logic
1. User visits the site → Timer starts (30s)
2. No activity for 30s → Idle screen appears with random quote
3. User interacts → Screen dismisses, timer resets
4. Repeat

## Customization

### Change Idle Time
Edit `src/components/IdleScreen.jsx`, line 110 & 128:
```javascript
}, 30000); // 30 seconds (in milliseconds)
```
Change `30000` to your preferred time (e.g., `60000` for 1 minute)

### Add More Quotes
Edit the `quotes` array in `src/components/IdleScreen.jsx`:
```javascript
const quotes = [
  {
    text: "Your quote here",
    author: "Author Name"
  },
  // Add more...
];
```

### Disable Feature
Remove or comment out this line in `src/App.jsx`:
```javascript
<IdleScreen />
```

## Performance
- ✅ Lightweight component
- ✅ Passive event listeners for better scrolling performance
- ✅ Proper cleanup on unmount
- ✅ No memory leaks
- ✅ Smooth animations with Framer Motion

## Browser Support
Works on all modern browsers:
- Chrome/Edge
- Firefox
- Safari
- Mobile browsers

## Accessibility
- Keyboard accessible (any key dismisses)
- Touch-friendly buttons
- Clear visual indicators
- ARIA labels for screen readers

---

Enjoy your new idle screen feature! 🎉

