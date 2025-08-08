<template>
  <el-divider v-if="displayMeta.length > 0" content-position="left">{{ $t('info.displayMeta') }}</el-divider>
  <div v-for="(item, index) in displayMeta" :key="item.metaData" class="infoSection">
    <div class="infoTitle">{{ $t(item.metaData) }}</div>
    <div class="infoContent">
      <template v-if="isArray(item.value)">
        <el-tag v-for="(aItem,aIndex) in item.value" :key="aIndex" class="el-icon--left" effect="dark" type="info">
          {{ displayValue(aItem) }}
        </el-tag>
      </template>
      <template v-else>
          {{ displayValue(item.value) }}
      </template>
      <!-- <span v-if="item.dataType === 'date'">{{ formatDate(item.value) }}</span>
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
      <span v-else>{{ item.value || '-' }}</span> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getDisplayProperties } from '@/components/meta/metadata';
const props = defineProps<{ doc: any, permission: any }>();
const {doc} = toRefs(props)
const emit = defineEmits(['update'])
const displayMeta = ref<any[]>([])
function updateDisplayMeta() {
  displayMeta.value = getDisplayProperties(doc.value.properties)
}
function isArray(item: any) {
  return Array.isArray(item)
}
function displayValue(item: any) {
  return item.label || item || '-'
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
