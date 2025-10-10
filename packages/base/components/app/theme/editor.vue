<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Check, RefreshLeft, View } from '@element-plus/icons-vue'
import { useStyle, type ThemeConfig, type ThemeColorHSL } from '../../../composables/useStyle'

const { getTheme, applyTheme, resetTheme, saveTheme, updatePrimaryColor, updateSuccessColor, updateWarningColor, updateDangerColor, updateErrorColor, updateInfoColor, updateGreyScale, updateFont, saveUserThemeToAPI } = useStyle()

// dialog state
const opened = ref(false)
function open() {
  opened.value = true
}
function close() {
  opened.value = false
}
defineExpose({ open, close })
// end dialog state

// State
const currentTheme = ref<ThemeConfig>({})
const isLoading = ref(false)
const isSaving = ref(false)


// Color pickers work with HSL format directly
const primaryColorHSL = ref('hsl(173, 82%, 42%)')
const successColorHSL = ref('hsl(212, 100%, 50%)')
const warningColorHSL = ref('hsl(36, 77%, 57%)')
const dangerColorHSL = ref('hsl(0, 87%, 69%)')
const errorColorHSL = ref('hsl(0, 87%, 69%)')
const infoColorHSL = ref('hsl(220, 4%, 58%)')

// Grey scale settings
const greyHue = ref(200)
const greySaturation = ref(25)

// Font options
const fontOptions = [
  { label: 'Roboto', value: 'Roboto' },
  { label: 'Inter', value: 'Inter' },
  { label: 'Open Sans', value: 'Open Sans' },
  { label: 'Lato', value: 'Lato' },
  { label: 'Poppins', value: 'Poppins' },
  { label: 'Montserrat', value: 'Montserrat' },
  { label: 'Source Sans Pro', value: 'Source Sans Pro' },
  { label: 'Noto Sans', value: 'Noto Sans' },
]
const selectedFont = ref('Roboto')

