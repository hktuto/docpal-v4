<template>
<el-form label-position="top" class="language-form-unit">
    <el-form-item v-for="locale in localeKeys" :label="$t(locale)" >
        <el-input v-model="state.form[locale]"></el-input>
    </el-form-item>
</el-form>
</template>
<script lang="ts" setup>
import { getMetaI18n, localeKeys, saveMetaI18n } from '~/utils/languageHelper'
const props = defineProps<{
    lKey?: string,
}>()
const state: any = reactive({
    form: {

    },
})
async function handleInit () {
    const res = await getMetaI18n(props.lKey)
    
    state.form = {...res}
}
async function handleSubmit () {
    try {
        await saveMetaI18n(props.lKey, state.form)
    } catch (error) {

    }
}

watch(() => props.lKey, () => {
    if(props.lKey) {
        handleInit()
    }
}, { immediate: true })
defineExpose({ handleInit, handleSubmit })
</script>
<style lang="scss" scoped>
.language-form-unit {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--app-space-xs);
}
.el-form-item {
    margin-bottom: unset;
}
</style>
