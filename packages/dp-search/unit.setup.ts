import { vi } from 'vitest'
const useUser = vi.fn(() => {
  return {
    getIsLdapMode: () => false,
    getUserId: () => "1",
    loginHandlers:{
        value: []
    },
    logoutHandlers:{
        value: []
    }
  }
})
const useLayout = vi.fn(() => {
  return {
    isSmallMobile: false,
    isMobile: false
  }
})
const deepCopy  = (data:any) => {
  if (!data) return {}
  return JSON.parse(JSON.stringify(data));
}
const $i18n = () => {
}
$i18n.t = (msg: string) => msg
vi.stubGlobal('$i18n', $i18n)
vi.stubGlobal('useUser', useUser)
// vi.stubGlobal('useLayout', useLayout)
// vi.stubGlobal('deepCopy', deepCopy)

