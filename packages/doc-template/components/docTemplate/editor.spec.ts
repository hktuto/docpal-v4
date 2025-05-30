import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Editor from './editor.vue'

// Provide valid pageSetting and theme objects
const validPageSetting = {
    defaultMarginConfig: { bottom: 5, top: 5, left: 5, right: 5 },
    defaultPageBorders: { bottom: 1, top: 1, left: 1, right: 1 },
    defaultPaperColour: '#fff',
    defaultPaperOrientation: 'portrait' as 'portrait',
    defaultPaperSize: 'A4',
    useDeviceThemeForPaperColour: false as false,
    pageAmendmentOptions: { enableHeader: false, enableFooter: false }
}
const validTheme = {
    fontSize: 12,
    fontColor: '#000000',
    fontBackgroundColor: '#ffffff',
    fontFamily: 'Arial',
    bodyFontSize: 20,
    h1FontSize: 20,
    highlightColor: '#ffff00'
}

// Stubs for child components
const stubs = {
    DocTemplateHeader: {
        template: '<div data-testid="header">Header</div>',
        setup(_props: any, { expose }: { expose: (exposed: any) => void }) {
            expose({ init: () => {} })
        }
    },
    DocTemplateFooter: {
        template: '<div data-testid="footer">Footer</div>'
    },
    EditorContent: {
        template: '<div data-testid="editor-content">EditorContent</div>'
    }
}

describe('Editor.vue', () => {
    it('renders the editor layout and stubs', async () => {
        const wrapper = mount(Editor, {
            props: {
                editorOptions: { mode: 'PAGE', pageSetting: validPageSetting, title: 'Test', creator: '', editable: false, theme: validTheme },
                variables: []
            },
            global: {
                stubs
            }
        })
        expect(wrapper.find('[data-testid="header"]').exists()).toBe(true)
        expect(wrapper.find('[data-testid="footer"]').exists()).toBe(true)
        expect(wrapper.find('[data-testid="editor-content"]').exists()).toBe(true)
        expect(wrapper.classes()).toContain('editorContainer')
    })

    it('accepts and uses the variables prop', async () => {
        const variables = [{ type: 'Text', key: 'test', value: 'val' }]
        const wrapper = mount(Editor, {
            props: {
                editorOptions: { mode: 'PAGE', pageSetting: validPageSetting, title: 'Test', creator: '', editable: false, theme: validTheme },
                variables
            },
            global: {
                stubs
            }
        })
        expect(wrapper.props('variables')).toEqual(variables)
    })
}) 
