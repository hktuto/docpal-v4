
import type itemVue from '../../../../packages/base/components/app/menu/lazyLoad/list/item.vue';
<script lang="ts" setup>

const { renderSetting } = defineProps<{
    renderSetting:ListData
}>()

const tableRef = ref()

const tableOptions = ref()
const tableEvents = ref()
const actionsColumns = ref([])

function handleActions(){
    alert('handle actions')
}

function navigateTo(){
    alert('navigate to')
}

function openNewTab(){
    alert('open new tab')
}

function reload(){
    alert('reload')
}

</script>


<template>
    <VxeGrid ref="tableRef" v-bind="tableOptions" v-on="tableEvents">
        <template v-if="actionsColumns.length > 0" #action="{row, rowIndex}"> 
                <ElDropdown >
                    <ElButton type="primary" link>
                        <ElIcon><SvgIcon src="/icons/dots.svg"/></ElIcon>
                    </ElButton>
                    <template #dropdown>
                        <ElDropdownMenu>
                            <ElDropdownItem v-for="item in actionsColumns" :key="item.code" :command="{menu:{code:item.code}, row}">{{ item.name }}</ElDropdownItem>
                        </ElDropdownMenu>
                    </template>
                </ElDropdown>       
            </template>
    </VxeGrid>
</template>