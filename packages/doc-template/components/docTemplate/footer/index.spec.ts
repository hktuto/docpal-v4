import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DocTemplateFooter from './index.vue'
import { DocTemplateProveKey } from '../../../utils/docTempalteHelper'

const provideMock = {
    [DocTemplateProveKey as symbol]: {
        editor: { storage: { characterCount: { characters: () => 123, words: () => 45 } } },
        options: { value: {} }
    }
}

describe('DocTemplateFooter', () => {
    it('renders footer container and word count', () => {
        const wrapper = mount(DocTemplateFooter, {
            global: {
                provide: provideMock
            }
        })
        expect(wrapper.find('.footerContainer').exists()).toBe(true)
        expect(wrapper.text()).toContain('characters')
    })
}) 
