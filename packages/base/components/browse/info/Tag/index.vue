<template>
  <el-divider content-position="left">{{$t('info.tag&collection')}}</el-divider>
   <div class="infoSection" v-show="tags.length > 0 || canWrite" >
     <div class="infoTitle">{{ $t('rightDetail_tags') }}</div>
    <div class="infoContent">
      <VueTagsInput
          element-id="tags"
          v-model="tags" :only-from-suggestions="false"
          :existing-tags="allTags"
          :add-on-space="false" :add-on-comma="true" :add-on-blur="true"
          :placeholder="$t('tip.input')"
          :typeahead="true"
          :disabled="!canWrite"
          @tag-removed="handleTagsRemoved"
          @tag-added="handleTagsAdded"
        />

    </div>
  </div>
</template>

<script lang="ts" setup>
import '@james090500/vue-tagsinput/dist/style.css';
import { clientApi } from 'api'
import { ElMessage } from 'element-plus'
const routerProvider = inject(MenuRouterKey)
const props = defineProps<{
  doc: any,
}>()
const { doc } = toRefs(props)
const { t} = useI18n()
const canWrite = computed(() => {
  return RbacAllowTo('editMetadata', doc.value)
})
// TODO : add api
const emit = defineEmits(['update'])
async function handleTagsAdded(tagSelected:any) {
  // if tagSelected is already in props.doc.properties['nxtag:tags'] return
  if (props.doc?.properties['nxtag:tags'] && props.doc?.properties['nxtag:tags'].some((item:any) => item.label === tagSelected.value )) {
    return
  }
  const param = {
        documentIdOrPath: props.doc.id,
        labels: [tagSelected.value],
      }
  await clientApi.api.postNuxeoTags(param)
  routerProvider?.message.success(t('msg_successfullyModified') as string)
  emit('update')
}
async function handleTagsRemoved(e:any){
  console.log('handleDocumentTagsChange',tags.value)
  const param = {
        documentIdOrPath: props.doc.id,
        labels: tags.value.map((item:any) => item.value),
      }
  await clientApi.api.patchNuxeoTags(param)
  ElMessage.success(t('msg_successfullyModified') as string)
  emit('update')
}
const tags = ref([]);
const allTags = ref([]);

async function getAllTags() {
  const response = await clientApi.api.postNuxeoTagsLabel({keyword:''}).then(res => res.data) as any
  allTags.value = response.map((item:string) => {
    return { value: item, key: item };
  });
}

watch(doc, () => {
    if(!props.doc && !props.doc.properties) {
      tags.value = []
      return
    }
    tags.value =( props.doc?.properties['nxtag:tags'] || []).map((item:any) => ({
      key: item.label,
      value: item.label
    }))
},{immediate:true})

onMounted(() => getAllTags());
</script>



<style lang="scss" scoped>


.tags-input-root{
  font-size: 1rem;
  :deep(.tags-input-wrapper-default.active)
    {
      border-color: var(--primary-color);
      box-shadow: none;
    }
}
</style>
