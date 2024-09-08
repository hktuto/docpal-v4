<script lang="ts" setup generic="T extends ListSchema, U extends listOptions">
import type { ListSchema, listOptions} from './types'
const props = defineProps<{
    schema: ListSchema,
    options: listOptions
}>()


</script>


<template>
    <div class="listContainer">
        table
    </div>
</template>


