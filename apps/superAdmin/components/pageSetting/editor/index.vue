<script lang="ts" setup>

const {item} = defineProps<{
    item
}>()

const pageLayout = ref<any[]>([{
        tag: 'custom',
        component: 'ElRow',
        settingComponent: '',
        className: 'row',
        additionStlyle:"height:100%;border:1px solid red;",
        props:{
            gutter: "20"
        },
        children:[
            {
                tag: 'custom',
                component: 'ElCol',
                className: 'col',
                additionStlyle:"",
                props:{
                    span: 12
                },
            },
            {
                tag: 'custom',
                component: 'ElCol',
                className: 'col',
                additionStlyle:"",
                props:{
                    span: 12
                },
            },
            {
                tag: 'custom',
                component: 'ElCol',
                className: 'col',
                additionStlyle:"",
                props:{
                    span: 12
                },
            },
            {
                tag: 'custom',
                component: 'ElCol',
                className: 'col',
                additionStlyle:"",
                props:{
                    span: 12
                },
            },
            {
                tag: 'custom',
                component: 'ElCol',
                className: 'col',
                additionStlyle:"",
                props:{
                    span: 12
                },
            },{
                tag: 'custom',
                component: 'ElCol',
                className: 'col',
                additionStlyle:"",
                props:{
                    span: 12
                },
            }
        ]
    }])
</script>

<template>
     <PageSettingEditorLayout v-for="item in pageLayout" :key="item.id" :item="item" />
</template>

<style lang="scss" scoped>

</style>