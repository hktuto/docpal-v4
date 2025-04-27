<template>
  <el-form v-if="options && options.conditionType" :model="form" label-position="top">
    <el-form-item :label="$t('search.conditionType')">
      <el-select-v2
        v-model="state.form.queryType"
        :options="options.conditionType"
        :placeholder="$t('common_selectOccupancyContent')"
        size="small" clearable filterable
        @clear="emits('selectClear')"
        @change="handleChangeQueryType"
      >
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
        <template #default="{item}">{{ $t(item.label) }}</template>
        <template #label="row">{{ $t(row.label) }}</template>
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
        :options="options.languages"
        :placeholder="$t('common_selectOccupancyContent')" clearable filterable
        size="small" multiple
        @change="handleChange"
      >
        <template #default="{item}">{{ $t('languages.' + item.label) }}</template>
        <template #label="row">{{ $t('languages.' + row.label) }}</template>
      </el-select-v2>
    </el-form-item>

    <el-form-item v-if="isQuertType('documentTypes')" :label="$t('searchGroup.documentTypes')">
      <el-select-v2
        v-model="state.form.documentTypes"
        :options="options.docType"
        :placeholder="$t('common_selectOccupancyContent')" clearable filterable
        size="small" multiple
        @change="handleChange"
      >
      </el-select-v2>
    </el-form-item>
    <el-form-item v-if="isQuertType('mimeTypes')" :label="$t('search.mimeTypes')">
      <el-select-v2
        v-model="state.form.mimeTypes"
        :options="options.mimeTypes"
        :placeholder="$t('common_selectOccupancyContent')" clearable filterable
        size="small" multiple
        @change="handleChange"
      />
    </el-form-item>
    <el-form-item v-if="isQuertType('creators')" :label="$t('doc_SearchCreators')">
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
    <el-form-item v-if="isQuertType('collections')" :label="$t('searchGroup.collections')">
      <el-select-v2
        v-model="state.form.collections"
        :options="options.collections"
        :placeholder="$t('common_selectOccupancyContent')" clearable filterable
        size="small" multiple
        @change="handleChange"
      />
    </el-form-item>
    <el-form-item v-if="isQuertType('tags')" :label="$t('searchGroup.tags')">
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
        :options="options.sizes"
        :placeholder="$t('common_selectOccupancyContent')"
        size="small"
        @change="handleChange"
      >
        <template #default="{item}">{{ $t(item.label) }}</template>
        <template #label="row">{{ $t(row.label) }}</template>
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
import {isJSON} from '~/utils/searchFormHelper'
const props = defineProps(['form'])
const emits = defineEmits(['selectClear', 'formChange'])
const state = reactive<any>({
  form: {},
  metadataType: {
    type: 'string',
  }
})
const options = inject('searchOptions')

const metaForm = ref()

function isQuertType(value: string) {
  return state.form.queryType === value
}

async function handleMetaChange(value: string) {
  state.metadataType = options.metadata.find((item: any) => item.value === value)
}

async function handleMetaEcho(q: any) {
  if (isJSON(q.value.value)) {
    const metaValue = JSON.parse(q.value.value)
    state.metadataType = {
      type: metaValue.type === 'dateRange' ? 'date' : 'string'
    }
  } else {
    state.metadataType = {
      type: 'string',
    }
  }
}

function handleMetaValueChange(value: string) {
  state.form.metadataValue = value
  handleChange()
}

function handleChangeQueryType(value: string) {
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

watch(() => props.form, (newValue: any) => {
  state.form = {...newValue, ...newValue.option}
  if (newValue.value) {
    state.form[newValue.queryType] = newValue.value
  }
  if (newValue.queryType === 'metadata') {
    handleMetaEcho(newValue)
    setTimeout(() => {
      if (metaForm.value) metaForm.value.setValue(newValue.metadataValue)
    }, 100)
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
