<template>
    <el-dialog 
        v-model="state.dialogVisible"
        :close-on-click-modal="false"
        append-to-body>
        <FormRenderer ref="FormRendererRef" :form-json="formJson"/>
        <template #footer>
            <el-button type="primary" :loading="state.loading" @click="handleSubmit">{{$t('common_submit')}}</el-button>
        </template>
  </el-dialog>
</template>
  
<script lang="ts" setup>
  import { useEventListener } from '@vueuse/core'
  import { SearchListProviderKey } from '~/utils/searchProviderHelper'
    import formJson from './searchGroupSaveForm.vform.json'

  const searchProvider = inject(SearchListProviderKey)
  const state = reactive({
    loading: false,
    dialogVisible: false,
  })
  const FormRendererRef = ref()
  async function handleSubmit () {
    try {
      const data = await FormRendererRef.value.vFormRenderRef.getFormData()
      if (!data) return
      await searchProvider?.saveSearch(data)
      state.dialogVisible = false
    } catch (error) {
        
    } finally {
        state.loading = false
    }   
  }
  function handleOpen () {
    state.dialogVisible = true
  }
  
  
  defineExpose({
    handleOpen
  })
 
  </script>
  
  <style lang="scss" scoped>
  
  </style>