import { getCurrentInstance } from 'vue'
import { ElMessageBox } from 'element-plus'

export const useDashboard = () => {
  const { emit, props } = getCurrentInstance()
  const { dates, setting, hideSetting } = toRefs(props)
  const settingRef = ref()
  function handleDelete() {
    emit('delete')
  }

  function handleRefresh(newSetting: any) {
    emit('refreshSetting', newSetting)
  }

  function openSetting() {
    settingRef.value.handleOpen(props.setting)
  }

  function resize() {}

  return {
    settingRef,
    dates,
    setting,
    hideSetting,
    handleDelete,
    openSetting,
    handleRefresh,
    resize
  }
}

type DashboardSettingParams = {
  beforeOpen?: (setting: any) => void
  afterDelete?: (setting: any) => void
}
/**
 *
 * Helper function of dashboard setting,
 * handle open is already included
 * @param DashboardSettingParams
 *
 * @returns
 */
export const useDashboardSetting = ({ beforeOpen, afterDelete }: DashboardSettingParams) => {
  const { emit, props, exposed } = getCurrentInstance()

  const { t } = useI18n()
  const state = reactive({
    loading: false,
    visible: false,
    setting: {}
  })

  async function handleSubmit() {
    // const data = await FormRendererRef.value.getFormData();
    state.loading = true
    try {
      emit('refresh', structuredClone(toRaw(state.setting)))
    } catch (error) {
      state.loading = false
    } finally {
      state.visible = false
      state.loading = false
    }
  }

  async function handleOpen(setting) {
    if (beforeOpen) {
      await beforeOpen(setting)
    }
    if (!setting.columns) setting.columns = []
    if (!setting.steps) setting.steps = []
    if (!setting.sortColumn) setting.sortColumn = ''
    state.visible = true
    state.setting = setting
    state.loading = false
  }

  function handleClose() {
    state.visible = false
  }

  async function handleDelete() {
    const action = await ElMessageBox.confirm(`${t('msg_confirmWhetherToDelete')}`).catch((action) => action)
    if (action !== 'confirm') return
    if (afterDelete) {
      afterDelete()
    }
    emit('delete')
    state.visible = false
  }

  return {
    state,
    handleSubmit,
    handleDelete,
    handleClose,
    handleOpen
  }
}
