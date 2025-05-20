<script lang="ts" setup>

const emits = defineEmits(['update'])

const opened = ref(false)
const { flatRole } = useRBAC()
const rowData = ref()
function open(data:any) {
  // data may be a pointer, copy to an new object to make the state in local only
  rowData.value = {...data };
  opened.value = true
}

function submit(){
  emits('update', JSON.parse(JSON.stringify(rowData.value)))
  opened.value = false
}

defineExpose({
  open
})

</script>

<template>
  <ElDialog v-model="opened" :title="`${rowData ? rowData.name : ''} Permission`" width="80%" :show-closed="false">
    <ElForm label-position="top" >
      <ElFormItem label="list" >
        <ElSelect v-model="rowData.permission.list" multiple>
          <ElOption v-for="role in flatRole" :label="role" :value="role" />
        </ElSelect>
      </ElFormItem>
      <ElFormItem label="View Content" >
        <ElSelect v-model="rowData.permission.viewContent" multiple>
          <ElOption v-for="role in flatRole" :label="role" :value="role" />
        </ElSelect>
      </ElFormItem>
      <ElFormItem label="View Metadata" >
        <ElSelect v-model="rowData.permission.viewMetadata" multiple>
          <ElOption v-for="role in flatRole" :label="role" :value="role" />
        </ElSelect>
      </ElFormItem>
      <ElFormItem label="Print" >
        <ElSelect v-model="rowData.permission.print" multiple>
          <ElOption v-for="role in flatRole" :label="role" :value="role" />
        </ElSelect>
      </ElFormItem>
      <ElFormItem label="Edit Content" >
        <ElSelect v-model="rowData.permission.editFile" multiple>
          <ElOption v-for="role in flatRole" :label="role" :value="role" />
        </ElSelect>
      </ElFormItem>
      <ElFormItem label="Edit Metadata" >
        <ElSelect v-model="rowData.permission.editMetadata" multiple>
          <ElOption v-for="role in flatRole" :label="role" :value="role" />
        </ElSelect>
      </ElFormItem>
      <ElFormItem label="Edit Permissions" >
        <ElSelect v-model="rowData.permission.editPermissions" multiple>
          <ElOption v-for="role in flatRole" :label="role" :value="role" />
        </ElSelect>
      </ElFormItem>
      <ElFormItem label="Delete" >
        <ElSelect v-model="rowData.permission.delete" multiple>
          <ElOption v-for="role in flatRole" :label="role" :value="role" />
        </ElSelect>
      </ElFormItem>
    </ElForm>
    
    <template #footer>
      <ElButton type="link" @click="opened = false">Cancel</ElButton>
      <ElButton type="primary" @click="submit" >Submit</ElButton>
    </template>
  </ElDialog>
</template>
