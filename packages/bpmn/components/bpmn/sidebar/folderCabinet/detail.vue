<script lang="ts" setup>
const props = defineProps<{
    field: any[],
    folderCabinetItem:any
    allField: any[]
}>()
const emits = defineEmits(['update:field'])
const activeName = ref("")




</script>

<template>
    <div class="cabinetDetailContainer">
        <ElCollapse v-model="activeName" >
            
            <ElCollapseItem v-for="item in field" :key="item.attr_id" :title="item.attr_name" :name="item.attr_id">
                <template #title>
                    <div class="collapseTitleContainer" >
                        <div class="indentItem" v-for="i in item.attr_level" :key="i"></div>
                        <SvgIcon :src="item.attr_isFolder?'/icons/folder-general.svg':'/icons/file-general.svg'"/> {{ item.attr_name }}</div>
                </template>
                <div class="fieldContainer">
                    <div class="indentItem" v-for="i in item.attr_level" :key="i"></div>
                    <div class="content">
                        
                        <div class="fieldMappingItemContainer" v-for="metaField in item.field" :key="metaField.metadata">
                            <ElForm label-position="top" @native.enter="() => {}">
                                <ElFormItem :label="metaField.attr_metadata">
                                    
                                    <ElSelect v-model="metaField.attr_formProperty" @change="emits('update:field', field)" clearable>
                                        <ElOption v-for="option in allField" :key="option.attr_id" :label="option.attr_name" :value="option.attr_id" />
                                    </ElSelect>
                                </ElFormItem>
                            </ElForm>
                        </div>
                    </div>
                </div>
            </ElCollapseItem>
        </ElCollapse>
    </div>
</template>

<style scoped lang="scss">
.indentItem{
    width: var(--app-padding);
    height:100px;
    border-left: 1px solid var(--color-grey-050);
}
.collapseTitleContainer{
    --icon-size: 12px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    gap: calc(var(--app-padding) / 2);
    .indentItem{
        height: 48px;
    }
}
.fieldContainer{
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    gap: calc(var(--app-padding) / 2);
    width:100%;
    .content{
        flex: 1 0 auto;
    }
    .fieldMappingItemContainer {
        width: 100%;
    }
}
.fieldMappingItemContainer + .fieldMappingItemContainer{
    border-top: 1px solid var(--color-grey-000);
}
.mappingTitle{
    font-size: 1rem;
    font-weight: 600;
}
</style>