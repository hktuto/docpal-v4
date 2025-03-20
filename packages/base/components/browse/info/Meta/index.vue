<template>
  <el-divider v-if="displayMeta.length > 0" content-position="left">{{ $t('info.displayMeta') }}</el-divider>
  <div v-for="(item, index) in displayMeta" :key="item.metaData" class="infoSection">
    <div class="infoTitle">{{ $t(item.metaData) }}</div>
    <div class="infoContent">
      <span v-if="item.dataType === 'date'">{{ formatDate(item.value) }}</span>
      <BrowseInfoMetaDocumentType
        v-else-if="item.dataType === 'select' && item.options?.dropdownType === 'documentType'"
        :data="item.value"/>
      <span v-else-if="item.metaDataType ==='array' && item.value">{{ item.value.join(',') || '-' }}</span>
      <span v-else-if="item.options?.multiple && item.values">
        <el-tag v-for="key in item.values" class="el-icon--left" effect="dark" type="primary">
          {{ key.value }}
        </el-tag>
      </span>
      <span v-else-if="item.value" v-html="item.value"></span>
      <span v-else>{{ item.value || '-' }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{ doc: any, permission: any }>();
const {doc} = toRefs(props)
const emit = defineEmits(['update'])
const displayMeta = ref<any[]>([])
const metaStructureByProperties = (metaList: any[], properties: string) => {
  if (!properties || !metaList) return []
  return metaList.reduce((p, item) => {
    if (item.display) {
      item.value = properties[item.metaData];
      p.push(item)
    }
    return p
  }, [])
}

function updateDisplayMeta() {
  if (!doc.value.displayMeta) return;
  displayMeta.value = metaStructureByProperties(doc.value.displayMeta, doc.value.properties)
}

function strToArr(str: any) {
    if (typeof(str) !== 'string') return str
    str = str.replace('[','').replace(']','')
    return str.split(',')
}

watch(doc, async (newValue) => {
  if (newValue) updateDisplayMeta()
}, {immediate: true, deep: true})

</script>


<style lang="scss" scoped>
.infoContent span {
  word-break: break-all;
}
</style>
