<template>
  <div class="pageContainer--padding" style="height: 100%; overflow: auto">
    <el-row>
      <el-col :span="12">
        <el-form ref="formRef" :model="state.form" label-width="auto" @submit.native.prevent>
          <el-form-item label="Id Generator Name" label-position="top" prop="name"
                        :rules="[{ required: true, message: t('tableHeader_name') + t('render.hint.fieldRequired') }]">
            <el-input clearable v-model="state.form.name" />
          </el-form-item>
          <el-form-item label="Prefix" label-position="top" prop="prefix"
                        :rules="[{ required: true, message: t('Prefix') + t('render.hint.fieldRequired') }]">
            <el-input-tag v-model="state.prefix" draggable clearable placeholder="Prefix" tag-effect="dark"
                          tag-type="primary" @change="handleChangeTag(true)" @add-tag="handleAddTag(true)">
            </el-input-tag>
          </el-form-item>
          <div class="mb-4" style="margin-bottom:18px">
            <el-button @click="handleDate(true,true)">Date</el-button>
            <el-button @click="handleVariable(true,false)">Variable</el-button>
          </div>
          <el-form-item label="Suffix" label-position="top">
            <el-input-tag v-model="state.suffix" draggable clearable placeholder="Suffix" tag-effect="dark"
                          tag-type="primary" @change="handleChangeTag(false)" @add-tag="handleAddTag(false)">
            </el-input-tag>
          </el-form-item>
          <div class="mb-4" style="margin-bottom:18px">
            <el-button @click="handleDate(false,true)">Date</el-button>
            <el-button @click="handleVariable(false,false)">Variable</el-button>
          </div>
          <el-form-item label="Id digit" label-position="top" prop="idDigit"
                        :rules="[{ required: true, message: t('Id digit') + t('render.hint.fieldRequired') }]">
            <el-input type="number" min="1" clearable v-model="state.form.idDigit" />
          </el-form-item>
          <el-form-item label="Starting Number" label-position="top" prop="startNumber"
                        :rules="[{ required: true, message: t('Starting Number') + t('render.hint.fieldRequired') }]">
            <el-input type="number" min="0" clearable v-model="state.form.startNumber" />
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="handleSubmit(formRef)">
          {{ t('common_save') }}
        </el-button>
        <el-divider />
      </el-col>
    </el-row>
    <el-col :span="12">
      <h3>{{ t('Example') }}</h3>
      <h4>{{ t('Setting') }}</h4>
      <h5 v-if="state.form.prefix.length > 0">{{ t('Prefix') }}</h5>
      <div v-for="(item,index) in state.form.prefix">
        <el-form-item :label="handleLabel(item.expression,item.value)" label-position="top">
          <el-input :disabled="item.type == 'date'" v-model="item.value"
                    :formatter="(value: string) => handleExampleData(item.type,value)" />
        </el-form-item>
      </div>
      <h5 v-if="state.form.suffix.length > 0">{{ t('Suffix') }}</h5>
      <div v-for="(item,index) in state.form.suffix">
        <el-form-item :label="handleLabel(item.expression,item.value)" label-position="top">
          <el-input :disabled="item.type == 'date'" v-model="item.value"
                    :formatter="(value: string) => handleExampleData(item.type,value)" />
        </el-form-item>
      </div>
      <el-divider />
      <el-form-item :label="t('Id')" label-position="top">
        <el-input disabled v-model="state.uniqueId" />
      </el-form-item>
      <el-button @click="handleGenerateId">
        {{ t('Generate') }}
      </el-button>
    </el-col>
  </div>

  <el-dialog v-model="state.dialogFormVisible" width="500"
             :title="state.isAddVariable ? t('New Date Variable') : t('New Text Variable')">
    <FormRenderer ref="FormRendererRef" :form-json="formJson" />
    <template #footer>
      <el-button type="primary" @click="handleAddItemTag">
        {{ t('common_submit') }}
      </el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import type { FormInstance } from 'element-plus'
import { adminApi } from 'api'
import formJson from './form.vform.json'

const formRef = ref<FormInstance>()
const routerProvider = inject(MenuRouterKey)
const { t } = useI18n()
const { id } = defineProps<{
  id: string;
}>()
const FormRendererRef = ref()
const state = reactive({
  loading: false,
  isAddVariable: true,
  dialogFormVisible: false,
  prefix: [],
  suffix: [],
  uniqueId: '',
  form: {
    id: '',
    name: '',
    prefix: [],
    suffix: [],
    idDigit: 4,
    startNumber: 1
  }
})

interface ItemRule {
  index: number,
  expression: string,
  type: string,
  value: string
}

let itemData = reactive<ItemRule>({
  index: 0,
  expression: '',
  type: '',
  value: ''
})

function handleLabel(key: string, value: string) {
  return key.includes('{date(') ? 'Date(' + value + ')' : handleDataFormat(key)
}

function handleDataFormat(value: string) {
  const regex = /\(([^)]+)\)/
  const match = value.match(regex)
  return match ? match[1] : value
}

function handleExampleData(type: string, value: string) {
  try {
    if (type === 'date') {
      return formatDate(new Date(), value)
    }
    return value
  } catch (e) {
    console.log(e)
  }
}

function handleId() {
  return String(state.form.startNumber).padStart(state.form.idDigit, '0')
}

