<script lang="ts" setup>
import formJson from './setting.vform.json'

const { t } = useI18n()
const state = reactive({
  visible: false,
  loading: false,
  formJson: {}, 
})

function handleOpen(setting: any){
  state.visible = true
  setTimeout(async () => {
    state.setting = setting;
    await FormRendererRef.value.vFormRenderRef.setFormData(setting);
    state.loading = false;
  });
}

const FormRendererRef = ref();

async function handleSubmit(){
  state.loading = true
  try {
    const data = await FormRendererRef.value.getFormData();
    if(!data.path){
      data.path = '/'
    }
    // TODO 保存設定的路徑
    emits("refresh", handleReload(data));
  } catch (error) {
    state.loading = false;
  }
  state.loading = false
  state.visible = false
}

defineExpose({handleOpen});
</script>

<template>
<el-dialog
    v-model="state.visible"
    :title="t('dashboard.setting')"
    class="scroll-dialog"
    append-to-body
    :close-on-click-modal="false"
    @close="handleClose"
  >
    <FormRenderer ref="FormRendererRef" :form-json="formJson"/>
    <template #footer>
      <div class="footer-grid">
        <el-button id="Browse__Setting__Submit" type="primary" :loading="state.loading" @click="handleSubmit">
          {{ $t("common_submit") }}
        </el-button>
      </div>
    </template>
  </el-dialog>

</template>

<style scoped lang="scss">

</style>
