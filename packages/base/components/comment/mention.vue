<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'

interface MentionOption {
  label: string
  value: string | number
}

interface Props {
  modelValue: string
  options: MentionOption[]
  trigger?: string
  placeholder?: string
  disabled?: boolean
  loading?: boolean
  maxHeight?: string
  rows?: number
}

interface Emits {
  (e: 'update:modelValue', value: string): void
  (e: 'mention', item: MentionOption): void
  (e: 'search', query: string): void
}

const props = withDefaults(defineProps<Props>(), {
  trigger: '@',
  placeholder: '',
  disabled: false,
  loading: false,
  maxHeight: '200px',
  rows: 3,
})

const emit = defineEmits<Emits>()

// State
const inputRef = ref<HTMLTextAreaElement>()
const dropdownRef = ref<HTMLDivElement>()
const displayValue = ref('')
const actualValue = ref('')
const showDropdown = ref(false)
const selectedIndex = ref(0)
const dropdownPosition = ref({ top: 0, left: 0 })
const currentMentionStart = ref(-1)
const searchText = ref('')

// Computed
const mentionedValues = computed(() => {
  const mentioned = new Set<string | number>()
  // Extract all mentioned values from actualValue using regex
  const regex = /@\{([^}]+)\}/g
  const matches = actualValue.value.matchAll(regex)
  for (const match of matches) {
    mentioned.add(match[1])
  }
  return mentioned
})

const filteredOptions = computed(() => {
  // Filter out already mentioned users
  let availableOptions = props.options.filter(option => 
    !mentionedValues.value.has(String(option.value))
  )
  
  // Apply search filter
  if (searchText.value) {
    availableOptions = availableOptions.filter(option =>
      option.label.toLowerCase().includes(searchText.value.toLowerCase())
    )
  }
  
  return availableOptions
})

// Map to store label-value pairs for mentions
const mentionMap = new Map<string, string>()

// Initialize from modelValue
watch(() => props.modelValue, (newValue) => {
  actualValue.value = newValue
  displayValue.value = convertValueToDisplay(newValue)
}, { immediate: true })

// Rebuild mention map from options
watch(() => props.options, () => {
  // Update existing mentions in case options change
  displayValue.value = convertValueToDisplay(actualValue.value)
}, { deep: true })

// Convert actual value (with @value) to display value (with @label)
function convertValueToDisplay(value: string): string {
  let result = value
  mentionMap.clear()
  
  // Find all @{value} patterns and replace with @label
  const regex = /@\{([^}]+)\}/g
  const matches = Array.from(value.matchAll(regex))
  
  // Replace from end to start to maintain correct positions
  for (let i = matches.length - 1; i >= 0; i--) {
    const match = matches[i]
    const mentionValue = match[1]
    const option = props.options.find(opt => String(opt.value) === mentionValue)
    if (option) {
      const startPos = match.index!
      const endPos = startPos + match[0].length
      result = result.substring(0, startPos) + `${props.trigger}${option.label}` + result.substring(endPos)
      mentionMap.set(option.label, mentionValue)
    }
  }
  return result
}

// Handle input event
function handleInput(event: Event) {
  const target = event.target as HTMLTextAreaElement
  displayValue.value = target.value
  
  const cursorPosition = target.selectionStart || 0
  
  // Check if @ was just typed
  const textBeforeCursor = displayValue.value.substring(0, cursorPosition)
  const lastAtIndex = textBeforeCursor.lastIndexOf(props.trigger)
  
  if (lastAtIndex !== -1) {
    const textAfterAt = textBeforeCursor.substring(lastAtIndex + 1)
    // Check if there's a space after @, if so, don't show dropdown
    if (!textAfterAt.includes(' ')) {
      currentMentionStart.value = lastAtIndex
      searchText.value = textAfterAt
      showDropdown.value = true
      selectedIndex.value = 0
      
      // Emit search event for dynamic loading
      emit('search', textAfterAt)
      
      // Calculate dropdown position
      nextTick(() => {
        calculateDropdownPosition(cursorPosition)
      })
      return
    }
  }
  
  showDropdown.value = false
}

