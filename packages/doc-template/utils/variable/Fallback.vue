<template>
    <form @submit="send">
        <label>Edit the fallback value in case we don't find the {{ label }}:</label>
        <input type="text" v-model="value" placeholder="there" />
        <input type="submit" value="Save" />
    </form>
</template>

<script lang="ts" setup>
import values from './values'
const props = defineProps<{
  name: string,
  fallback: string,
  command: Function
}>()
const value = ref()
const label = computed(() => {
   if (props.name in values) {
        return values[props.name]
    }
    return null
})
function send () {
    props.command(value)
}
</script>
