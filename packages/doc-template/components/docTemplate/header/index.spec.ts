import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DocTemplateHeader from './index.vue'
import { DocTemplateProveKey } from '~/utils/docTempalteHelper'
import { h } from 'vue'

const provideMock = {
    [DocTemplateProveKey as symbol]: {
        editor: { value: {} },
        variables: [],
        options: { value: {} },
        initEditor: () => {},
        lastSelection: { value: null },
        addVariable: () => {},
        removeVariable: () => {},
        updateVariable: () => {}
    }
}

describe('DocTemplateHeader', () => {
    it('renders header container and tabs', () => {
        const wrapper = mount(DocTemplateHeader, {
            global: {
                provide: provideMock,
                stubs: {
                    'el-tabs': { template: '<div class="el-tabs"><slot /></div>' },
                    'el-tab-pane': { template: '<div class="el-tab-pane"><slot /></div>' }
                }
            }
        })
        expect(wrapper.find('.headerContainer').exists()).toBe(true)
        // Should render tabs if editor is provided
        expect(wrapper.find('.el-tabs').exists()).toBe(true)
    })
}) 
