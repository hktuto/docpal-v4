/**
 * useStyle composable
 * 
 * Provides dynamic theme management by updating key CSS variables in main.scss
 * This allows user-specific theme customization (colors, fonts) that persist across login
 * 
 * @example
 * ```vue
 * <script setup lang="ts">
 * const { applyTheme, getTheme, resetTheme } = useStyle()
 * 
 * // Apply user theme on login
 * const userTheme = await fetchUserTheme()
 * applyTheme(userTheme)
 * 
 * // Or update specific colors
 * updatePrimaryColor({ h: 210, s: 100, l: 50 })
 * </script>
 * ```
 */

export interface ThemeColorHSL {
  h: number  // Hue: 0-360
  s: number  // Saturation: 0-100
  l: number  // Lightness: 0-100
}

export interface ThemeConfig {
  primary?: ThemeColorHSL
  success?: ThemeColorHSL
  warning?: ThemeColorHSL
  danger?: ThemeColorHSL
  error?: ThemeColorHSL
  info?: ThemeColorHSL
  greyHue?: number
  greySaturation?: number
  customFont?: string
}

const DEFAULT_THEME: Required<ThemeConfig> = {
  primary: { h: 173, s: 82, l: 42 },
  success: { h: 212, s: 100, l: 50 },
  warning: { h: 36, s: 77, l: 57 },
  danger: { h: 0, s: 87, l: 69 },
  error: { h: 0, s: 87, l: 69 },
  info: { h: 220, s: 4, l: 58 },
  greyHue: 200,
  greySaturation: 25,
  customFont: 'Roboto',
}

const STORAGE_KEY = 'app-theme-config'  // Quick cache for fast loading
const API_STORAGE_KEY = 'app-user-theme-preference'  // Simulates API/database storage

