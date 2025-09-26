<script setup lang="ts">
import { Codemirror } from 'vue-codemirror'
import { json, jsonParseLinter } from '@codemirror/lang-json'
import { linter } from '@codemirror/lint'
import { oneDark } from '@codemirror/theme-one-dark'

const { t } = useI18n()
const emits = defineEmits(['update'])
const state = reactive({
  additionalContent: ''
})

const codeMirror = reactive({
  extensions: [json(), linter(jsonParseLinter()), oneDark],
  errorMessage: ''
})

function handleJsonFormat() {
  if (!checkJsonFormat()) {
    state.additionalContent = JSON.stringify(JSON.parse(state.additionalContent), null, 2)
    codeMirror.errorMessage = ''
    update()
  }
}

function checkJsonFormat() {
  try {
    JSON.parse(state.additionalContent)
    codeMirror.errorMessage = ''
    return false
  } catch (e) {
    codeMirror.errorMessage = `Unable to format JSON: ${e.message}`
    return true
  }
}

function update() {
  emits('update', state.additionalContent)
}
</script>

<template>
  <el-form-item :label="t('Additional Message')">
    <el-input v-model="state.additionalContent" type="textarea" :autosize="{ minRows: 2, maxRows: 4 }" @change="update" />
    <!--    <el-input v-model="state.additionalContent" type="textarea" v-show="false" disabled />-->
  </el-form-item>
  <!--  <div v-if="codeMirror.errorMessage" class="error">{{ codeMirror.errorMessage }}</div>-->
  <!--  <codemirror-->
  <!--    v-model="state.additionalContent"-->
  <!--    :style="{top: '-20px' ,width: '300px', height: '20vh' }"-->
  <!--    :autofocus="true"-->
  <!--    :indent-with-tab="true"-->
  <!--    :tab-size="2"-->
  <!--    :extensions="codeMirror.extensions"-->
  <!--    @change="checkJsonFormat"-->
  <!--    @blur="handleJsonFormat"-->
  <!--  />-->
</template>

<style scoped lang="scss">

</style>