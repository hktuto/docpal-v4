<script lang="ts" setup>
import type { SignatureSetting } from './type';

const props = withDefaults(defineProps<{
  field: 'prefix' | 'suffix',
  setting?: SignatureSetting
}>(),{
  field: 'prefix'
})
const templateVariableOption = [
  'username',
  'firstName',
  'lastName',
  'signDate(yyyy-mm-dd)',
]


</script>

<template>
<div class="templateEditorContainer">
  {{ field }}
</div>
</template>