function handleGenerateId() {
  try {
    const prefix = state.form.prefix
    const suffix = state.form.suffix
    let id = ''

    if (prefix.length > 0) {
      prefix.forEach((item: any) => {
        id += handleExampleData(item.type, item.value)
      })
    }

    if (suffix.length > 0) {
      suffix.forEach((item: any) => {
        id += handleExampleData(item.type, item.value)
      })
    }

    state.uniqueId = id + handleId()
  } catch (e) {
    console.log(e)
  }
}

/**
 * @param status (true: prefix,false: suffix)
 * @param setting (true: date setting, false: var setting)
 */
async function handleDate(status: boolean, setting: boolean) {
  state.isAddVariable = setting
  itemData.type = 'date'
  setTimeout(() => {
    FormRendererRef.value.vFormRenderRef.resetForm()
    FormRendererRef.value.vFormRenderRef.setFormData({ isShow: true, isPrefix: status, isDateType: setting })
  }, 100)
  state.dialogFormVisible = true
}

/**
 * @param status (true: prefix,false: suffix)
 * @param setting (true: date setting, false: var setting)
 */
function handleVariable(status: boolean, setting: boolean) {
  state.isAddVariable = setting
  itemData.type = 'string'
  setTimeout(() => {
    FormRendererRef.value.vFormRenderRef.resetForm()
    FormRendererRef.value.vFormRenderRef.setFormData({ isShow: false, isPrefix: status, isDateType: setting })
  }, 100)
  state.dialogFormVisible = true
}

async function handleAddItemTag() {
  let formData = await FormRendererRef.value.vFormRenderRef.getFormData()
  if (formData.isDateType) {
    itemData.expression = '{date(' + formData.dateFormat + ')}'
    itemData.value = formData.dateFormat
  } else {
    itemData.expression = '{var(' + formData.variableName + ')}'
    itemData.value = formData.variableValue
  }

  if (formData.isPrefix) {
    itemData.index = state.form.prefix.length
    state.prefix.push(itemData.expression)
    state.form.prefix.push(deepCopy(itemData))
  } else {
    itemData.index = state.form.suffix.length
    state.suffix.push(itemData.expression)
    state.form.suffix.push(deepCopy(itemData))
  }
  itemData = {}
  state.dialogFormVisible = false
}

/**
 * 移除手動在輸入的數據
 * @param status (true: prefix,false: suffix)
 */
function handleAddTag(status: boolean) {
  if (status) {
    state.prefix.pop()
    state.form.prefix.pop()
  } else {
    state.suffix.pop()
    state.form.suffix.pop()
  }
}

/**
 * @param status (true: prefix,false: suffix)
 */
function handleChangeTag(status: boolean) {
  if (status) {
    if (!state.prefix) {
      state.prefix = []
      return
    }
    state.form.prefix = handleList(state.prefix, state.form.prefix)
  } else {
    if (!state.suffix) {
      state.suffix = []
      return
    }
    state.form.suffix = handleList(state.suffix, state.form.suffix)
  }
}

function handleList(formList: any, oldList: any) {
  const list = []
  let index = 0
  formList.forEach((col: string) => {
    const oldItem = oldList.find((item: any) => item.expression === col)
    if (oldItem) {
      oldItem.index = index
      list.push(deepCopy(oldItem))
    } else {
      const newItem = {
        index: index,
        expression: col,
        type: 'string'
      }
      list.push(newItem)
    }
    index += 1
  })
  return list
}

const emits = defineEmits([
  'refresh',
  'success'
])

async function handleSubmit(formEl: FormInstance | undefined) {
  if (!formEl) return
  try {
    formEl.validate(async (valid) => {
      if (valid) {
        state.loading = true
        if (!id) {
          const data = await adminApi.api.postIdTemplates({ name: state.form.name }).then(res => res.data)
          state.form.id = data.id
          await adminApi.api.putIdTemplatesId(data.id, { ...data, ...state.form })

          routerProvider?.message.success(t('tip_createdSuccessMsg', {
            modelName: t('Unique Id'),
            name: state.form.name
          }))
        } else {
          const data = await adminApi.api.putIdTemplatesId(id, state.form)
          routerProvider?.message.success(t('tip_updateSuccessMsg', {
            modelName: t('Unique Id'),
            name: state.form.name
          }))
        }
      }
      emits('success', state.form)
    })
  } catch (error) {
    console.log(error)
    emits('refresh')
  }
  state.loading = false
}

async function init() {
  if (!id) {
    state.uniqueId = ''
    state.form = {
      id: '',
      name: '',
      prefix: [],
      suffix: [],
      idDigit: 4,
      startNumber: 1
    }
    state.prefix = []
    state.suffix = []
    formRef.value.resetFields()
    return
  }
  state.form = await adminApi.api.getIdTemplatesId(id).then(res => res.data)
  setTag(true, state.form.prefix)
  setTag(false, state.form.suffix)
}

function setTag(status: boolean, list: any) {
  if (list.length < 1) return
  if (status) {
    state.prefix = list.map((item: any) => item.expression)
  } else {
    state.suffix = list.map((item: any) => item.expression)
  }
}

onActivated(async () => {
  init()
})

</script>
<style lang="scss" scoped>
.button-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

</style>