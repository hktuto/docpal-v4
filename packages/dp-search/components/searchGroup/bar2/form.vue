<template>
<el-form :model="form" label-position="top">
  <el-form-item :label="$t('search.conditionType')">
    <el-select-v2
      v-model="state.form.queryType"
      :options="conditionType"
      :placeholder="$t('common_selectOccupancyContent')"
      size="small" clearable filterable
      @clear="emits('selectClear')"
      @change="handleChangeQueryType"
    >
      <template #default="{item}">{{$t('searchGroup.' + item.label)}}</template>
      <template #label="row">{{$t('searchGroup.' + row.label)}}</template>
    </el-select-v2>
  </el-form-item>
  <el-form-item v-if="isQuertType('keyword')" :label="$t('search.keyword')">
    <el-input
      v-model="state.form.keyword"
      :placeholder="$t('tip.input')"
      clearable size="small"
      @change="handleChange"
    />
  </el-form-item>
  <el-form-item v-if="isQuertType('metadata')" :label="$t('search.metadataKey')">
    <el-select-v2
      v-model="state.form.metadataKey"
      :options="options.metadata"
      :placeholder="$t('common_selectOccupancyContent')" clearable filterable
      @change="handleMetaChange"
      size="small"
    >
      <template #default="{item}">{{$t(item.label)}}</template>
      <template #label="row">{{$t(row.label)}}</template>
    </el-select-v2>
  </el-form-item>
  <el-form-item v-show="isQuertType('metadata')" :label="$t('search.metadataValue')">
    <SearchGroupBar2Metaform ref="metaForm" :config="state.metadataType" @formChange="handleMetaValueChange"/>
  </el-form-item>
  <el-form-item v-if="isQuertType('keyword')" :label="$t('search.synonyms')">
    <el-switch
      v-model="state.form.synonyms"
      size="small"
      @change="handleChange"
    />
  </el-form-item>
  <el-form-item v-if="isQuertType('keyword')" :label="$t('search.includeLanguages')">
    <el-select-v2
      v-model="state.form.includeLanguages"
      :options="languages"
      :placeholder="$t('common_selectOccupancyContent')" clearable filterable
      size="small" multiple
      @change="handleChange"
    >
      <template #default="{item}">{{ $t('languages.' + item.label) }}</template>
      <template #label="row">{{ $t('languages.' + row.label) }}</template>
    </el-select-v2>
  </el-form-item>

  <el-form-item v-if="isQuertType('documentTypes')" :label="$t('searchGroup.documentTypesSelect')">
    <el-select-v2
      v-model="state.form.documentTypes"
      :options="options.docType"
      :placeholder="$t('common_selectOccupancyContent')" clearable filterable
      size="small" multiple
      @change="handleChange"
    >
    </el-select-v2>
  </el-form-item>
  <el-form-item v-if="isQuertType('mimeTypes')" :label="$t('doc_SearchLanguagesMimeTypeSelect')">
    <el-select-v2
      v-model="state.form.mimeTypes"
      :options="mimeTypes"
      :placeholder="$t('common_selectOccupancyContent')" clearable filterable
      size="small" multiple
      @change="handleChange"
    />
  </el-form-item>
  <el-form-item v-if="isQuertType('creators')" :label="$t('doc_SearchCreatorsSelect')">
    <el-select-v2
      v-model="state.form.creators"
      :options="options.users"
      :placeholder="$t('common_selectOccupancyContent')" clearable filterable
      size="small" multiple
      @change="handleChange"
    />
  </el-form-item>
  <el-form-item v-if="isQuertType('authors')" :label="$t('searchGroup.authors')">
    <el-select-v2
      v-model="state.form.authors"
      :options="options.users"
      :placeholder="$t('common_selectOccupancyContent')" clearable filterable
      size="small" multiple
      @change="handleChange"
    />
  </el-form-item>
  <el-form-item v-if="isQuertType('collections')" :label="$t('searchGroup.collectionsSelect')">
    <el-select-v2
      v-model="state.form.collections"
      :options="options.collections"
      :placeholder="$t('common_selectOccupancyContent')" clearable filterable
      size="small" multiple
      @change="handleChange"
    />
  </el-form-item>
  <el-form-item v-if="isQuertType('tags')" :label="$t('searchGroup.tagsSelect')">
    {{ options.tags }}
    <el-select-v2
      v-model="state.form.tags"
      :options="options.tags"
      :placeholder="$t('common_selectOccupancyContent')"
      size="small" multiple clearable filterable
      @change="handleChange"
    />
  </el-form-item>
  <el-form-item v-if="isQuertType('creatorGroups')" :label="$t('searchGroup.creatorGroups')">
    <el-select-v2
      v-model="state.form.creatorGroups"
      :options="options.groupList"
      :placeholder="$t('common_selectOccupancyContent')"
      size="small" multiple clearable filterable
      @change="handleChange"
    />
  </el-form-item>
  <el-form-item v-if="isQuertType('authorGroups')" :label="$t('searchGroup.authorGroups')">
    <el-select-v2
      v-model="state.form.authorGroups"
      :options="options.groupList"
      :placeholder="$t('common_selectOccupancyContent')"
      size="small" multiple clearable filterable
      @change="handleChange"
    />
  </el-form-item>
  <el-form-item v-if="isQuertType('size')" :label="$t('searchGroup.size')">
    <el-select-v2
      v-model="state.form.size"
      :options="sizes"
      :placeholder="$t('common_selectOccupancyContent')"
      size="small"
      @change="handleChange"
    >
      <template #default="{item}">{{$t(item.label)}}</template>
      <template #label="row">{{$t(row.label)}}</template>
    </el-select-v2>
  </el-form-item>
  <el-form-item v-if="isQuertType('createdDate')" :label="$t('searchGroup.createdDate')">
    <el-date-picker
        v-model="state.form.createdDate"
        type="daterange" size="small"
      @change="handleChange"
      />
  </el-form-item>
  <el-form-item v-if="isQuertType('modified')" :label="$t('searchGroup.modified')">
    <el-date-picker
        v-model="state.form.modified"
        type="daterange" size="small"
      @change="handleChange"
      />
  </el-form-item>
