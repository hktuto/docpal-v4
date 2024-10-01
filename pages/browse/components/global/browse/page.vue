<script lang="ts" setup>
const tab = defineModel<any>('tab', { required: true });

</script>

<template>
    <div class="pageContainer" >
      
      <Teleport  v-if="tab.icon" :to="`#tab-header-${tab.parent}-${tab.id} > .icon`">
            <Icon :name="tab.icon" />
        </Teleport>
        <Teleport  v-if="tab.label" :to="`#tab-header-${tab.parent}-${tab.id} > .label`">
            <div class="label">
                Browse Page Title 
            </div>  
        </Teleport>
       
    </div>
</template>

<style lang="scss" scoped>

.pageContainer{
    height: 100%;
    position: relative;
    padding: var(--app-space-s);
}
</style>