<script setup lang="ts">
import draggable from 'vuedraggable'
import { More, Edit, Delete, DeleteFilled } from '@element-plus/icons-vue'
import { reactive } from 'vue'
import { adminApi } from 'api'

const { t } = useI18n()
const FormRef = ref()
const rules = reactive({
  label: [
    {
      required: true,
      message: t('render.hint.fieldRequired', { name: t('table_label') }),
      trigger: 'blur'
    }
  ]
})
const state = reactive({
  visible: false,
  displayFieldList: [],
  systemFieldList: []
})
const editForm = reactive({})

function cloneItem(el: any) {
  if (!state.displayFieldList.find(item => item.key === el.key)) {
    const newItem = deepCopy(el)
    state.displayFieldList.push(newItem)
  }
}

function removeItem(el: any) {
  const index = state.displayFieldList.findIndex(item => item.key === el.key)
  if (index !== -1) {
    state.displayFieldList.splice(index, 1)
  }
}

function openDialog(item: any) {
  editForm.key = item.key
  editForm.label = item.label
  editForm.allowUserEdit = item.allowUserEdit
  state.visible = true
}

async function saveField() {
  // 檢查是否填寫數據
  try {
    await FormRef.value.validate()
  } catch (e) {
    return
  }

  const displayTarget = state.displayFieldList.find(item => item.key === editForm.key)
  if (displayTarget) Object.assign(displayTarget, editForm)

  // const systemTarget = state.systemFieldList.find(item => item.key === editForm.key)
  // if (systemTarget) Object.assign(systemTarget, editForm)

  state.visible = false
}

async function handleSubmit() {
  try {
    console.log(11,state.displayFieldList)
    const newProperties = state.displayFieldList.reduce((acc, item, index) => {
      acc[item.key] = { ...item, sort: index }
      return acc
    }, {})

    console.log(33,newProperties)
    // await adminApi.api.putUserProfileSetting({ properties: newProperties })
  } catch (e) {
    console.error(e)
  }
}

async function init() {
  let { properties } = await adminApi.api.getUserProfileSetting().then(res => res.data)
  state.displayFieldList = Object.keys(properties)
    .map(key => ({
      readyOnly: properties[key].readyOnly,
      allowUserEdit: properties[key].allowUserEdit,
      display: properties[key].display,
      label: properties[key].label,
      key,
      sort: properties[key].sort ?? 0
    }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ sort, ...rest }) => rest)

  state.systemFieldList = await adminApi.api.getUserSystemFields().then(res => res.data)
}

onMounted(() => {
  init()
})

</script>

<template>
  <div>
    <h3>{{ $t('User Profile View') }}</h3>
    <el-divider />

    <el-row :gutter="30">
      <el-col :span="12">
        <h3>{{ $t('Display Field') }}</h3>
        <el-divider />

        <draggable
          class="dragArea list-group"
          :list="state.displayFieldList"
          group="people"
          @change="log"
          item-key="id"
        >
          <template #item="{ element }">
            <div class="list-group-item">
              <div class="field-row">
                <el-icon class="fa fa-align-justify handle">
                  <More />
                </el-icon>

                <span style="font-weight: bold;">{{ element.label }} </span>

                <div class="icon-actions">
                  <el-icon disabled="element.allowUserEdit">
                    <Edit />
                  </el-icon>
                  <el-icon @click="removeItem(element)">
                    <DeleteFilled />
                  </el-icon>
                </div>
              </div>
            </div>
          </template>
        </draggable>
      </el-col>

      <el-col :span="12">
        <h3>{{ $t('System Field') }}</h3>
        <el-divider />

        <draggable
          class="dragArea list-group"
          :list="state.systemFieldList"
          :group="{ name: 'people', pull: 'clone', put: false }"
          :clone="cloneItem"
          item-key="id"
        >
          <!--  TODO 需要限制原本的順序列不允許排序 -->
          <template #item="{ element }">
            <div class="list-group-item">
              <div class="field-row">
                <span class="list-group-item" style="font-weight: bold;">{{ element.label }} </span>

                <div class="icon-actions">
                  <span style="font-size: 12px">{{ $t('System Field') }}</span>
                  <el-icon disabled="element.allowUserEdit" @click="openDialog(element)">
                    <Edit />
                  </el-icon>
                  <el-icon>
                    <Delete />
                  </el-icon>
                </div>
              </div>
            </div>
          </template>
        </draggable>
      </el-col>
    </el-row>

    <el-button id="UserProfileView__Save" type="primary" @click="handleSubmit">{{ $t('common_save2') }}</el-button>
  </div>

  <el-dialog v-model="state.visible" :title="t('Edit Field')" width="600px">
    <el-form ref="FormRef" :model="editForm" :rules="rules" label-position="top">
      <el-form-item :label="t('label')" prop="label">
        <el-input v-model="editForm.label" />
      </el-form-item>
      <el-divider />
      <el-form-item :label="t('Allow User Edit')">
        <el-switch v-model="editForm.allowUserEdit" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="actions">
        <ElButton id="UserProfileView__Dialog__Cancel" type="info" @click="state.visible = false">
          {{ $t('dpButtom_cancel') }}
        </ElButton>
        <ElButton id="UserProfileView__Dialog__Save" type="primary" @click="saveField">{{ $t('common_save') }}
        </ElButton>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
.handle {
  float: left;
  padding-top: 8px;
  padding-bottom: 8px;
  margin-right: 10px;
}

.field-row {
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
}

.icon-actions {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
