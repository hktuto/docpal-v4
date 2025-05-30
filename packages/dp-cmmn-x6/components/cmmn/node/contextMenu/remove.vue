<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { nextTick } from 'vue'
const { t } = useI18n()

const props = defineProps<{
    node: any,
    view: any,
}>()

const emits = defineEmits(['clicked'])

function removeNode(){
    emits('clicked');
    nextTick(() => {
        props.node.remove();
    })
}
</script>

<template>
    <el-popconfirm :title="t('contextMenu.confirmDelete')" @confirm="removeNode">
        <template #reference>
            <div class="actionItem">
                
                <SvgIcon src="/icons/menu/trash.svg"></SvgIcon>
                <div class="label">{{ t('contextMenu.remove') }}</div>
            </div>
        </template>
    </el-popconfirm>
</template>

<style scoped lang="scss">

</style>
