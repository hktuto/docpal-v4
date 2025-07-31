<template>
  <div class="search-group-bar-filter" v-if="formData && formData.resourceRules">
    <div v-for="(rule, index) in formData.resourceRules" :key="'rule' + index">
      <ElSelect
        class="attribute-row"
        v-model="rule.attribute"
        :placeholder="$t('render.hint.selectPlaceholder')"
        clearable
        filterable
        @change="(val: string) => onResourceAttributeChange(rule, val)"
      >
        <ElOption v-for="attr in resourceAttributes" :key="attr.value" :label="attr.label" :value="attr.value" />
      </ElSelect>
      <div v-if="rule.type === 'number'" class="filter-row">
        <ElSelect v-model="rule.condition" :placeholder="$t('dhList.condition')">
          <ElOption v-for="cond in numberConditions" :key="cond.value" :label="cond.label" :value="cond.value" />
        </ElSelect>
        <template v-if="rule.condition === 'between'">
          <ElInput v-model.number="rule.value[0]" :placeholder="$t('designer.setting.minValue')" />
          <span> - </span>
          <ElInput v-model.number="rule.value[1]" :placeholder="$t('designer.setting.maxValue')" />
        </template>
        <template v-else>
          <ElInput v-model.number="rule.value[0]" :placeholder="$t('dataField.apiFieldValue')" />
        </template>
      </div>
      <div v-else-if="rule.type === 'string'" class="filter-row">
        <ElSelect v-model="rule.condition" :placeholder="$t('dhList.condition')">
          <ElOption v-for="cond in stringConditions" :key="cond.value" :label="cond.label" :value="cond.value" />
        </ElSelect>
        <ElInput v-model="rule.value[0]" :placeholder="$t('dataField.apiFieldValue')" />
      </div>
      <div v-else-if="rule.type === 'select'" class="filter-row">
        <ElSelect v-model="rule.condition" :placeholder="$t('dhList.condition')">
          <ElOption v-for="cond in stringConditions" :key="cond.value" :label="cond.label" :value="cond.value" />
        </ElSelect>
        <ElSelect v-model="rule.value[0]" :placeholder="$t('dataField.apiFieldValue')" clearable filterable>
          <ElOption
            v-for="opt in resourceAttributes.find((a) => a.value === rule.attribute)?.options || []"
            :key="opt.value"
            :label="opt.label"
            :value="opt.value"
            :disabled="opt.disabled"
          />
        </ElSelect>
      </div>
      <el-divider v-if="index !== formData.resourceRules.length - 1 || formData.resourceRules.length > 1" content-position="left">
        <template v-if="index !== formData.resourceRules.length - 1">
          {{ $t(`logic.${formData.condition}`) }}
        </template>
        <ElButton class="delete-button" type="text" icon="el-icon-delete" @click="removeResourceRule(index)" v-if="formData.resourceRules.length > 1" circle />
      </el-divider>
    </div>
    <div class="flex-x-start">
      <el-dropdown v-if="!isOr" type="primary" size="small" split-button @click="addResourceRule" @command="handleCommand">
        {{ $t(`logic.${formData.condition}`) }}
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="and">{{ $t('logic.and') }}</el-dropdown-item>
            <el-dropdown-item command="or">{{ $t('logic.or') }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-button v-else type="primary" size="small" @click="addResourceRule">
        {{ $t('button.add') }}
      </el-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ArrowUp } from '@element-plus/icons-vue'
const props = defineProps({
  isOr: {
    type: Boolean,
    default: false
  },
  formData: {
    type: Object,
    required: true
  },
  resourceAttributes: {
    type: Array as PropType<any[]>,
    required: true
  }
})
const emits = defineEmits(['update:formData'])
const { t } = useI18n()
function handleCommand(command: string) {
  const newFormData = { ...props.formData, condition: command }
  emits('update:formData', newFormData)
}
const numberConditions = [
  { label: t('vxe.renderer.cases.gt'), value: 'gt' },
  { label: t('vxe.renderer.cases.equal'), value: 'eq' },
  { label: t('vxe.renderer.cases.lt'), value: 'lt' },
  { label: t('vxe.renderer.cases.between'), value: 'between' }
]
const stringConditions = [
  { label: t('vxe.renderer.cases.equal'), value: 'eq' },
  { label: t('vxe.renderer.cases.unequal'), value: 'neq' }
]
const selectConditions = stringConditions
// 监听 attribute 变化，自动设置 type
function onResourceAttributeChange(rule: any, attrValue: string) {
  const attr = props.resourceAttributes.find((a) => a.value === attrValue)
  rule.type = attr?.type || ''
  rule.condition = 'eq'
  rule.value = []
  emits('update:formData', props.formData)
}

// 添加/删除规则
function addResourceRule() {
  const newRules = [...props.formData.resourceRules, { attribute: '', type: 'string', condition: 'eq', value: [] }]
  const newFormData = { ...props.formData, resourceRules: newRules }
  emits('update:formData', newFormData)
}
function removeResourceRule(index: number) {
  const newRules = [...props.formData.resourceRules]
  newRules.splice(index, 1)
  const newFormData = { ...props.formData, resourceRules: newRules }
  emits('update:formData', newFormData)
}
defineExpose({
  addResourceRule
})
</script>
<style lang="scss" scoped>
.search-group-bar-filter {
  // border: 1px solid var(--el-border-color);
  border-radius: 4px;
  padding: var(--app-space-xs);

  :deep(.container-wrapper) {
    min-width: unset;
  }

  :deep(.static-content-item) {
    min-height: unset;
  }

  :deep(.el-form .el-row) {
    padding: unset;
  }
}

.rotateFirst {
  transform: rotate(180deg);
  transition: all 0.5s;
}

.rotateLast {
  transition: all 0.5s;
}
.el-divider--horizontal {
  margin: var(--app-space-s) 0 !important;
}
.el-tag {
  margin-right: var(--app-space-xs);
  margin-bottom: var(--app-space-xs);
}
.filter-row {
  display: flex;
  flex-flow: row nowrap;
  gap: var(--app-space-xs);
  align-items: center;
  justify-content: flex-start;
  .el-select:first-child {
    width: 30rem;
  }
}
.attribute-row {
  margin-bottom: var(--app-space-xs);
}
.delete-button {
  height: 1rem;
}
.flex-x-start {
  margin-top: var(--app-space-xs);
}
</style>
