import {
    variableType,
    DocTemplateProveKey,
    type DocumentOptions,
    type ToolSection,
    type DocTool,
    type VariableType,
    type TableColumn,
    type TableRow,
    type VariableItem,
    type LastSelection
} from './docTempalteHelper'
import { describe, it, expect } from 'vitest'


describe('docTempalteHelper', () => {
    it('should export variableType array with all expected types', () => {
        const types = variableType.map(v => v.type)
        expect(types).toEqual([
            'Text',
            'Paragraph',
            'documentId',
            'CaseId',
            'WorkflowId',
            'Email',
            'Website',
            'List',
            'Table'
        ])
    })

    it('should export DocTemplateProveKey as a symbol', () => {
        expect(typeof DocTemplateProveKey).toBe('symbol')
    })

    it('should allow creation of DocumentOptions type', () => {
        const options: DocumentOptions = {
            pageSize: { width: 100, height: 200 },
            pageOrientation: 'portrait',
            pageMargins: {
                top: 10, bottom: 10, left: 10, right: 10, header: 10, footer: 10, gutter: 10
            },
            title: 'Test',
            subject: 'Test',
            creator: 'Tester',
            keywords: ['a', 'b'],
            description: 'desc',
            lastModifiedBy: 'user',
            revision: '1',
            createdAt: 'now',
            modifiedAt: 'now',
            headerType: 'default',
            header: true,
            footer: true,
            pageNumber: true,
            footerType: 'default',
            font: 'Arial',
            fontSize: 12,
            lang: 'en'
        }
        expect(options.title).toBe('Test')
    })

    it('should allow creation of VariableItem and TableColumn types', () => {
        const column: TableColumn = {
            header: 'Header',
            key: 'key',
            width: '100px',
            align: 'center'
        }
        expect(column.header).toBe('Header')
        const variable: VariableItem = {
            type: 'Text',
            key: 'varKey',
            displayValue: 'value'
        }
        expect(variable.type).toBe('Text')
    })
}) 
