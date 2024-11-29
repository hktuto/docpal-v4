<script lang="ts" setup>

const { tableSetting } = defineProps<{
    tableSetting: ListData
}>() 
const renderSetting = defineModel<ListSetting>('tableSetting', { required: true })




</script>

<template>
form setting

</template>