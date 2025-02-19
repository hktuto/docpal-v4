<template>
  <LoadingBg />
  <div class="app" v-loading="state.loading">
    <UploadForm
      v-if="uploadState"
      :fileRequestDetail="fileRequestDetail"
      @submit="handleWorkflow"
    ></UploadForm>
    <UploadPassword v-else @submit="handleGetPublicDocument"></UploadPassword>
  </div>
</template>

<script lang="ts" setup>
import { clientApi } from "api";
import { ElMessage, ElMessageBox } from "element-plus";
const route = useRoute();
const router = useRouter();
const state = reactive({
  uploadState: "",
  loading: false,
  fileRequestDetail: {},
  password: "",
});
const { uploadState, fileRequestDetail } = toRefs(state);
async function handleGetPublicDocument(formData) {
  state.password = formData.password;
  try {
    state.loading = true;
    formData.token = route.query.token;
    state.fileRequestDetail = await clientApi.api
      .getNuxeoPublicFilerequest(formData)
      .then((res) => res.data);
    state.fileRequestDetail.config = getFormData(state.fileRequestDetail.properties);
    state.uploadState = true;
  } catch (error) {
    router.push("/public/uploadTip?tip=linkExpired");
  }
  setTimeout(() => {
    state.loading = false;
  }, 100);
}
function getFormData(properties) {
  const result = <any>{};
  properties.forEach((item) => {
    result[item.id] = item.value;
  });
  return result;
}

async function handleWorkflow(fileList: any) {
  state.loading = true;
  try {
    const formData = new FormData();
    formData.append("taskId", state.fileRequestDetail.task.id);
    formData.append("password", state.password);
    formData.append("token", route.query.token);
    fileList.forEach((file) => {
      console.log(file.raw);

      formData.append("files", file.raw);
    });
    const res = await clientApi.api.postNuxeoPublicFilerequest(formData);
    if (res) router.push("/public/uploadTip?tip=uploadedSuccessfully");
  } catch (error) {}
  setTimeout(() => {
    state.loading = false;
  }, 100);
}
</script>

<style lang="scss" scoped>
.app {
  height: 100vh;
}
</style>
