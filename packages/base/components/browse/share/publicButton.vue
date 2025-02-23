<template>
<Draggable v-if="hidden && state.show" id="share-draggable-button" class="share-draggable-button" :initialValue="{ x: width / 2 - 100, y: height - 100 }" 
    :handle="handle">
    <div class="flex-x-center">
        <el-icon ref="handle" class="cursor-move"><Rank /></el-icon>
        <el-badge class="el-icon--right" :value="shareList.length" :max="99" type="success">{{$t('share.shareQueue')}}</el-badge>
        <el-button class="ml-30" type="primary" text @click="handleShare">{{$t('share.share')}}</el-button>
        <SvgIcon src="/icons/close.svg" @click="emptyList" />
    </div>
</Draggable>
</template>


<script lang="tsx" setup>
import { Rank } from '@element-plus/icons-vue'
import { UseDraggable as Draggable  } from '@vueuse/components'
import { useWindowSize } from '@vueuse/core'

const { width, height } = useWindowSize()
const { shareList } = useShareStore()
const route = useRoute()
const router = useRouter()
const handle = ref<HTMLElement | null>(null)
const state = reactive<State>({
  show: true
})

const tabProvider = inject(TabManagerKey)
if(!tabProvider) {
    throw createError('tab manger not found')
}
const hidden = computed(() => {
    return shareList && 
          shareList.value.length > 0 
}) 

function emptyList () {
  shareList.value = []
  sessionStorage.setItem('shareList', "[]")
}
function handleShare () {
  // close detail
  const item = createSharePageParams({
    backPath: route.fullPath
  })
  tabProvider?.openTab(item)
  setTimeout(()=> {
    const ev = new CustomEvent('closeFilePreview', { detail: {} });
    document.dispatchEvent(ev);
  }, 100)
}
function handleResize() {
  state.show = false
  setTimeout(() => state.show = true )
}
onMounted(async() => {
  window.addEventListener("resize", handleResize)
})
</script>

<style lang="scss" scoped>
.share-draggable-button {
  position: fixed;
  z-index: 99;
  background-color: #fff;
  border-radius: 36px;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.3);
  padding: var(--app-space-xs) var(--app-space-s);
  .cursor-move {
    cursor: move;
  }
}
.ml-30 {
    margin-left: 30px;
}
</style>
