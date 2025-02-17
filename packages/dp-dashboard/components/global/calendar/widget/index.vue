<script lang="ts" setup>
import { ElMessageBox } from 'element-plus'
const emits = defineEmits(["delete", "refreshSetting"]);
const routerProvider = inject(MenuRouterKey)
const { t } = useI18n()

const showPreview = ref(false)
const props = withDefaults( defineProps<{
    dates?: any;
    setting?: any;
    hideSetting?: boolean,
}>() , {
    setting: {},
    hideSetting: false
})

function resize() {

}
const settingRef = ref()
function openSetting() {
    settingRef.value.open()
}

function handleSubmit(data){

}

onDeactivated(() => {
    if(!props.hideSetting) {
        showPreview.value = false
    }
})

async function handleDelete() {
  const action = await ElMessageBox.confirm(`${t("msg_confirmWhetherToDelete")}`);
  if (action !== "confirm") return;
  emits("delete");
}


defineExpose({
  resize
});

</script>

<template>
    <ElCard ref="cardRef" class="dashboard-item dashboard-item-card">
        <template #header="{ close, titleId, titleClass }">
            <h4>Calendar</h4>
            <div v-if="!hideSetting"  class="settingIcons">
                <Icon :name="showPreview ? 'lucide:eye-closed' : 'lucide:eye'" class="el-icon--right" @click="showPreview = !showPreview" />
                <Icon name="lucide:settings"  @click="openSetting" />
            </div>
        </template>

        <el-skeleton  v-if="!hideSetting && !showPreview" :rows="5" >
        </el-skeleton>
        <div v-else class="main no-drag" @dragstart="stopEvent" @dragover="stopEvent" @drop="stopEvent">
            <CalendarViewer :options="setting" />
        </div>
    </ElCard>
        <CalendarWidgetSetting ref="settingRef" :setting="setting" @submit="(setting) => $emit('refreshSetting', setting)" @delete="handleDelete" />
</template>

<style lang="scss" scoped>
.settingIcons{
 font-size: var(--app-font-size-l);
 > * {
    cursor: pointer;
 }
}
</style>