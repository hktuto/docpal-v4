<template>
  <div class="menu-list">
    <div
      v-for="item in list"
      :class="{ ellipsis: true, 'menu-item': true, cur: item[valueKey] === state.active }"
      :key="item[valueKey]"
      :title="item[labelKey]"
      @click="handleClick(item)"
    >
      {{ item[labelKey] }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import {} from 'element-plus'

const props = withDefaults(
  defineProps<{
    list: any[];
    labelKey: string;
    valueKey: string;
  }>(),
  {
    labelKey: 'name',
    valueKey: 'id'
  }
)

const emits = defineEmits(['click'])
const state = reactive<any>({
  active: ''
})

function handleClick(item: any) {
  state.active = item[props.valueKey]
  emits('click', state.active, item)
}

function setActive(activeName: string) {
  state.active = activeName
  console.log('activeName--', activeName)
}

defineExpose({ setActive })
</script>

<style lang="scss" scoped>
.menu-list {
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}

.menu-item {
  line-height: 24px;
  padding: 3px;
  cursor: pointer;
  border-radius: 3px;

  &:hover {
    background-color: var(--app-primary-color);
    color: var(--app-grey-900);
    opacity: 0.8;
  }

  &.cur {
    background-color: var(--app-primary-color);
    color: var(--app-grey-900);
  }
}
</style>
