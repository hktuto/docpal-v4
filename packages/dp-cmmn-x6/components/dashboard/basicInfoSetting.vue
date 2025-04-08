<template>
<el-dialog v-model="state.visible" :title="$t('dashboard.setting')"
    class="scroll-dialog processSetting-dialog"
    append-to-body 
    :close-on-click-modal="false"
    >
    <div>
        <h3>{{ $t('caseManage.fieldsLayout') }}</h3>
        <draggable
            class="list-group flex-zoom"
            :list="state.setting.layout"
            group="people"
            itemKey="id"
        >
            <template #item="{ element, index }">
            <div :style="`--field-width: ${element.width}`" class="list-group-item">
              <div class="topRow">

                <SvgIcon class="handle-icon" src="/icons/drag.svg" />
                {{ element.name }}
                <el-dropdown @command="(command: string) => handleCommand(command, element)">
                    <SvgIcon class="zoom-icon" src="/icons/tools/zoom.svg" />
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item v-for="item in widthList" :key="item.width" :command="item.width">{{ item.width }}</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
              </div>
                <ElForm label-position="top" class="row" size="small">

                  <ElFormItem label="Default value" >
                    <el-input v-model="state.setting.defaultValue[element.id]" />
                  </ElFormItem>
                  <ElFormItem label="Label" >
                    <el-input v-model="state.setting.label[element.id]" />
                  </ElFormItem>
                </ElForm>
            </div>
            </template>
        </draggable>
    </div>
    <div class="avalibleFields">
        <h3>{{ $t('caseManage.avalibleFields') }}</h3>
        <ElInput v-model="filterText" placeholder="Filter" class="filter-input" />
        <draggable
            class="list-group"
            :list="filterList"
            group="people"
            itemKey="id"
        >
            <template #item="{ element, index }">
                <div class="list-group-item">
                    <SvgIcon class="handle-icon" src="/icons/drag.svg" />
                    {{ element.name }}
                </div>
            </template>
        </draggable>
    </div>
    <template #footer>
      <div class="footer-grid">
        <el-button type="danger" @click="handleDelete">{{$t('common_delete')}}</el-button>
        <el-button type="primary" :loading="state.loading" @click="handleSubmit">{{$t('common_submit')}}</el-button>
      </div>
    </template>
</el-dialog>
</template>
<script lang="ts" setup>
import { ElMessageBox } from 'element-plus'
import draggable from "vuedraggable";
const emits = defineEmits([
    'refresh', 'delete'
])
const {t} = useI18n()

const filterText = ref("");

const filterList = computed(() => {
  return state.allList.filter((item: any) => {
    return !filterText.value || item.name.toLowerCase().includes(filterText.value.toLowerCase());
  });
});

const widthList = [
    { width: '25%', label: '25%' },
    { width: '33%', label: '33%' },
    { width: '50%', label: '50%' },
    { width: '75%', label: '75%' },
    { width: '100%', label: '100%' },
]
const state = reactive<any>({
    loading: false,
    visible: false,
    setting: {},
    allList: []
})
async function handleSubmit () {
    state.loading = true
    try {
        emits('refresh', { 
            layout: state.setting.layout,
            defaultValue: state.setting.defaultValue,
            label: state.setting.label
        })
    } catch (error) {
        state.loading = false
    }
    state.visible = false
    state.loading = false
}
function handleOpen(setting: any, allList: any) {
    if(!allList) allList = []
    state.visible = true
    setTimeout(async () => {
        if(!setting.layout) setting.layout = []
        if(!setting.label) setting.label = setting.layout.reduce((prev:any, item:any) => {
          prev[item.id] = item.name
          return prev
        }, {})
        state.setting = deepCopy(setting)
        state.allList = allList.filter((item: any) => !state.setting.layout.find((l: any) => item.id === l.id))
        state.loading = false
    })
}
function handleCommand(command: string, row: any) {
    row.width = command
}
async function handleDelete() {
    const action = await ElMessageBox.confirm(`${t('msg_confirmWhetherToDelete')}`)
    if(action !== 'confirm') return
    emits('delete')
    state.visible = false
}
defineExpose({ handleOpen })
</script>
<style lang="scss" scoped>
.list-group {
    min-height: 200px;
    overflow: auto;
}
.list-group-item {
    display: flex;
    flex-flow: column nowrap;
    // grid-template-columns: min-content 1fr min-content;
    background-color: #fff;
    padding: var(--app-space-xs);
    margin-bottom: var(--app-space-xs);
    .el-input {
        width: 100%;
    }
    .topRow{
      width:100%;
      display: grid;
      grid-template-columns: min-content 1fr min-content;
    }
}
.flex-zoom {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    row-gap: var(--app-space-xs);
    column-gap: var(--app-space-xs);
    .list-group-item {
        min-width: 100px;
        height: fit-content;
        gap: var(--app-space-xs);
        width: calc(var(--field-width, 50%) - var(--app-space-xs));
        --icon-size: 1.14rem;
        margin-bottom: unset;
    }
}

</style>
<style lang="scss" >
.processSetting-dialog {
    .el-dialog__body {
        display: grid;
        grid-template-columns: 1fr 30%;
        gap: var(--app-space-xs);
        overflow: auto;
        .avalibleFields{
          grid-template-rows: min-content min-content 1fr;
        }
        & > div {
            background-color: #F2F8F9;
            padding: var(--app-space-xs);
            display: grid;
            grid-template-rows: min-content 1fr;
            overflow: hidden;
        }
    }
    
}
</style>
