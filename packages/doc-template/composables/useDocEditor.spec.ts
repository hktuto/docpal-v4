import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest'

// Mock useState for testing
const mockUseState = vi.fn((key, fn) => {
    return { value: fn() }
})

let originalUseState: any

beforeAll(() => {
    // @ts-ignore
    originalUseState = global.useState
    // @ts-ignore
    global.useState = mockUseState
})
afterAll(() => {
    // @ts-ignore
    global.useState = originalUseState
})

import { useDocHeader, useDocExtendElement } from './useDocEditor'

describe('useDocHeader', () => {
    it('should return the correct default tool sections', () => {
        const docHeader = useDocHeader()
        expect(Array.isArray(docHeader.value)).toBe(true)
        expect(docHeader.value.length).toBeGreaterThan(0)
        // Check for required sections
        const sectionNames = docHeader.value.map(section => section.name)
        expect(sectionNames).toContain('Home')
        expect(sectionNames).toContain('Table')
        expect(sectionNames).toContain('Data')
        expect(sectionNames).toContain('Setting')
        // Check for tools in Home
        const homeSection = docHeader.value.find(section => section.name === 'Home')
        expect(homeSection).toBeDefined()
        expect(Array.isArray(homeSection?.tools)).toBe(true)
        expect(homeSection?.tools.length).toBeGreaterThan(0)
    })
})

describe('useDocExtendElement', () => {
    it('should return the correct default extend elements', () => {
        const docExtendElement = useDocExtendElement()
        expect(Array.isArray(docExtendElement.value)).toBe(true)
        expect(docExtendElement.value.length).toBeGreaterThan(0)
        expect(docExtendElement.value[0]).toHaveProperty('name', 'Bubble Menu')
        expect(docExtendElement.value[0]).toHaveProperty('components', 'lazyDocTemplateSettingBubbleMenu')
    })
}) 
