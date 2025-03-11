<template>
  <el-dialog v-model="state.visible" :close-on-click-modal="false" append-to-body>
    <el-form
      label-position="top"
      ref="formRef"
      :status-icon="true"
      :model="form"
      @submit.native.prevent
    >
      <el-form-item
        :label="$t('login_username')"
        prop="emails"
        :rules="[
          { required: true, message: $t('login_username') + $t('form_common_requird') },
        ]"
      >
        <el-select ref="selectRef" v-model="form.emails" multiple allow-create clearable filterable default-first-option @change="handleSelectChange">
          <el-option
            v-for="item in state.userList"
            :key="item.userId"
            :label="`${item.firstName} ${item.lastName} <${item.email}>`"
            :value="item.userId"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        :label="$t('tableHeader_subject')"
        prop="subject"
        :rules="[
          { required: true, message: $t('tableHeader_subject') + $t('form_common_requird') },
        ]"
      >
        <el-input ref="subjectRef" v-model="form.subject"/>
      </el-form-item>
      <InsertVariables ref="InsertVariablesRef" :inputRef="subjectRef" :variables="subjectFieldList"/>
    </el-form>
    <template #footer>
      <el-button :loading="state.loading" @click="handleSubmit()">{{
        $t("common_submit")
      }}</el-button>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { adminApi, clientApi } from "api";

import type { FormInstance } from 'element-plus'
const emits = defineEmits(["refresh"]);
const props = defineProps(["detail"]);
const { t } = useI18n();
const state = reactive<any>({
  visible: false,
  userList: []
});
const subjectRef = ref()
const subjectFieldList = [
  {label: 'Email', value: '<span>${email}</span>'},
  {label: 'Name', value: '<span>${name}</span>'}
]
const form = ref({
  emails: ["1299962367@qq.com"]
});
function handleOpen() {
  state.visible = true;

  adminApi.api.getFormDesignEmailId(props.detail.id);
  // adminApi.api.postFormDesignSendEmail({
  //   "easyFormId": props.detail.id,
  //   "formLink": "www.baidu.com",
  //   "subject": "abc ${email}, cdf  ${name}  ccc.",
  //   "body": "<html><body><p>body 111, <span th:text=\"${email}\"></span> name: <span th:text=\"${name}\"></span> formLink:<span th:text=\"${formLink}\"></span></p></body></html>",
  //   "userEmails": [
  //     {
  //       "username": "oo",
  //       "email": "1299962367@qq.com"
  //     },
  //     {
  //       "username": "ooyy",
  //       "email": "1299962367@qq.com"
  //     }
  //   ]
  // })
  // clientApi.api.postFormDesignPage({
  //   "name":"easy",
  //   "createdBy":"jack_li",
  //   "modifiedBy":"jack_li",
  //   "pageSize": 20,
  //   "pageNum": 0
  // })
  // clientApi.api.getFormDesignEmailId(props.detail.id)
}
const formRef = ref<FormInstance>()
async function handleSubmit() {
  const valid = await formRef.value.validate()
  // if(!valid) return
  console.log(valid);
  
  // state.visible = false;
}
const selectRef = ref()
function handleSelectChange() {
  selectRef.value.blur()
  setTimeout(() => {
    selectRef.value.focus()
  })
}
// #endregion
onMounted(async () => {
  const { data } = await adminApi.api.postNuxeoIdentityUsers({});
  state.userList = data || ([] as any);
});
defineExpose({ handleOpen });
</script>
<style lang="scss" scoped></style>
