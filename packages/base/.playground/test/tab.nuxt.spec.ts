
import { it, expect, describe } from 'vitest'
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime'

import { TabManager } from '#components'

describe('Tab System', async() => {
    console.log("start test tab");
    const component = await mountSuspended(TabManager)
    it('can Mount', async() => {
        expect(component).toBeDefined()
        // ... test with Nuxt environment!
    })
    
})

