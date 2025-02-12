<script setup lang="ts">
import {ElNotification} from "element-plus";
import {adminApi} from "api";

const{ id } = defineProps<{
    id: number
}>()
const routerProvider = inject(MenuRouterKey)
if(!routerProvider) {
    throw createError('menu manger not found')
}
const { t } = useI18n()
const loading = ref(false)
const detailData = ref()
async function getData() {
    loading.value = true
    const { data } = await adminApi.api.getMessageTemplateDetailsId(id)
    detailData.value = data
    console.log("detailData", detailData.value)
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

async function init(){
    await getLanguageOptions()
    await getData()
}

async function saveData(){
    try{
        const params = detailData.value.template
        params.recordId = id
        const {data} = await adminApi.api.postMessageTemplateEdit(params)
        routerProvider?.message.success(t('dpMsg_success'))
    }catch(e){
        routerProvider?.message.error(t('dpMsg_fail'))
    }finally{
        init()
    }
}

onActivated(async() => {
    await init()
})

</script>

<template>
    <div class="pageContainer">
        <div v-if="detailData" class="infoContainer section">
            <div class="form">
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
                <!-- {{detailData.template.header}} -->
                <MessageTemplateEditor :row="1" v-model:content="detailData.template.header" v-model:parameters="detailData.template.hedaerParameters" />
                
                <ElDivider />
                <div class="subSection">
                    <div class="title">
                        Body
                    </div>
                </div>
                <MessageTemplateEditor 
                    :row="6" 
                    v-model:content="detailData.template.body" 
                    v-model:parameters="detailData.template.bodyParameters" />
                
                <ElDivider />
                <div class="subSection">
                    <div class="title">
                        Footer
                    </div>
                </div>
                <MessageTemplateEditor 
                    :row="1" 
                    v-model:content="detailData.template.footer" 
                    :show-variables="false" />

                <ElDivider />
                <ElSwitch v-model="detailData.template.needConfirm" active-text="Confirm" inactive-text="No confirm" />
                <ElFormItem label="Confirm Button">
                        <ElInput v-model="detailData.template.confirmButtonName" />
                    </ElFormItem>
                <ElDivider />
                <template v-if="detailData.template.needConfirm && detailData.template.confirmButtonName">
                    <div class="subSection">
                        <div class="title">
                            Content
                        </div>
                    </div>
                    <MessageTemplateEditor 
                        :row="6" 
                        v-model:content="detailData.template.textMessage" 
                        v-model:parameters="detailData.template.textParameters" />
                </template>
            </div>
            <div class="actions">
                <el-popconfirm title="All unsave change will lost"
                @confirm="init"
                >
                    <template #reference>
                        <ElButton text >Discard</ElButton>
                    </template>
                </el-popconfirm>
                <ElButton type="primary" @click="saveData">Save</ElButton>
            </div>
        </div>
        <div v-if="detailData" class="preview section">
            <MessageTemplatePreviewText
                :template="detailData.template"
                title="Whatsapp"
                :showConfirm="true"
                bgColor="#F6EBCF"
            />
            <MessageTemplatePreviewText
                :template="detailData.template"
                title="Wechat"
                :showConfirm="false"
                bgColor="#E2F6CF"
            />
        </div>
    </div>
</template>

<style scoped lang="scss">
.actions{
    display: flex;
    gap: var(--app-space-xs);
    justify-content: space-between;
    align-items: center;
}
.infoContainer{
    display: grid;
    grid-template-rows: 1fr min-content;
    gap: var(--app-space-xs);
    overflow: hidden;
    .form {
        overflow: auto;
    }
}
.pageContainer{
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    padding: var(--app-space-s);
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