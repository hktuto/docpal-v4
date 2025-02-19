import { it, expect, describe } from 'vitest'
// tests/components/SomeComponents.nuxt.spec.ts
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime'
import { NotificationTabDialog } from '#components'

describe('Check Notification', async () => {

    it('render', async () => {
        const component = await mountSuspended(NotificationTabDialog, {
            props: {
                unreadCount: 10
            }
        })
        expect(component.setupState.props.unreadCount).toBe(10)
    })
    it('open', async () => {
        const component = await mountSuspended(NotificationTabDialog)
        component.setupState.handleOpen()
        expect(component.setupState.state.visible).toBeTruthy()
    })
    
})