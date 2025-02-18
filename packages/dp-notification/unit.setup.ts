import { vi } from 'vitest'
const useUser = vi.fn(() => {
  return {
      getUserId: () => "1",
      loginHandlers:{
          value: []
      },
      logoutHandlers:{
          value: []
      }
  }
})
const i18n: any = vi.fn(() => {
    return {
        t: (key: string) => key
    }
})
const useTime: any = vi.fn(() => {
    return {
        displayTime: (time: string) => time
    }
})
 
vi.stubGlobal('useUser', useUser)
// vi.stubGlobal('i18n', i18n)
// vi.stubGlobal('$t', (key: any) => i18n.t(key))
vi.stubGlobal('useTime', useTime)
