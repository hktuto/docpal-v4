<template>
  <div class="public-form">
    <div class="form-main" v-loading="state.formJsonLoad">
    <FormRenderer
        ref="FormRendererRef"
        :form-json="state.formJson"
      />
    </div>
    <div class="flex-x-end">
      <el-button type="primary" @click="handleSubmit">{{ $t('common_submit') }}</el-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { clientApi } from 'api'
const props = defineProps(["detail"]);
const route = useRoute();
const router = useRouter();

const state = reactive<any>({
  formJsonLoad: false,
  formJson: {},
  detail: {}
});
const FormRendererRef = ref()

async function getFormJson() {
  try {
    state.formJsonLoad = true
    state.detail = await clientApi.api.getFormDesignIdDetail(route.query.id).then(res => res.data);
    
    const json = state.detail.previewStyle
    state.formJson = JSON.parse(json)
    FormRendererRef.value.setFormJson(state.formJson)
    
  } catch (error) {
    // const json = '{"widgetList":[{"key":37325,"type":"input","icon":"text-field","formItemFlag":true,"options":{"name":"age","label":"age","labelAlign":"","type":"text","defaultValue":"","placeholder":"","columnWidth":"200px","size":"","labelWidth":null,"labelHidden":false,"readonly":false,"disabled":false,"hidden":false,"clearable":true,"showPassword":false,"required":false,"requiredHint":"","validation":"","validationHint":"","customClass":[],"labelIconClass":null,"labelIconPosition":"rear","labelTooltip":null,"minLength":null,"maxLength":null,"showWordLimit":false,"prefixIcon":"","suffixIcon":"","appendButton":false,"appendButtonText":"","prependText":"","appendButtonDisabled":false,"buttonIcon":"custom-search","onCreated":"","onMounted":"","onInput":"","onChange":"","onFocus":"","onBlur":"","onEnter":"","onValidate":"","onAppendButtonClick":""},"id":"input51245"},{"key":37325,"type":"input","icon":"text-field","formItemFlag":true,"options":{"name":"User Name","label":"user name","labelAlign":"","type":"text","defaultValue":"","placeholder":"","columnWidth":"200px","size":"","labelWidth":null,"labelHidden":false,"readonly":false,"disabled":false,"hidden":false,"clearable":true,"showPassword":false,"required":false,"requiredHint":"","validation":"","validationHint":"","customClass":"","labelIconClass":null,"labelIconPosition":"rear","labelTooltip":null,"minLength":null,"maxLength":null,"showWordLimit":false,"prefixIcon":"","suffixIcon":"","appendButton":false,"appendButtonText":"","prependText":"","appendButtonDisabled":false,"buttonIcon":"custom-search","onCreated":"","onMounted":"","onInput":"","onChange":"","onFocus":"","onBlur":"","onEnter":"","onValidate":"","onAppendButtonClick":""},"id":"input44496"}],"formConfig":{"modelName":"formData","refName":"vForm","rulesName":"rules","labelWidth":80,"labelPosition":"top","size":"","labelAlign":"label-left-align","cssCode":"","customClass":"","functions":"","layoutType":"PC","jsonVersion":3,"onFormCreated":"","onFormMounted":"","onFormDataChange":"","saveRemoteOptions":"never","labelFormUniqueName":true,"onFormValidate":"","dataSources":[]}}'
    // state.formJson = JSON.parse(json)
  } finally {
    state.formJsonLoad = false
  }
}

async function handleSubmit() {
  try {
    const data = await FormRendererRef.value.vFormRenderRef.getFormData(true, false)
    const params = Object.keys(data).reduce((prev,key) => {
      const item = data[key]
      if (item instanceof Array && item[0].response) {
        const ids = item.reduce((prevd, dItem) => {
          if(dItem.response?.data?.id) prevd.push(dItem.response.data.id)
          return prevd
        }, [])
        prev[key] = ids.join(',')
      } else {
        prev[key] = data[key]
      }
      return prev
    }, {})
    await clientApi.api.postFormDesignSubmitData({
      id: route.query.id,
      params
    })
    router.push('/public/uploadTip?tip=easyFormSubmitSuccessfully')
  } catch (error) {
    
  }
}
onMounted(() => {
  getFormJson()
})
</script>
<style lang="scss" scoped>
.public-form {
  height: 100%;
  overflow: hidden;
  padding: var(--app-padding);
  display: grid;
  grid-template-rows: 1fr min-content;
  gap: var(--app-padding);
  .form-main {
    overflow: auto;
  }
}
</style>