export function useStyle() {
  if (typeof window === 'undefined') {
    // SSR: return no-op functions
    return {
      applyTheme: () => {},
      getTheme: () => DEFAULT_THEME,
      resetTheme: () => {},
      updatePrimaryColor: () => {},
      updateSuccessColor: () => {},
      updateWarningColor: () => {},
      updateDangerColor: () => {},
      updateErrorColor: () => {},
      updateInfoColor: () => {},
      updateGreyScale: () => {},
      updateFont: () => {},
      saveTheme: () => {},
      loadTheme: () => {},
    }
  }

  const root = document.documentElement

  /**
   * Set a CSS variable on the root element
   */
  function setCSSVariable(name: string, value: string | number): void {
    const varName = name.startsWith('--') ? name : `--${name}`
    root.style.setProperty(varName, String(value))
  }

  /**
   * Get a CSS variable value from the root element
   */
  function getCSSVariable(name: string): string {
    const varName = name.startsWith('--') ? name : `--${name}`
    return getComputedStyle(root).getPropertyValue(varName).trim()
  }

  /**
   * Update HSL components for a specific color type
   */
  function updateColorHSL(colorType: string, hsl: ThemeColorHSL): void {
    setCSSVariable(`app-${colorType}-h`, hsl.h)
    setCSSVariable(`app-${colorType}-s`, `${hsl.s}%`)
    setCSSVariable(`app-${colorType}-l`, `${hsl.l}%`)
  }

  /**
   * Get HSL components for a specific color type
   */
  function getColorHSL(colorType: string): ThemeColorHSL {
    const h = parseFloat(getCSSVariable(`app-${colorType}-h`)) || 0
    const s = parseFloat(getCSSVariable(`app-${colorType}-s`)) || 0
    const l = parseFloat(getCSSVariable(`app-${colorType}-l`)) || 0
    return { h, s, l }
  }

  /**
   * Update primary color
   */
  function updatePrimaryColor(hsl: ThemeColorHSL): void {
    updateColorHSL('primary', hsl)
  }

  /**
   * Update success color
   */
  function updateSuccessColor(hsl: ThemeColorHSL): void {
    updateColorHSL('success', hsl)
  }

  /**
   * Update warning color
   */
  function updateWarningColor(hsl: ThemeColorHSL): void {
    updateColorHSL('warning', hsl)
  }

  /**
   * Update danger color
   */
  function updateDangerColor(hsl: ThemeColorHSL): void {
    updateColorHSL('danger', hsl)
  }

  /**
   * Update error color
   */
  function updateErrorColor(hsl: ThemeColorHSL): void {
    updateColorHSL('error', hsl)
  }

  /**
   * Update info color
   */
  function updateInfoColor(hsl: ThemeColorHSL): void {
    updateColorHSL('info', hsl)
  }

  /**
   * Update grey scale settings
   */
  function updateGreyScale(hue: number, saturation: number): void {
    setCSSVariable('app-grey-hue', hue)
    setCSSVariable('app-grey-saturation', `${saturation}%`)
  }

  /**
   * Update custom font
   */
  function updateFont(fontFamily: string): void {
    setCSSVariable('app-custom-font', fontFamily)
  }

  /**
   * Apply a complete theme configuration
   */
  function applyTheme(config: ThemeConfig): void {
    if (config.primary) updatePrimaryColor(config.primary)
    if (config.success) updateSuccessColor(config.success)
    if (config.warning) updateWarningColor(config.warning)
    if (config.danger) updateDangerColor(config.danger)
    if (config.error) updateErrorColor(config.error)
    if (config.info) updateInfoColor(config.info)
    if (config.greyHue !== undefined && config.greySaturation !== undefined) {
      updateGreyScale(config.greyHue, config.greySaturation)
    }
    if (config.customFont) updateFont(config.customFont)
  }

  /**
   * Get current theme configuration
   */
  function getTheme(): Required<ThemeConfig> {
    return {
      primary: getColorHSL('primary'),
      success: getColorHSL('success'),
      warning: getColorHSL('warning'),
      danger: getColorHSL('danger'),
      error: getColorHSL('error'),
      info: getColorHSL('info'),
      greyHue: parseFloat(getCSSVariable('app-grey-hue')) || DEFAULT_THEME.greyHue,
      greySaturation: parseFloat(getCSSVariable('app-grey-saturation')) || DEFAULT_THEME.greySaturation,
      customFont: getCSSVariable('app-custom-font') || DEFAULT_THEME.customFont,
    }
  }

  /**
   * Reset theme to default values
   */
  function resetTheme(): void {
    applyTheme(DEFAULT_THEME)
  }

  /**
   * Save current theme to localStorage
   */
  function saveTheme(): void {
    try {
      const currentTheme = getTheme()
      localStorage.setItem(STORAGE_KEY, JSON.stringify(currentTheme))
    } catch (error) {
      console.error('Failed to save theme to localStorage:', error)
    }
  }

  /**
   * Load theme from localStorage
   */
  function loadTheme(): Required<ThemeConfig> | null {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const theme = JSON.parse(stored) as Required<ThemeConfig>
        applyTheme(theme)
        return theme
      }
    } catch (error) {
      console.error('Failed to load theme from localStorage:', error)
    }
    return null
  }

  /**
   * Clear saved theme from localStorage
   */
  function clearSavedTheme(): void {
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch (error) {
      console.error('Failed to clear saved theme:', error)
    }
  }

  // =============================================================================
  // Simulated API Methods (using localStorage for testing)
  // Replace these with actual API calls when backend is ready
  // =============================================================================

  /**
   * Simulate fetching user theme from API
   * Uses localStorage to simulate database storage
   */
  async function fetchUserThemeFromAPI(): Promise<Required<ThemeConfig> | null> {
    return new Promise((resolve) => {
      // Simulate network delay
      setTimeout(() => {
        try {
          const stored = localStorage.getItem(API_STORAGE_KEY)
          if (stored) {
            const theme = JSON.parse(stored) as Required<ThemeConfig>
            console.log('[useStyle] Loaded theme from API (localStorage):', theme)
            resolve(theme)
          } else {
            console.log('[useStyle] No theme found in API (localStorage)')
            resolve(null)
          }
        } catch (error) {
          console.error('[useStyle] Failed to fetch theme from API:', error)
          resolve(null)
        }
      }, 300) // Simulate 300ms API delay
    })
  }

  /**
   * Simulate saving user theme to API
   * Uses localStorage to simulate database storage
   */
  async function saveUserThemeToAPI(theme: ThemeConfig): Promise<boolean> {
    return new Promise((resolve) => {
      // Simulate network delay
      setTimeout(() => {
        try {
          // Convert partial theme to full theme with current values
          const fullTheme = { ...getTheme(), ...theme }
          localStorage.setItem(API_STORAGE_KEY, JSON.stringify(fullTheme))
          console.log('[useStyle] Saved theme to API (localStorage):', fullTheme)
          resolve(true)
        } catch (error) {
          console.error('[useStyle] Failed to save theme to API:', error)
          resolve(false)
        }
      }, 500) // Simulate 500ms API delay
    })
  }

  /**
   * Initialize theme on app startup
   * 1. Try to load from cache (instant)
   * 2. Fetch from API (simulated) and update if different
   */
  async function initializeTheme(): Promise<void> {
    try {
      // Step 1: Load from cache for instant application
      const cachedTheme = loadTheme()
      
      if (cachedTheme) {
        console.log('[useStyle] Applied cached theme')
      }
      
      // Step 2: Fetch from API (simulated) in background
      const apiTheme = await fetchUserThemeFromAPI()
      
      if (apiTheme) {
        // Check if API theme is different from cache
        const isDifferent = JSON.stringify(cachedTheme) !== JSON.stringify(apiTheme)
        
        if (isDifferent) {
          console.log('[useStyle] API theme differs from cache, applying API theme')
          applyTheme(apiTheme)
          saveTheme() // Update cache
        }
      }
    } catch (error) {
      console.error('[useStyle] Failed to initialize theme:', error)
    }
  }

  /**
   * Clear all theme data (cache and API storage)
   * Useful for logout or reset
   */
  function clearAllThemeData(): void {
    try {
      localStorage.removeItem(STORAGE_KEY)
      localStorage.removeItem(API_STORAGE_KEY)
      console.log('[useStyle] Cleared all theme data')
    } catch (error) {
      console.error('[useStyle] Failed to clear theme data:', error)
    }
  }

  return {
    // Apply theme
    applyTheme,
    getTheme,
    resetTheme,
    
    // Update individual colors
    updatePrimaryColor,
    updateSuccessColor,
    updateWarningColor,
    updateDangerColor,
    updateErrorColor,
    updateInfoColor,
    
    // Update grey scale and font
    updateGreyScale,
    updateFont,
    
    // Local persistence (cache)
    saveTheme,
    loadTheme,
    clearSavedTheme,
    
    // Simulated API methods (localStorage-based for testing)
    fetchUserThemeFromAPI,
    saveUserThemeToAPI,
    initializeTheme,
    clearAllThemeData,
    
    // Low-level access
    setCSSVariable,
    getCSSVariable,
  }
}
