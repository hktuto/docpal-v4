<script lang="ts" setup>
import type {CalendarOptions} from '#imports'
import {clientApi} from 'api';

const opened = ref(false);

const emits = defineEmits(['submit', 'delete'])
const {setting} = defineProps<{
  setting?: any,
}>()
const {
  setting: calendarSetting,
  categoriesOption,
  locationsOption,
  calendarViewOptions,
  weekDayOptions
} = useCalendarStore();
const userFiterOptions = ref([])

async function getOptions() {
  const user = await clientApi.api.postNuxeoIdentityUsers({}).then(res => res.data)
  userFiterOptions.value = user.map(item => {
    return {
      label: item.username,
      value: item.userId
    }
  })
  userFiterOptions.value.unshift({
    label: "Current User",
    value: "currentUser"
  })
}

const form = ref<CalendarOptions>({
  editable: false,
  showLocationFilter: false,
  showUserFilter: false,
  showCategoryFilter: false,
  defaultUser: "",
  defaultLocation: "",
  defaultCategory: "",
  locationLabel: "",
  categoryLabel: "",
  userFilterGroup: "",
  view: "",
  firstDayOfWeek: "",
})

function handleOpen() {
  opened.value = true;
  getOptions()
  Object.keys(setting).forEach(key => {
    if (setting[key]) {
      form.value[key] = setting[key]
    }
  })
  if (!form.value.view) {
    form.value.view = calendarSetting.value?.basic.default_view
  }
  if (!form.value.firstDayOfWeek) {
    form.value.firstDayOfWeek = calendarSetting.value?.basic.default_first_week
  }

  // form.value = setting
}

function submit() {
  // editable is for workflow , so we need to force it to false
  // force editable to false
  form.value.editable = false
  emits('submit', form.value)
  opened.value = false
}

defineExpose({
  handleOpen
})

</script>

<template>
  <ElDialog v-model="opened" append-to-body>
    <ElForm :model="form" label-position="top" @submit.stop="" show-close>
      <ElRow :gutter="12">
        <!-- <ElCol :span="12">
          <ElFormItem label="Editable">
            <ElSwitch v-model="form.editable"></ElSwitch>
          </ElFormItem>
        </ElCol> -->
        <ElCol :span="12">
          <ElFormItem label="Allow Create New Event">
            <ElSwitch v-model="form.allowCreate"></ElSwitch>
          </ElFormItem>
        </ElCol>
        <ElCol :span="12">
          <ElFormItem label="Show Location Filter">
            <ElSwitch v-model="form.showLocationFilter"></ElSwitch>
          </ElFormItem>
        </ElCol>
        <ElCol :span="12">
          <ElFormItem label="Show User Filter">
            <ElSwitch v-model="form.showUserFilter"></ElSwitch>
          </ElFormItem>
        </ElCol>
        <ElCol :span="12">
          <ElFormItem label="Show Category Filter">
            <ElSwitch v-model="form.showCategoryFilter"></ElSwitch>
          </ElFormItem>
        </ElCol>
        <ElDivider/>
        <ElCol :span="12">
          <ElFormItem label="view">
            <ElSelect v-model="form.view" placeholder="Default View" clearable>
              <ElOption v-for="item in calendarViewOptions" :key="item" :label="item" :value="item"></ElOption>
            </ElSelect>
          </ElFormItem>
        </ElCol>
        <ElCol :span="12">
          <ElFormItem label="view">
            <ElSelect v-model="form.firstDayOfWeek" placeholder="First Day of Week" clearable>
              <ElOption v-for="item in weekDayOptions" :key="item" :label="item" :value="item"></ElOption>
            </ElSelect>
          </ElFormItem>
        </ElCol>
        <ElDivider/>
        <ElCol :span="12">
          <ElFormItem label="Default User">
            <ElSelect v-model="form.defaultUser" clearable placeholder="Default User">
              <ElOption v-for="item in userFiterOptions" :key="item.value" :label="item.label" :value="item.value">
              </ElOption>
            </ElSelect>
          </ElFormItem>
        </ElCol>
        <ElCol :span="12">
          <ElFormItem label="Default Location">
            <ElSelect v-model="form.defaultLocation" clearable placeholder="Default Location">
              <ElOption v-for="item in locationsOption" :key="item.id" :label="item.name" :value="item.id"></ElOption>
            </ElSelect>
          </ElFormItem>
        </ElCol>
        <ElCol :span="12">
          <ElFormItem label="Default Category">
            <ElSelect v-model="form.defaultCategory" clearable placeholder="Default Category">
              <ElOption v-for="item in categoriesOption" :key="item.id" :label="item.name" :value="item.id"></ElOption>
            </ElSelect>
          </ElFormItem>
        </ElCol>
      </ElRow>
    </ElForm>
    <template #footer>
      <ElButton id="WorkPanel__Detail__Calendar__Settings__Cancel" @click="opened = false">
        {{ $t("cancelText") }}
      </ElButton>
      <ElButton id="WorkPanel__Detail__Calendar__Settings__Delete" type="danger" @click="$emit('delete')">
        {{ $t('common_delete') }}
      </ElButton>
      <ElButton id="WorkPanel__Detail__Calendar__Settings__Submit" type="primary" @click="submit">
        {{ $t("common_submit") }}
      </ElButton>
    </template>
  </ElDialog>
</template>
