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
                          tag-type="primary" @change="handleChangeTag(true)">
            </el-input-tag>
          </el-form-item>
          <div class="mb-4" style="margin-bottom:18px">
            <el-button @click="handleDate(true,true)">Date</el-button>
            <el-button @click="handleVariable(true,false)">Variable</el-button>
          </div>
          <el-form-item label="Suffix" label-position="top">
            <el-input-tag v-model="state.suffix" draggable clearable placeholder="Suffix" tag-effect="dark"
                          tag-type="primary" @change="handleChangeTag(false)">
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
        <el-form-item :label="handleLabel(item.expression, item.dataValue)" label-position="top">
          <el-input disabled :formatter="(value: string) => handleExampleData(value)" v-model="item.expression" />
        </el-form-item>
      </div>
      <h5 v-if="state.form.suffix.length > 0">{{ t('Suffix') }}</h5>
      <div v-for="(item,index) in state.form.suffix">
        <el-form-item :label="handleLabel(item.expression, item.dataValue)" label-position="top">
          <el-input disabled :formatter="(value: string) => handleExampleData(value)" v-model="item.expression" />
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

  <div class="cardCaontainer">

  </div>

  <el-dialog v-model="state.dialogFormVisible" :title="state.setting ? t('New Date Variable') : t('New Text Variable')"
             width="500">
    <FormRenderer ref="FormRendererRef" :form-json="formJson" />
    <!--    <el-form ref="formAddItemDialogRef" :model="item" @submit.native.prevent>-->
    <!--      <el-form-item v-if="state.setting" :label="t('date_format')" label-position="top" prop="expression"-->
    <!--                    :rules="[{ required: true, message: t('date_format') + t('render.hint.fieldRequired') }]">-->
    <!--        <el-select v-model="item.expression" clearable allow-create filterable-->
    <!--                   :placeholder="t('common_selectOccupancyContent')">-->
    <!--          <el-option v-for="item in state.dateFormatList" :key="item" :value="item" :label="item"></el-option>-->
    <!--        </el-select>-->
    <!--      </el-form-item>-->
    <!--      <div v-else>-->
    <!--        <el-form-item :label="t('Variable Name')" label-position="top" prop="expression"-->
    <!--                      :rules="[{ required: true, message: t('Variable Name') + t('render.hint.fieldRequired') }]">-->
    <!--          <el-input v-model="item.expression" clearable allow-create filterable :placeholder="t('name')">-->
    <!--          </el-input>-->
    <!--        </el-form-item>-->
    <!--        <el-form-item :label="t('Variable Value')" label-position="top" prop="dataValue"-->
    <!--                      :rules="[{ required: true, message: t('Variable Value') + t('render.hint.fieldRequired') }]">-->
    <!--          <el-input v-model="item.dataValue" clearable allow-create filterable :placeholder="t('value')">-->
    <!--          </el-input>-->
    <!--        </el-form-item>-->
    <!--      </div>-->
    <!--      <div class="button-container">-->
    <!--        <el-button type="primary" @click="handleAddItemTag(formAddItemDialogRef)">-->
    <!--          Confirm-->
    <!--        </el-button>-->
    <!--      </div>-->
    <!--    </el-form>-->
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
const formAddItemDialogRef = ref<FormInstance>()
const state = reactive({
  loading: false,
  status: true,
  dialogFormVisible: false,
  setting: true,
  dateFormatList: [
    'YY',
    'YYYY',
    'MM',
    'dd',
    'DD',
    'hh',
    'HH',
    'mm',
    'ss',
    'HH:mm:ss',
    'HH:mm',
    'D/M/YY',
    'DD/MM/YY',
    'DD-MM-YYYY',
    'DD/MM/YY HH:mm:ss',
    'DD/MM/YYYY HH:mm:ss',
    'DD/MM/YYYY HH:mm',
    'YYYY-MM-DD',
    'YYYY-MM-DD HH:mm',
    'YYYY-MM-DD HH:mm:ss'
  ],
  prefix: [],
  suffix: [],
  item: { index: 0, expression: '', type: '', value: undefined },
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
  dataValue: string
}

let item = reactive<ItemRule>({
  index: 0,
  expression: '',
  type: '',
  dataValue: ''
})

function handleLabel(e: string, value: string) {
  return e.includes('{date(') ? 'Date' : value
}

function handleStatus(value: string) {
  return value.includes('{date(') ? 'Date' : 'Var'
}

function handleDataFormat(value: string) {
  const regex = /\(([^)]+)\)/
  const match = value.match(regex)
  return match ? match[1] : value
}

function handleExampleData(value: string) {
  try {
    let data = handleDataFormat(value)
    if (handleStatus(value) === 'Date') {
      return formatDate(new Date(), data)
    }
    if (handleStatus(value) === 'Var') {
      return data
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
        id += handleExampleData(item.expression)
      })
    }

    if (suffix.length > 0) {
      suffix.forEach((item: any) => {
        id += handleExampleData(item.expression)
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
  state.setting = setting
  state.status = status
  item = {}
  item.type = 'date'
  console.log(FormRendererRef)
  // FormRendererRef.value.vFormRenderRef.setFormData({ isShow: true })
  state.dialogFormVisible = true
}

/**
 * @param status (true: prefix,false: suffix)
 * @param setting (true: date setting, false: var setting)
 */
function handleVariable(status: boolean, setting: boolean) {
  state.setting = setting
  state.status = status
  item = {}
  item.type = 'string'
  // FormRendererRef.value.vFormRenderRef.setFormData({ isShow: false })
  state.dialogFormVisible = true
}

function handleAddItemTag() {

  item.expression = state.setting ? '{date(' + item.expression + ')}' : '{var(' + item.expression + ')}'
  item.dataValue = state.setting ? '' : item.dataValue
  if (state.status) {
    item.index = state.form.prefix.length
    state.prefix.push(item.expression)
    state.form.prefix.push(deepCopy(item))
  } else {
    item.index = state.form.suffix.length
    state.suffix.push(item.expression)
    state.form.suffix.push(deepCopy(item))
  }
  item = {}
  state.dialogFormVisible = false

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