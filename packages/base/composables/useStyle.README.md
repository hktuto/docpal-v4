# useStyle Composable - Dynamic Theme Management

## Overview
The `useStyle` composable provides dynamic theme management by updating key CSS variables defined in `main.scss`. This allows for user-specific theme customization (colors, fonts) that can be applied on login and persisted across sessions.

## Key Features
- ✅ **Dynamic Color Updates**: Change primary, success, warning, danger, error, and info colors
- ✅ **Grey Scale Customization**: Adjust grey hue and saturation for the entire color system
- ✅ **Custom Font**: Set user-specific font preferences
- ✅ **HSL-Based System**: Leverages the existing HSL color system with automatic variant generation
- ✅ **LocalStorage Persistence**: Cache theme for fast loading
- ✅ **SSR Compatible**: Safe to use in Nuxt 3 with server-side rendering

## Theme Configuration

### ThemeConfig Interface
```typescript
interface ThemeConfig {
  primary?: { h: number, s: number, l: number }     // HSL values
  success?: { h: number, s: number, l: number }
  warning?: { h: number, s: number, l: number }
  danger?: { h: number, s: number, l: number }
  error?: { h: number, s: number, l: number }
  info?: { h: number, s: number, l: number }
  greyHue?: number              // 0-360
  greySaturation?: number       // 0-100
  customFont?: string           // Font family name
}
```

### HSL Color Values
- **Hue (h)**: 0-360
  - Red: 0°
  - Orange: 30°
  - Yellow: 60°
  - Green: 120°
  - Cyan: 180°
  - Blue: 240°
  - Purple: 270°
  
- **Saturation (s)**: 0-100
  - 0: Grayscale
  - 100: Full color
  
- **Lightness (l)**: 0-100
  - 0: Black
  - 50: Normal
  - 100: White

## Integration with Authentication

### Step 1: Add to `useAuth.ts` or `verifly()`

```typescript
// packages/authApp/composables/useAuth.ts

import { useStyle } from '@base/composables/useStyle'

export async function verifly() {
  const { loadTheme, applyTheme } = useStyle()
  const logedIn = useLoginState()
  const isDesktopMode = useDesktopMode()
  
  // Load existing theme from cache first (instant)
  const cachedTheme = loadTheme()
  
  // Fetch user data and theme in parallel
  await Promise.all([
    getUser(),
    getFeature(),
    getUserPreference(),
    getOCRSetting(),
    loadUserTheme(cachedTheme) // Load theme if not cached
  ])
  
  isDesktopMode.value = !(!window || !window.navigator || ...)
  logedIn.value = true
  
  // ... rest of your logic
}

async function loadUserTheme(cachedTheme: any) {
  if (!cachedTheme) {
    const { applyTheme, saveTheme } = useStyle()
    
    try {
      // Fetch from your API
      const userTheme = await clientApi.user.getUserTheme()
      
      if (userTheme?.data) {
        applyTheme(userTheme.data)
        saveTheme() // Cache for next time
      }
    } catch (error) {
      console.warn('Failed to load user theme:', error)
    }
  }
}
```

### Step 2: Reset Theme on Logout

```typescript
export async function logout() {
  const { resetTheme, clearSavedTheme } = useStyle()
  
  // Clear theme
  clearSavedTheme()
  resetTheme()
  
  // ... your existing logout logic
}
```

### Step 3: Create Theme Settings Page (Optional)

```vue
<!-- pages/settings/theme.vue -->
<script setup lang="ts">
import { useStyle } from '@base/composables/useStyle'

const { getTheme, updatePrimaryColor, saveTheme } = useStyle()
const currentTheme = ref(getTheme())

async function handleSaveTheme() {
  // Apply theme
  applyTheme(currentTheme.value)
  
  // Save locally
  saveTheme()
  
  // Save to API
  await clientApi.user.updateUserTheme({
    theme: currentTheme.value
  })
  
  ElMessage.success('Theme saved successfully')
}

function handlePreview(color: string) {
  // Convert hex to HSL and preview
  const hsl = hexToHSL(color)
  updatePrimaryColor(hsl)
}
</script>

<template>
  <div class="theme-editor">
    <h2>Customize Your Theme</h2>
    
    <el-form :model="currentTheme">
      <el-form-item label="Primary Color">
        <el-color-picker 
          v-model="primaryColorHex"
          @change="handlePreview"
        />
      </el-form-item>
      
      <el-form-item label="Custom Font">
        <el-select v-model="currentTheme.customFont">
          <el-option label="Roboto" value="Roboto" />
          <el-option label="Inter" value="Inter" />
          <el-option label="Open Sans" value="Open Sans" />
        </el-select>
      </el-form-item>
      
      <el-button type="primary" @click="handleSaveTheme">
        Save Theme
      </el-button>
    </el-form>
  </div>
</template>
```

