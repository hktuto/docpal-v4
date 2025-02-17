<template>
  <div class="flex gap-2">
    <el-tag
      class="el-icon--left"
      v-for="tag in tags"
      :key="tag"
      closable
      :disable-transitions="false"
      @close="handleClose(tag)"
    >
      {{ tag.name }}
    </el-tag>
    <el-dropdown trigger="click" @command="handleCommand">
      <el-button type="primary" size="small" :icon="Plus">
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="item in allTags" :key="item.key" :command="item"
            :disabled="tags.find(t => t.key === item.key)"
            >{{ item.name }}</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts" setup>
import { Plus } from '@element-plus/icons-vue';
const props = defineProps([
  'allTags','tags'
])
const emits = defineEmits(['change'])
const state = reactive<any>({
  newTags: []
})
const handleClose = (tag: string) => {
  const index = props.tags.findIndex(item => item.key === tag.key)
  props.tags.splice(index, 1);
};
function handleCommand(command: string | number | object) {
  props.tags.push(command)

  emits('change', props.tags)
}
</script>
<style lang="scss">
.el-tag {
  margin-bottom: 3px;
}
.el-dropdown-menu {
  max-height: 30vh;
}
</style>
