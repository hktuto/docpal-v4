<template>
  <div class="pageContainer">
    <template v-if="list.length === 0">
      <WatermarkEmpty @update="getList" />
    </template>
    <template v-else>
      <div class="listContainer">
        <WatermarkList :list="list" :selected-id="props.id" @update="getList" @remove="deleteItem" />
        <WatermarkDetail v-if="detail" ref="watermarkDetail" :detail="detail">
          <template #footer>
            <ElButton id="WatermarkSetting__Save" type="primary" @click="save">Save</ElButton>
          </template>
        </WatermarkDetail>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { adminApi } from 'api'
const detail = ref<WatermarkTemplateDetail | null>(null)
const { getWatermarkTemplateDetail, removeWatermarkTemplate, list, updateWatermarkTemplateDetail } = useWatermark()
const watermarkDetail = ref()
const routerProvider = inject(MenuRouterKey)
const props = defineProps<{
  id: string
}>()

const { id } = toRefs(props)
const { t } = useI18n()

async function getList(dummy: boolean = false) {
  const { data } = await adminApi.api.getWatermarkTemplatesAll() as any
  list.value = data.sort((a, b) => a.name.localeCompare(b.name))
}

async function deleteItem(id: string) {
  await removeWatermarkTemplate(id)
  await getList()
  if (list.value.length > 0) {
    routerProvider?.updateProps({
      id: list.value[0].id
    })
  }
}

async function getDetail(id: string) {
  try {
    detail.value = await getWatermarkTemplateDetail(id)
    console.log('detail', detail.value)
    if (detail.value.type === 'dynamic') detail.value.contentType = detail.value.content
  } catch (error) {
    detail.value = null
  }
}

async function save() {
  const data = await watermarkDetail.value.save()
  if (!data) return
  const promise = []
  await updateWatermarkTemplateDetail(data.update)
  routerProvider?.message.success(t('admin_watermarkSavedSuccessMsg'))
}


onMounted(() => {
  console.log("watermark onMounted")
})
onUnmounted(() => {
  detail.value = null
})

watch(() => props, (newId) => {
  console.log('watch', props.id)
  if (props.id) {

    getDetail(props.id)
  }else{
    getList()
  }

}, {
  immediate: true,
  deep: true
})
</script>

<style lang="scss" scoped>
.pageContainer {
  height: 100%;
  width: 100%;
  padding: var(--app-space-xs);
  position: relative;
}

.listContainer {
  height: 100%;
  width: 100%;
  padding: 0;
  display: grid;
  grid-template-columns: min-content 1fr;
  justify-content: flex-start;
  align-items: flex-start;
  gap: var(--app-space-xs);
  overflow: hidden;
  position: relative;
}
</style>