## API Methods

### Theme Management
- `applyTheme(config)` - Apply a complete theme configuration
- `getTheme()` - Get current theme configuration
- `resetTheme()` - Reset to default theme

### Color Updates
- `updatePrimaryColor(hsl)` - Update primary color
- `updateSuccessColor(hsl)` - Update success color
- `updateWarningColor(hsl)` - Update warning color
- `updateDangerColor(hsl)` - Update danger color
- `updateErrorColor(hsl)` - Update error color
- `updateInfoColor(hsl)` - Update info color

### Other Settings
- `updateGreyScale(hue, saturation)` - Update grey scale
- `updateFont(fontFamily)` - Update custom font

### Persistence
- `saveTheme()` - Save current theme to localStorage
- `loadTheme()` - Load theme from localStorage
- `clearSavedTheme()` - Clear saved theme

### Low-Level Access
- `setCSSVariable(name, value)` - Set any CSS variable
- `getCSSVariable(name)` - Get any CSS variable value

## Backend API Integration

You'll need to add these API endpoints:

### GET `/api/user/theme`
Returns the user's theme configuration
```json
{
  "data": {
    "primary": { "h": 210, "s": 100, "l": 50 },
    "success": { "h": 120, "s": 100, "l": 40 },
    "greyHue": 220,
    "greySaturation": 20,
    "customFont": "Inter"
  }
}
```

### PUT `/api/user/theme`
Saves the user's theme configuration
```json
{
  "theme": {
    "primary": { "h": 210, "s": 100, "l": 50 },
    "customFont": "Inter"
  }
}
```

## Examples

### Example 1: Apply Company Branding
```typescript
const { applyTheme } = useStyle()

// Apply company colors
applyTheme({
  primary: { h: 210, s: 100, l: 50 },    // Company blue
  success: { h: 145, s: 80, l: 42 },     // Company green
  customFont: 'Corporate Font'
})
```

### Example 2: Dark Mode Toggle
```typescript
const { updateGreyScale } = useStyle()

function toggleDarkMode(isDark: boolean) {
  if (isDark) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
    updateGreyScale(200, 25)
  }
}
```

### Example 3: Accessibility - High Contrast
```typescript
const { applyTheme } = useStyle()

function enableHighContrast() {
  applyTheme({
    primary: { h: 210, s: 100, l: 30 },     // Darker blue
    greySaturation: 0,                       // Pure grayscale
  })
}
```

## Testing

```typescript
import { describe, it, expect } from 'vitest'
import { useStyle } from './useStyle'

describe('useStyle', () => {
  it('should apply primary color', () => {
    const { updatePrimaryColor, getTheme } = useStyle()
    
    updatePrimaryColor({ h: 210, s: 100, l: 50 })
    
    const theme = getTheme()
    expect(theme.primary.h).toBe(210)
  })
  
  it('should save and load theme', () => {
    const { applyTheme, saveTheme, loadTheme } = useStyle()
    
    const testTheme = {
      primary: { h: 180, s: 80, l: 45 }
    }
    
    applyTheme(testTheme)
    saveTheme()
    
    const loaded = loadTheme()
    expect(loaded?.primary.h).toBe(180)
  })
})
```

## Performance Tips

1. **Cache First**: Always try to load from localStorage first
2. **Parallel Loading**: Load theme alongside other user data
3. **Debounce Updates**: If allowing live preview, debounce color updates
4. **Lazy API Calls**: Only save to API when user explicitly saves

## Troubleshooting

### Theme not applying?
- Check if CSS variables exist in `main.scss`
- Ensure the code runs client-side (not during SSR)
- Verify localStorage is accessible

### Colors look wrong?
- Check HSL values are in correct ranges (h: 0-360, s: 0-100, l: 0-100)
- Remember: the CSS system automatically generates color variants

### Font not changing?
- Ensure font is loaded (add to font imports)
- Check `--app-font-family` variable updates properly

## Next Steps

1. Add theme API endpoints to your backend
2. Integrate `loadTheme()` into your `verifly()` function
3. (Optional) Create a theme settings page for users
4. (Optional) Add preset themes (e.g., "Ocean", "Forest", "Sunset")

