import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

const breakpoints = useBreakpoints({
  mobile: 0, // optional
  tablet: 640,
  laptop: 1024,
  desktop: 1280,
})

export const  isDesktop = breakpoints.greaterOrEqual('laptop')
export const  isMobile = breakpoints.smallerOrEqual('tablet')