// Calculate dropdown position
function calculateDropdownPosition(cursorPosition: number) {
  if (!inputRef.value) return
  
  // Create a temporary span to measure text width
  const span = document.createElement('span')
  span.style.cssText = window.getComputedStyle(inputRef.value).cssText
  span.style.position = 'absolute'
  span.style.visibility = 'hidden'
  span.style.whiteSpace = 'pre-wrap'
  span.textContent = displayValue.value.substring(0, cursorPosition)
  document.body.appendChild(span)
  
  const rect = inputRef.value.getBoundingClientRect()
  const lines = span.textContent.split('\n')
  const currentLine = lines.length - 1
  const lineHeight = parseInt(window.getComputedStyle(inputRef.value).lineHeight)
  
  // Estimate dropdown dimensions
  const estimatedDropdownHeight = Math.min(filteredOptions.value.length, 5) * 36 + 8
  const estimatedDropdownWidth = 200 // Estimated dropdown width
  const gap = 4 // Gap between cursor and dropdown
  
  // Calculate cursor position
  const cursorTop = rect.top + currentLine * lineHeight + window.scrollY
  const cursorLeft = rect.left + (span.offsetWidth % rect.width) + window.scrollX
  
  // Check if there's enough space above
  const spaceAbove = cursorTop - window.scrollY
  const spaceBelow = window.innerHeight - (rect.top + (currentLine + 1) * lineHeight)
  
  // Position above cursor if there's enough space, otherwise below
  const shouldShowAbove = spaceAbove >= estimatedDropdownHeight || spaceAbove > spaceBelow
  
  // Calculate left position (show on the left of cursor)
  // Ensure dropdown doesn't overflow the left edge of screen
  const leftPosition = Math.max(
    10, // Minimum 10px from left edge
    cursorLeft - estimatedDropdownWidth - gap + 20
  )
  
  dropdownPosition.value = {
    top: shouldShowAbove 
      ? cursorTop - estimatedDropdownHeight - gap
      : rect.top + (currentLine + 1) * lineHeight + window.scrollY + gap,
    left: leftPosition,
  }
  
  document.body.removeChild(span)
}

// Handle option selection
function selectOption(option: MentionOption) {
  if (!inputRef.value) return
  
  const cursorPosition = inputRef.value.selectionStart || 0
  const beforeMention = displayValue.value.substring(0, currentMentionStart.value)
  const afterCursor = displayValue.value.substring(cursorPosition)
  
  // Update display value
  displayValue.value = beforeMention + `${props.trigger}${option.label} ` + afterCursor
  
  // Update actual value with @{value} format
  const beforeMentionActual = convertDisplayToValue(beforeMention)
  const afterCursorActual = convertDisplayToValue(afterCursor)
  actualValue.value = beforeMentionActual + `${props.trigger}{${option.value}} ` + afterCursorActual
  
  // Store the mapping
  mentionMap.set(option.label, String(option.value))
  
  // Emit events
  emit('update:modelValue', actualValue.value)
  emit('mention', option)
  
  // Close dropdown
  showDropdown.value = false
  searchText.value = ''
  
  // Set cursor position
  nextTick(() => {
    const newCursorPos = beforeMention.length + props.trigger.length + option.label.length + 1
    inputRef.value?.setSelectionRange(newCursorPos, newCursorPos)
    inputRef.value?.focus()
  })
}

// Convert display value to actual value
function convertDisplayToValue(text: string): string {
  let result = text
  // Find all @label patterns and replace with @{value}
  mentionMap.forEach((value, label) => {
    const regex = new RegExp(`${props.trigger}${label}(?!\\w)`, 'g')
    result = result.replace(regex, `${props.trigger}{${value}}`)
  })
  return result
}

// Handle keyboard navigation
function handleKeydown(event: KeyboardEvent) {
  if (!showDropdown.value) return
  
  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      selectedIndex.value = Math.min(selectedIndex.value + 1, filteredOptions.value.length - 1)
      scrollToSelected()
      break
    case 'ArrowUp':
      event.preventDefault()
      selectedIndex.value = Math.max(selectedIndex.value - 1, 0)
      scrollToSelected()
      break
    case 'Enter':
      event.preventDefault()
      if (filteredOptions.value[selectedIndex.value]) {
        selectOption(filteredOptions.value[selectedIndex.value])
      }
      break
    case 'Escape':
      event.preventDefault()
      showDropdown.value = false
      break
  }
}

