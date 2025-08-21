<script lang="ts" setup>
const field = defineModel<any[]>('field', { required: true })
const props = defineProps<{
  folderCabinetItem: any
  allField?: any[]
}>()
const emits = defineEmits(['update:fields', 'update:fieldData'])
const activeName = ref('')
const { t } = useI18n()

const editorProvider = inject(EDITOR_PROVIDER)
if (!editorProvider) {
  throw createError('editor provider not found')
}

function handleCheckBox(status: boolean, item: any) {
  const level = item.attr_level
  const id = item.attr_id
  const levelList: any = [level]
  const index = field.value.findIndex(i => i.attr_id === id)

  // 勾選時將上級和子集合全部勾選
  if (status) {
    // 遍歷上級
    for (let i = index; i >= 0; i--) {
      if (field.value[i].attr_level < level && !levelList.includes(field.value[i].attr_level)) {
        levelList.push(field.value[i].attr_level)
        field.value[i].check = true
      }
    }

    // 遍歷子集合
    // for (let i = index + 1; i < field.value.length; i++) {
    //   if (field.value[i].attr_level > level) {
    //     field.value[i].check = true
    //   }
    //   if (field.value[i].attr_level === level) {
    //     break
    //   }
    // }
  } else {
    // 取消勾選，下級全部取消
    for (let i = index + 1; i < field.value.length; i++) {
      if (field.value[i].attr_level <= level) {
        break
      }
      field.value[i].check = false
    }
  }

  emits('update:fields', field.value.filter(i => i.check))
}

function handleUpdateField(item: any) {
  if (item.check === true) {
    emits('update:fieldData', item)
  }
}

function getLabelList(labelRules: string) {
  return labelRules ? jsonParse(labelRules) : [{ dataType: 'string', metadata: 'fc:docTitle', noDelete: true }]
}

function jsonParse(str: any) {
  try {
    return JSON.parse(str)
  } catch (e) {
    return str
  }
}
</script>

<template>
  <div class="cabinetDetailContainer">
    <ElCollapse v-model="activeName">
      <ElCollapseItem v-for="item in field" :key="item.attr_id" :title="item.attr_name" :name="item.attr_id">
        <template #title>
          <div class="collapseTitleContainer">
            <div class="indentItem" v-for="i in item.attr_level" :key="i"></div>
            <el-checkbox @click.stop v-model="item.check" @change="(value: boolean) => handleCheckBox(value,item)" />
            <SvgIcon :src="item.attr_isFolder?'/icons/folder-general.svg':'/icons/file-general.svg'" />
            {{ item.attr_name }}
          </div>
        </template>
        <div class="fieldContainer">
          <div class="indentItem" v-for="i in item.attr_level" :key="i"></div>
          <div style="width: 100%">
            <div class="content">
              <ElForm label-position="top" @sumit.stop>
                <div>
                  Folder name rule:
                  <template v-for="(i, index) in getLabelList(item.rule)" :key="index">
                    <el-tag v-if="i.metadata">{{ $t(i.metadata) }}</el-tag>
                    <template v-if="index !== getLabelList(item.rule).length - 1"> -</template>
                  </template>
                </div>
                <ElFormItem v-for="metaField in item.field" :key="metaField.metadata" :label="metaField.attr_metadata">
                  <ElSelect v-model="metaField.attr_formProperty" @change="handleUpdateField(item)" clearable
                            :disabled="editorProvider.readonly.value">
                    <ElOption v-for="option in allField" :key="option.attr_id" :label="option.attr_name"
                              :value="option.attr_id" />
                  </ElSelect>
                </ElFormItem>

                <el-divider v-if="!item.isFolder" />

                <ElFormItem v-if="!item.isFolder" label="File">
                  <ElSelect @change="handleUpdateField(item)" clearable :disabled="editorProvider.readonly.value">
                    <ElOption v-for="option in allField" :key="option.attr_id" :label="option.attr_name"
                              :value="option.attr_id" />
                  </ElSelect>
                </ElFormItem>
              </ElForm>
            </div>
          </div>
        </div>
      </ElCollapseItem>
    </ElCollapse>
  </div>
</template>

<style scoped lang="scss">
.indentItem {
  width: var(--app-space-s);
  height: 100px;
  border-left: 1px solid var(--app-grey-825);
}

.collapseTitleContainer {
  --icon-size: 12px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  gap: calc(var(--app-space-xs) / 2);

  .indentItem {
    height: 48px;
  }
}

.fieldContainer {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  gap: calc(var(--app-space-xs) / 2);
  width: 100%;
  background-color: #f9f7f7;

  .content {
    flex: 1 0 auto;
  }

  .fieldMappingItemContainer {
    width: 100%;
  }
}

.fieldMappingItemContainer + .fieldMappingItemContainer {
  border-top: 1px solid var(--app-grey-800);
}

.mappingTitle {
  font-size: 1rem;
  font-weight: 600;
}
</style>