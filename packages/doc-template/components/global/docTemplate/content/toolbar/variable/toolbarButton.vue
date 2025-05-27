<script setup lang="ts">
import { ref } from 'vue'
import { ElButton } from 'element-plus'
import Manager from './Manager.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const showVarManager = ref(false)
</script>

<template>
  <div>
    <ElButton size="small" @click="showVarManager = true">
      {{ t('docTemplate.variable.managerTitle') }}
    </ElButton>
    <Manager
      v-if="showVarManager"
      @close="showVarManager = false"
    />
  </div>
</template> 