</el-form>
</template>
<script lang="ts" setup>
import { clientApi } from 'api'
import { conditionType, getMetadataOptions, languages, mimeTypes,getGroupList, sizes  } from '~/utils/formOptions'
import { isJSON } from '~/utils/searchFormHelper'
const props = defineProps(['form'])
const emits = defineEmits(['selectClear', 'formChange'])
const state = reactive<any>({
  form: {},
  metadataType: {
    type: 'string',
  }
})
const options = reactive<any>({
  metadata: [],
  languages: [],
  conditionType: [],
  mimeTypes: [],
  docType: [],
  users: [],
  collections: [],
  tags: [],
  groupList: [],
  sizes: []
})
const metaForm = ref()
function isQuertType(value: string) {
  return state.form.queryType === value
}
async function handleMetaChange(value) {
  state.metadataType = options.metadata.find(item => item.value === value)
}
async function handleMetaEcho(q) {
  if (isJSON(q.value.value)) {
    const metaValue = JSON.parse(q.value.value)
    state.metadataType = {
      type: metaValue.type ==='dateRange' ? 'date' : 'string'
    }
  } else {
    state.metadataType = {
      type: 'string',
    }
  }
}
function handleMetaValueChange(value) {
  state.form.metadataValue = value
  handleChange()
}
function handleChangeQueryType(value) {
  state.form = {
    queryType: value
  }
}
function handleChange() {
  emits('formChange')
}
function getFormData() {
  return {
    ...state.form
  }
}
onMounted(async() => {
  const [
    docType,
    users,
    collections,
    tags,
    groupList,
    metadata
  ] = await Promise.all([
    clientApi.api.getTypesActive(),
    clientApi.api.postNuxeoIdentityGetkeycloakallusers(),
    clientApi.api.getNuxeoCollection(),
    clientApi.api.postNuxeoTagsGetalltags(),
    getGroupList(),
    getMetadataOptions()
  ])
  options.docType = docType.data?.map((item:any) => ({label:item.name, value:item.name}))
  options.users = users.data?.map((item:any) => ({label:item.username, value:item.userId}))
  options.collections = collections?.data?.map((item:any) => ({label: item.createdBy + ' - ' + item.name, value:item.id}))
  options.tags = tags.data?.map((item:any) => ({label:item, value:item}))
  options.groupList = groupList
  options.metadata = metadata
})
watch(() => props.form, (newValue) => {
  state.form = {...newValue, ...newValue.option}
  if(newValue.value) {
    state.form[newValue.queryType] = newValue.value
  }
  if(newValue.queryType === 'metadata') {
    handleMetaEcho(newValue)
    setTimeout(() => {
      if(metaForm.value) metaForm.value.setValue(newValue.metadataValue)
    },100)
  }
}, {
  immediate: true
})

defineExpose({
  getFormData
})
</script>
<style lang="scss" scoped>
</style>
