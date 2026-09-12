# Theme Context Implementation

## Overview
A day/night theme system has been implemented for ComplainBox using React Context and localStorage persistence. The theme automatically respects the user's system preferences and persists across sessions.

## Files Created/Modified

### 1. **Theme Context** (`src/context/theme.jsx`)
- `ThemeProvider` - Wraps the entire app to provide theme state
- `useTheme()` - Hook to access theme state and toggle function
- Features:
  - Persists theme choice to localStorage
  - Respects system color scheme preference on first load
  - Adds/removes `dark` class to HTML element

### 2. **Theme Toggle Component** (`src/components/ThemeToggle.jsx`)
- Simple button component with Sun/Moon icons
- Shows moon icon in dark mode, sun icon in light mode
- Ready to add to your navbar

### 3. **Updated App.jsx** (`src/App.jsx`)
- Wrapped entire app with `ThemeProvider`
- ThemeProvider wraps AuthProvider to ensure theme loads before auth

### 4. **Updated Styles** (`src/index.css`)
- Added light mode styles for HTML and body
- Light/dark scrollbar styling
- Conditional styles based on `.dark` class

## Usage

### 1. Basic Usage - Access Theme State
```jsx
import { useTheme } from './context/theme'

function MyComponent() {
  const { isDark, toggleTheme } = useTheme()
  
  return (
    <div>
      <p>Current theme: {isDark ? 'Dark' : 'Light'}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  )
}
```

### 2. Add Theme Toggle to Navbar
In your `src/Layout/Navbar.jsx`:

```jsx
import { ThemeToggle } from '../components/ThemeToggle'

export default function Navbar() {
  return (
    <nav>
      {/* Your existing navbar content */}
      
      {/* Add theme toggle button */}
      <ThemeToggle />
    </nav>
  )
}
```

### 3. Using Tailwind Dark Mode Classes
Since the theme adds a `dark` class to the HTML element, you can use Tailwind's dark mode utilities:

```jsx
// Background colors
<div className="bg-white dark:bg-slate-950">
  {/* White in light mode, dark slate in dark mode */}
</div>

// Text colors
<p className="text-slate-900 dark:text-slate-100">
  {/* Dark text in light mode, light text in dark mode */}
</p>

// Conditional styling
<button className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-900 dark:hover:bg-blue-800">
  {/* Different colors for each theme */}
</button>
```

## How It Works

1. **On App Load:**
   - ThemeProvider checks localStorage for saved theme
   - If not found, checks system preference via `prefers-color-scheme`
   - Defaults to dark mode if system preference unavailable

2. **When Theme Toggles:**
   - `isDark` state updates
   - `dark` class added/removed from `<html>` element
   - Theme preference saved to localStorage

3. **Tailwind Integration:**
   - Tailwind's dark mode works with the `.dark` class on the root element
   - All existing dark: utilities will work automatically

## Styling Guide

### Light Mode Colors (default)
- Background: `#FFFFFF`
- Text: `#1F2937`
- Use: `bg-white text-gray-900`

### Dark Mode Colors (when `.dark` class present)
- Background: `#080C14`
- Text: `#F1F5F9`
- Use: `dark:bg-slate-950 dark:text-slate-100`

## Example: Full Themed Component

```jsx
import { useTheme } from '../context/theme'

export default function Card() {
  const { isDark } = useTheme()
  
  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg shadow-lg p-6">
      <h2 className="text-gray-900 dark:text-white font-bold">
        My Card Title
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mt-2">
        Card content here
      </p>
      <button className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 dark:bg-blue-900 dark:hover:bg-blue-800 text-white rounded">
        Action Button
      </button>
    </div>
  )
}
```

## Next Steps

1. Add `<ThemeToggle />` to your Navbar component
2. Update existing components to use Tailwind dark mode utilities
3. Test theme switching functionality
4. Ensure all pages have proper light/dark styling

## Notes

- Theme choice persists across browser sessions via localStorage
- System preference is only checked on first load
- The `dark` class is applied to the `<html>` element for Tailwind compatibility
- No additional dependencies required beyond what's already installed
