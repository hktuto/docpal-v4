<script lang="ts" setup>
const tab = defineModel<any>('tab', { required: true });

const {idOrPath} = defineProps<{ idOrPath: string }>();

</script>

<template>
        
    <div class="pageContainer" >
      
      
       
        browse
    </div>
</template>

<style lang="scss" scoped>

.pageContainer{
    height: 100%;
    position: relative;
    padding: var(--app-space-s);
}
</style>