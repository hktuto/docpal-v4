<script setup lang="ts">
import {ElNotification} from "element-plus";
import {adminApi} from "api";

const{ id } = defineProps<{
    id: number
}>()

const loading = ref(false)
const detailData = ref()
async function getData() {
    loading.value = true
    const { data } = await adminApi.api.getMessageTemplateDetailsId(id)
    detailData.value = data
    loading.value = false
}

const languageOptions = ref<any[]>([])

async function getLanguageOptions() {
    const { data } = await adminApi.api.getWhatsappLanguageList() as any
    languageOptions.value = data.data
}

async function saveTemplate() {
    const template = detailData.value.template
    await adminApi.api.postMessageTemplateEdit(template)
    ElNotification.success('Success');
    await getData()
}

onActivated(async() => {
    await getLanguageOptions()
    await getData()
})

</script>

<template>
    <div class="pageContainer">
        <div v-if="detailData" class="infoContainer section">
            <ElForm :model="detailData.template" label-position="top">
                <ElRow :gutter="12">
                    <ElCol :span="18">
                        <ElFormItem label="Name">
                            <ElInput v-model="detailData.template.name" placeholder="Name" />
                        </ElFormItem>
                    </ElCol>
                    <ElCol :span="6">
                        <ElFormItem label="Language">
                            <ElSelect v-model="detailData.template.language" placeholder="Language">
                                <ElOption v-for="item in languageOptions" :key="item.code" :label="item.name" :value="item.code" />
                            </ElSelect>
                        </ElFormItem>
                    </ElCol>
                </ElRow>
            </ElForm>
            <ElDivider />
            <div class="subSection">
                <div class="title">
                    Header
                </div>
            </div>
            {{detailData.template.header}}
            <MessageTemplateEditor :row="1" v-model="detailData.template.header" />
            <ElDivider />
        </div>
        <div v-if="detailData" class="preview section">
            <MessageTemplatePreviewText
                :template="detailData.template"
                :variables="{'1': 'sean', '2': 'peter', '3': 'john'}"
                title="Whatsapp"
                :showConfirm="true"
                bgColor="#F6EBCF"
            />
            <MessageTemplatePreviewText
                :template="detailData.template"
                :variables="{'1': 'sean', '2': 'peter', '3': 'john'}"
                title="Wechat"
                bgColor="#E2F6CF"
            />
        </div>
    </div>
</template>

<style scoped lang="scss">
.pageContainer{
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    padding: var(--app-space-xs);
    display: grid;
    grid-template-columns:1fr min-content;
    gap: var(--app-space-s);
    background: var(--app-grey-1000);
}
.preview{
    display: flex;
    flex-flow: row wrap;
    gap: var(--app-space-s);
    padding: var(--app-space-s);
    background: var(--app-grey-950) !important;
    overflow: auto;
    min-width: 300px;
}
.subSection{
    display: flex;
    .title{
        font-size: var(--app-text-l);
        font-weight: bold;
    }
}
</style>