// Scroll to selected item
function scrollToSelected() {
  nextTick(() => {
    const dropdown = dropdownRef.value
    if (!dropdown) return
    
    const selectedItem = dropdown.querySelector('.mention-dropdown__item--selected') as HTMLElement
    if (selectedItem) {
      selectedItem.scrollIntoView({ block: 'nearest' })
    }
  })
}

// Handle click outside
function handleClickOutside(event: MouseEvent) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node) &&
      inputRef.value && !inputRef.value.contains(event.target as Node)) {
    showDropdown.value = false
  }
}

// Lifecycle
watch(showDropdown, (show) => {
  if (show) {
    document.addEventListener('click', handleClickOutside)
  } else {
    document.removeEventListener('click', handleClickOutside)
  }
})

// Update actual value when display value changes (for other edits)
watch(displayValue, (newVal) => {
  if (!showDropdown.value) {
    actualValue.value = convertDisplayToValue(newVal)
    emit('update:modelValue', actualValue.value)
  }
})

// Expose methods
defineExpose({
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur(),
})
</script>

<template>
  <div class="mention-wrapper">
    <textarea
      ref="inputRef"
      v-model="displayValue"
      class="mention-input"
      :placeholder="placeholder"
      :disabled="disabled"
      :rows="rows"
      @input="handleInput"
      @keydown="handleKeydown"
    />
    
    <teleport to="body">
      <div
        v-if="showDropdown"
        ref="dropdownRef"
        class="mention-dropdown"
        :style="{
          top: `${dropdownPosition.top}px`,
          left: `${dropdownPosition.left}px`,
          maxHeight: maxHeight,
        }"
      >
        <!-- Loading State -->
        <div v-if="loading" class="mention-dropdown__loading">
          <el-icon class="is-loading">
            <i class="el-icon-loading" />
          </el-icon>
          <span>{{ $t('dpTip.loading') }}</span>
        </div>
        
        <!-- Empty State -->
        <div v-else-if="filteredOptions.length === 0" class="mention-dropdown__empty">
          <span>{{$t('vxe.renderer.combination.notData')}}</span>
        </div>
        
        <!-- Options List -->
        <div
          v-for="(option, index) in filteredOptions"
          v-else
          :key="option.value"
          class="mention-dropdown__item"
          :class="{ 'mention-dropdown__item--selected': index === selectedIndex }"
          @click="selectOption(option)"
        >
          {{ option.label }}
        </div>
      </div>
    </teleport>
  </div>
</template>

<style scoped lang="scss">
.mention-wrapper {
  position: relative;
  width: 100%;
}

.mention-input {
  width: 100%;
  min-height: 80px;
  padding: 8px 12px;
  font-size: 14px;
  line-height: 1.5;
  color: var(--el-text-color-primary);
  background-color: var(--el-fill-color-blank);
  border: 1px solid var(--el-border-color);
  border-radius: 4px;
  outline: none;
  resize: unset;
  font-family: inherit;
  transition: border-color 0.2s;
  
  &:hover {
    border-color: var(--el-border-color-hover);
  }
  
  &:focus {
    border-color: var(--el-color-primary);
  }
  
  &:disabled {
    cursor: not-allowed;
    background-color: var(--el-fill-color-light);
    color: var(--el-text-color-disabled);
  }
  
  &::placeholder {
    color: var(--el-text-color-placeholder);
  }
}

.mention-dropdown {
  position: absolute;
  z-index: 9999;
  overflow-y: auto;
  background-color: var(--el-bg-color-overlay);
  border: 1px solid var(--el-border-color-light);
  border-radius: 4px;
  box-shadow: var(--el-box-shadow-light);
  min-width: 180px;
  width: 200px;
  
  &__item {
    padding: 8px 12px;
    cursor: pointer;
    font-size: 14px;
    color: var(--el-text-color-regular);
    transition: background-color 0.2s;
    
    &:hover,
    &--selected {
      background-color: var(--el-fill-color-light);
      color: var(--el-color-primary);
    }
    
    &:active {
      background-color: var(--el-fill-color);
    }
  }
  
  &__loading,
  &__empty {
    padding: 12px;
    text-align: center;
    font-size: 14px;
    color: var(--el-text-color-secondary);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
  
  &__loading {
    .el-icon {
      font-size: 16px;
    }
  }
}
</style>