// Utility: Convert HSL object to HSL string
function hslToString(hsl: ThemeColorHSL): string {
  return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`
}

// Utility: Parse HSL string to HSL object
function parseHSLString(hslString: string): ThemeColorHSL {
  // Match patterns like: hsl(173, 82%, 42%) or hsla(173, 82%, 42%, 1)
  const match = hslString.match(/hsla?\((\d+),\s*(\d+)%,\s*(\d+)%/)
  if (!match) return { h: 0, s: 0, l: 0 }
  
  return {
    h: parseInt(match[1]),
    s: parseInt(match[2]),
    l: parseInt(match[3])
  }
}

// Load current theme
function loadCurrentTheme() {
  isLoading.value = true
  try {
    const theme = getTheme()
    currentTheme.value = theme

    // Convert HSL objects to HSL strings for color pickers
    if (theme.primary) {
      primaryColorHSL.value = hslToString(theme.primary)
    }
    if (theme.success) {
      successColorHSL.value = hslToString(theme.success)
    }
    if (theme.warning) {
      warningColorHSL.value = hslToString(theme.warning)
    }
    if (theme.danger) {
      dangerColorHSL.value = hslToString(theme.danger)
    }
    if (theme.error) {
      errorColorHSL.value = hslToString(theme.error)
    }
    if (theme.info) {
      infoColorHSL.value = hslToString(theme.info)
    }

    greyHue.value = theme.greyHue || 200
    greySaturation.value = theme.greySaturation || 25
    selectedFont.value = theme.customFont || 'Roboto'
  } catch (error) {
    console.error('Failed to load theme:', error)
    ElMessage.error('Failed to load current theme')
  } finally {
    isLoading.value = false
  }
}

// Handle color change - apply immediately (live preview)
function handleColorChange(colorType: 'primary' | 'success' | 'warning' | 'danger' | 'error' | 'info', hslString: string) {
  if (!hslString) return
  
  const hsl = parseHSLString(hslString)
  
  // Update current theme
  currentTheme.value[colorType] = hsl
  
  // Apply immediately (live preview)
  switch (colorType) {
    case 'primary': updatePrimaryColor(hsl); break
    case 'success': updateSuccessColor(hsl); break
    case 'warning': updateWarningColor(hsl); break
    case 'danger': updateDangerColor(hsl); break
    case 'error': updateErrorColor(hsl); break
    case 'info': updateInfoColor(hsl); break
  }
}

// Handle grey scale change - apply immediately (live preview)
function handleGreyScaleChange() {
  currentTheme.value.greyHue = greyHue.value
  currentTheme.value.greySaturation = greySaturation.value
  
  // Apply immediately (live preview)
  updateGreyScale(greyHue.value, greySaturation.value)
}

// Handle font change - apply immediately (live preview)
function handleFontChange() {
  currentTheme.value.customFont = selectedFont.value
  
  // Apply immediately (live preview)
  updateFont(selectedFont.value)
}

// Submit - Save theme and close dialog
async function handleSubmit() {
  try {
    isSaving.value = true
    
    // Apply theme
    applyTheme(currentTheme.value)
    
    // Save to localStorage cache
    saveTheme()
    
    // Save to "API" (simulated with localStorage)
    // When backend is ready, replace with: await clientApi.user.updateUserTheme({ theme: currentTheme.value })
    if (typeof saveUserThemeToAPI === 'function') {
      const success = await saveUserThemeToAPI(currentTheme.value)
      
      if (success) {
        ElMessage.success('Theme saved successfully')
        close() // Close dialog on success
      } else {
        ElMessage.warning('Theme applied locally but failed to save to server')
      }
    } else {
      ElMessage.success('Theme saved locally')
      close() // Close dialog on success
    }
  } catch (error) {
    console.error('Failed to save theme:', error)
    ElMessage.error('Failed to save theme')
  } finally {
    isSaving.value = false
  }
}

// Save theme without closing dialog
async function handleSave() {
  try {
    isSaving.value = true
    
    // Apply theme
    applyTheme(currentTheme.value)
    
    // Save to localStorage cache
    saveTheme()
    
    // Save to "API" (simulated with localStorage)
    if (typeof saveUserThemeToAPI === 'function') {
      const success = await saveUserThemeToAPI(currentTheme.value)
      
      if (success) {
        ElMessage.success('Theme saved successfully')
      } else {
        ElMessage.warning('Theme applied locally but failed to save to server')
      }
    } else {
      ElMessage.success('Theme saved locally')
    }
  } catch (error) {
    console.error('Failed to save theme:', error)
    ElMessage.error('Failed to save theme')
  } finally {
    isSaving.value = false
  }
}

// Reset to default
async function handleReset() {
  try {
    await ElMessageBox.confirm(
      'This will reset all theme settings to default. Continue?',
      'Reset Theme',
      {
        confirmButtonText: 'Reset',
        cancelButtonText: 'Cancel',
        type: 'warning',
      }
    )
    
    resetTheme()
    loadCurrentTheme()
    ElMessage.success('Theme reset to default')
  } catch {
    // User cancelled
  }
}

// Initialize
onMounted(() => {
  loadCurrentTheme()
})
</script>

<template>
  <ElDialog 
    v-model="opened" 
    :modal="false" 
    append-to-body
  >
    <div class="theme-editor">
    <div class="theme-editor__header">
      <h2 class="theme-editor__title">Theme Editor</h2>
      <p class="theme-editor__description">
        Customize your application theme. Changes are previewed in real-time.
      </p>
    </div>

    <el-form
      v-loading="isLoading"
      class="theme-editor__form"
      label-position="top"
    >
      <div class="theme-editor__live-preview-notice">
        <el-icon color="var(--app-success-color)"><View /></el-icon>
        <span>Live Preview: Changes apply immediately as you adjust colors</span>
      </div>

      <el-divider content-position="left">
        Theme Colors
      </el-divider>

      <!-- Primary Color -->
      <el-form-item label="Primary Color">
        <div class="theme-editor__color-item">
          <el-color-picker
            v-model="primaryColorHSL"
            color-format="hsl"
            :predefine="[
              'hsl(173, 82%, 42%)',
              'hsl(212, 100%, 50%)',
              'hsl(120, 100%, 40%)',
              'hsl(36, 77%, 57%)',
              'hsl(0, 87%, 69%)'
            ]"
            @change="handleColorChange('primary', primaryColorHSL)"
          />
          <span class="theme-editor__color-label">{{ primaryColorHSL }}</span>
          <div class="theme-editor__color-preview" :style="{ backgroundColor: primaryColorHSL }" />
        </div>
      </el-form-item>

      <!-- Success Color -->
      <el-form-item label="Success Color">
        <div class="theme-editor__color-item">
          <el-color-picker
            v-model="successColorHSL"
            color-format="hsl"
            :predefine="[
              'hsl(212, 100%, 50%)',
              'hsl(145, 80%, 42%)',
              'hsl(168, 76%, 42%)',
              'hsl(187, 100%, 50%)'
            ]"
            @change="handleColorChange('success', successColorHSL)"
          />
          <span class="theme-editor__color-label">{{ successColorHSL }}</span>
          <div class="theme-editor__color-preview" :style="{ backgroundColor: successColorHSL }" />
        </div>
      </el-form-item>

      <!-- Warning Color -->
      <el-form-item label="Warning Color">
        <div class="theme-editor__color-item">
          <el-color-picker
            v-model="warningColorHSL"
            color-format="hsl"
            :predefine="[
              'hsl(36, 77%, 57%)',
              'hsl(38, 92%, 50%)',
              'hsl(25, 95%, 53%)',
              'hsl(45, 93%, 47%)'
            ]"
            @change="handleColorChange('warning', warningColorHSL)"
          />
          <span class="theme-editor__color-label">{{ warningColorHSL }}</span>
          <div class="theme-editor__color-preview" :style="{ backgroundColor: warningColorHSL }" />
        </div>
      </el-form-item>

      <!-- Danger Color -->
      <el-form-item label="Danger Color">
        <div class="theme-editor__color-item">
          <el-color-picker
            v-model="dangerColorHSL"
            color-format="hsl"
            :predefine="[
              'hsl(0, 87%, 69%)',
              'hsl(0, 91%, 71%)',
              'hsl(0, 72%, 51%)',
              'hsl(0, 63%, 31%)'
            ]"
            @change="handleColorChange('danger', dangerColorHSL)"
          />
          <span class="theme-editor__color-label">{{ dangerColorHSL }}</span>
          <div class="theme-editor__color-preview" :style="{ backgroundColor: dangerColorHSL }" />
        </div>
      </el-form-item>

      <!-- Info Color -->
      <el-form-item label="Info Color">
        <div class="theme-editor__color-item">
          <el-color-picker
            v-model="infoColorHSL"
            color-format="hsl"
            :predefine="[
              'hsl(220, 4%, 58%)',
              'hsl(220, 9%, 46%)',
              'hsl(215, 16%, 47%)',
              'hsl(215, 14%, 34%)'
            ]"
            @change="handleColorChange('info', infoColorHSL)"
          />
          <span class="theme-editor__color-label">{{ infoColorHSL }}</span>
          <div class="theme-editor__color-preview" :style="{ backgroundColor: infoColorHSL }" />
        </div>
      </el-form-item>

      <el-divider content-position="left">
        Grey Scale
      </el-divider>

      <!-- Grey Hue -->
      <el-form-item label="Grey Hue">
        <div class="theme-editor__slider-item">
          <el-slider
            v-model="greyHue"
            :min="0"
            :max="360"
            :step="1"
            show-input
            @change="handleGreyScaleChange"
          />
          <span class="theme-editor__help-text">
            Adjust the color tint of grey tones (0-360°)
          </span>
        </div>
      </el-form-item>

      <!-- Grey Saturation -->
      <el-form-item label="Grey Saturation">
        <div class="theme-editor__slider-item">
          <el-slider
            v-model="greySaturation"
            :min="0"
            :max="100"
            :step="1"
            show-input
            @change="handleGreyScaleChange"
          />
          <span class="theme-editor__help-text">
            Adjust the color intensity of grey tones (0-100%)
          </span>
        </div>
      </el-form-item>

      <el-divider content-position="left">
        Typography
      </el-divider>

      <!-- Font Family -->
      <el-form-item label="Font Family">
        <el-select
          v-model="selectedFont"
          placeholder="Select font"
          style="width: 100%"
          @change="handleFontChange"
        >
          <el-option
            v-for="font in fontOptions"
            :key="font.value"
            :label="font.label"
            :value="font.value"
            :style="{ fontFamily: font.value }"
          >
            <span :style="{ fontFamily: font.value }">{{ font.label }}</span>
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    </div>

    <!-- Dialog Footer with Submit and Reset Buttons -->
    <template #footer>
      <div class="dialog-footer">
        <div class="dialog-footer__left">
          <el-button
            @click="handleReset"
          >
            <el-icon><RefreshLeft /></el-icon>
            Reset to Default
          </el-button>
        </div>
        <div class="dialog-footer__right">
          <el-button
            @click="close"
          >
            Cancel
          </el-button>
          <el-button
            type="primary"
            :loading="isSaving"
            @click="handleSubmit"
          >
            <el-icon v-if="!isSaving"><Check /></el-icon>
            {{ isSaving ? 'Saving...' : 'Save & Close' }}
          </el-button>
        </div>
      </div>
    </template>
  </ElDialog>
</template>

<style scoped lang="scss">
.theme-editor {
  max-width: 800px;
  margin: 0 auto;
  padding: var(--app-space-l);

  &__header {
    margin-bottom: var(--app-space-l);
  }

  &__title {
    font-size: var(--app-font-size-xl);
    font-weight: 600;
    color: var(--app-text-color-primary);
    margin: 0 0 var(--app-space-xs) 0;
  }

  &__description {
    font-size: var(--app-font-size-m);
    color: var(--app-text-color-secondary);
    margin: 0;
  }

  &__live-preview-notice {
    display: flex;
    align-items: center;
    gap: var(--app-space-xs);
    padding: var(--app-space-s);
    background: var(--app-success-alpha-10);
    border-radius: var(--app-border-radius-s);
    border: 1px solid var(--app-success-alpha-30);
    color: var(--app-text-color-regular);
    font-size: var(--app-font-size-s);
    margin-bottom: var(--app-space-m);
  }

  &__form {
    background: var(--app-bg-color);
    padding: var(--app-space-l);
    border-radius: var(--app-border-radius-m);
    border: 1px solid var(--app-border-color-light);
  }

  &__color-item {
    display: flex;
    align-items: center;
    gap: var(--app-space-m);
  }

  &__color-label {
    font-family: monospace;
    font-size: var(--app-font-size-s);
    color: var(--app-text-color-secondary);
    min-width: 80px;
  }

  &__color-preview {
    width: 40px;
    height: 40px;
    border-radius: var(--app-border-radius-s);
    border: 2px solid var(--app-border-color);
    margin-left: auto;
  }

  &__slider-item {
    width: 100%;
  }

  &__help-text {
    display: block;
    font-size: var(--app-font-size-xs);
    color: var(--app-text-color-placeholder);
    margin-top: var(--app-space-xxs);
  }
}

.dialog-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  &__left {
    display: flex;
    gap: var(--app-space-s);
  }

  &__right {
    display: flex;
    gap: var(--app-space-s);
  }
}
</style>

