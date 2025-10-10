# Theme Editor Component

A comprehensive theme editor component that allows users to customize the application theme using Element Plus color pickers.

## Features

- ✅ **Visual Color Editing**: Use Element Plus color picker with predefined color suggestions
- ✅ **Live Preview**: Toggle real-time preview of changes
- ✅ **Complete Theme Control**: Edit all theme colors (primary, success, warning, danger, error, info)
- ✅ **Grey Scale Customization**: Adjust hue and saturation with sliders
- ✅ **Font Selection**: Choose from popular font families
- ✅ **Color Preview**: Visual preview of current theme colors
- ✅ **Sample UI Elements**: See how buttons look with current theme
- ✅ **Reset to Default**: Restore original theme with confirmation
- ✅ **Hex/HSL Conversion**: Automatic conversion between color formats

## Usage

### Basic Usage

```vue
<script setup lang="ts">
import ThemeEditor from '@base/components/app/theme/editor.vue'
</script>

<template>
  <div>
    <h1>Customize Your Theme</h1>
    <ThemeEditor />
  </div>
</template>
```

### In a Settings Page

```vue
<!-- pages/settings/theme.vue -->
<script setup lang="ts">
import ThemeEditor from '@base/components/app/theme/editor.vue'

definePageMeta({
  title: 'Theme Settings',
  requiresAuth: true
})
</script>

<template>
  <div class="settings-page">
    <div class="settings-header">
      <h1>Theme Settings</h1>
      <p>Personalize your application appearance</p>
    </div>
    
    <ThemeEditor />
  </div>
</template>

<style scoped lang="scss">
.settings-page {
  padding: var(--app-space-l);
}

.settings-header {
  margin-bottom: var(--app-space-l);
  
  h1 {
    margin: 0 0 var(--app-space-xs) 0;
  }
  
  p {
    margin: 0;
    color: var(--app-text-color-secondary);
  }
}
</style>
```

### In a Modal/Dialog

```vue
<script setup lang="ts">
import { ref } from 'vue'
import ThemeEditor from '@base/components/app/theme/editor.vue'

const dialogVisible = ref(false)

function openThemeEditor() {
  dialogVisible.value = true
}
</script>

<template>
  <div>
    <el-button @click="openThemeEditor">
      Customize Theme
    </el-button>
    
    <el-dialog
      v-model="dialogVisible"
      title="Theme Editor"
      width="90%"
      :close-on-click-modal="false"
    >
      <ThemeEditor />
    </el-dialog>
  </div>
</template>
```

## Component Structure

### Props
The component has no props - it's self-contained.

### Emits
The component doesn't emit events. Theme changes are applied directly through the `useStyle` composable.

### State Management

The component manages its own state:
- Color values (hex format for color pickers)
- Grey scale settings (hue and saturation)
- Font selection
- Preview mode toggle
- Loading/saving states

## Features Breakdown

### 1. Live Preview Mode

Toggle between instant preview and manual preview:
- **On**: Changes apply immediately as you adjust colors
- **Off**: Changes only apply when you click "Preview Changes" or "Save Theme"

### 2. Color Pickers

Each color has:
- Element Plus color picker with alpha channel support
- Predefined color suggestions
- Hex color code display
- Visual color preview swatch

### 3. Grey Scale Adjustment

Fine-tune the grey tones throughout the app:
- **Hue Slider**: Adjust the color tint (0-360°)
  - 0° = Red tint
  - 120° = Green tint
  - 240° = Blue tint
- **Saturation Slider**: Control color intensity (0-100%)
  - 0% = Pure grey (no color)
  - 100% = Full color saturation

### 4. Font Selection

Choose from popular web-safe fonts:
- Roboto (default)
- Inter
- Open Sans
- Lato
- Poppins
- Montserrat
- Source Sans Pro
- Noto Sans

### 5. Preview Section

Shows:
- Color swatches with current theme colors
- Sample buttons demonstrating the theme

### 6. Actions

- **Save Theme**: Saves to localStorage and API (TODO: implement API call)
- **Reset to Default**: Restores original theme colors
- **Preview Changes**: Applies changes without saving (when live preview is off)

## Color Format Conversion

The component automatically converts between:
- **Hex** (used by Element Plus color picker): `#15d5b9`
- **HSL** (used by the CSS system): `{ h: 173, s: 82, l: 42 }`

This conversion happens automatically when:
- Loading the current theme
- Changing colors in the picker
- Saving the theme

## Integration with API

To save themes to your backend, update the `handleSave` function:

```typescript
// In editor.vue, line ~178
async function handleSave() {
  try {
    isSaving.value = true
    
    // Apply theme
    applyTheme(currentTheme.value)
    
    // Save to localStorage
    saveTheme()
    
    // Save to API
    await clientApi.user.updateUserTheme({ 
      theme: currentTheme.value 
    })
    
    ElMessage.success('Theme saved successfully')
  } catch (error) {
    console.error('Failed to save theme:', error)
    ElMessage.error('Failed to save theme')
  } finally {
    isSaving.value = false
  }
}
```

## Customization

### Adding More Fonts

Edit the `fontOptions` array:

```typescript
const fontOptions = [
  { label: 'Roboto', value: 'Roboto' },
  { label: 'Your Custom Font', value: 'Your Custom Font' },
  // Add more fonts...
]
```

Make sure the fonts are loaded in your app.

### Changing Predefined Colors

Edit the `:predefine` prop on color pickers:

```vue
<el-color-picker
  v-model="primaryColorHex"
  :predefine="['#15d5b9', '#yourColor1', '#yourColor2']"
  @change="handleColorChange('primary', primaryColorHex)"
/>
```

### Styling

The component uses CSS variables for styling. Override these in your parent component:

```scss
:deep(.theme-editor) {
  --app-space-l: 2rem;
  max-width: 1000px; // Make it wider
}
```

## Troubleshooting

### Colors not updating?
- Check if preview mode is enabled
- Ensure the `useStyle` composable is properly imported
- Verify CSS variables exist in `main.scss`

### Font not applying?
- Make sure the font is loaded in your app
- Check if the font name matches exactly
- Import the font in your main CSS or via CDN

### Theme not persisting?
- Implement the API save endpoint
- Check localStorage permissions
- Verify the `saveTheme()` function is called

## Example: Adding to Admin Menu

```vue
<!-- packages/base/components/app/menu/index.vue -->
<script setup lang="ts">
// Add to menu items
const menuItems = [
  // ... other items
  {
    label: 'Theme Settings',
    icon: 'Brush',
    route: '/settings/theme'
  }
]
</script>
```

## Accessibility

The component includes:
- Keyboard navigation support (via Element Plus)
- Clear labels for all inputs
- Help text for sliders
- Confirmation dialog for destructive actions (reset)

## Performance

- Lightweight: Only renders what's needed
- Efficient updates: Changes applied via CSS variables (no re-render)
- Debounced updates: Can be added for slider changes if needed

## Browser Support

Supports all modern browsers that support:
- CSS Custom Properties (CSS Variables)
- Element Plus
- Vue 3

