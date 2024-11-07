<script lang="ts" setup>
import { ElTooltip } from 'element-plus';

function open() {
    console.log("open")
}
</script>


<template>
     <div class="icon">
        <ElTooltip content="Folder Cabinet" placement="right">
            <Icon name="lucide:folder-closed" />
        </ElTooltip>
        <div class="label">Folder Cabinet</div>
    </div>
</template>