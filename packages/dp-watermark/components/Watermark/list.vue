<template>
  <div class="watermarkListContainer">
    <div class="listActionContainer">
      <el-button id="WatermarkSetting__CreateNewWatermark" type="primary" @click="createItem">
        {{ $t('admin_watermark_create') }}
      </el-button>
      <!--            <SvgIcon src="/icons/add.svg" :title="$t('admin_watermark_create')" class="addButton" @click="createItem"/>-->
    </div>
    <div class="listItemsContainer" style="--icon-size: 12px;">
      <div v-for="item in list" :key="item.id" :class="{listItem:true, selected: item.id === selectedId}">
        <div class="listItemLabel ellipsis" :title="item.name" @click="switchDetail(item.id)">
          {{ item.name }}
        </div>
        <!-- TODO : icon size and style -->
        <div class="listAction listItemEdit" @click="editItem(item.id)">
          <SvgIcon :id="'WatermarkSetting__Edit__'+item.name" src="/icons/edit_1.svg" />
        </div>
        <ElPopconfirm width="200" :title="$t('tip_deleteMsg', {modelName: t('watermark.watermark'), name: null})"
                      @confirm="deleteItem(item.id)">
          <template #reference>
            <div class="listAction listItemDelete">
              <SvgIcon :id="'WatermarkSetting__Delete__'+item.name" src="/icons/menu/trash.svg" />
            </div>
          </template>
          <template #actions="{ confirm, cancel }">
            <el-button size="small" @click="cancel">{{ $t('el.datepicker.cancel') }}</el-button>
            <el-button type="warning" size="small" @click="confirm">
              {{ $t('common_confirmDelete') }}
            </el-button>
          </template>
        </ElPopconfirm>
      </div>
    </div>
    <!-- Edit dialog -->
    <el-dialog v-model="editDialog" :title="$t('admin_watermark_edit')" destroy-on-close>
      <WatermarkEdit :list="list" :item="selectedItem" @submit="itemChangeHandler" />
    </el-dialog>
    <!-- New dialog -->
    <el-dialog v-model="newDialog" :title="$t('admin_watermark_create')" destroy-on-close>
      <WatermarkCreate :list="list" @submit="itemChangeHandler" />
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import type { WatermarkTemplate } from '../../composables/Watermark'

const { t } = useI18n()
const props = defineProps<{
  list: WatermarkTemplate[],
  selectedId: string
}>()

const routerProvider = inject(MenuRouterKey)
const emit = defineEmits(['update', 'remove', 'switch'])

const editDialog = ref(false)
const newDialog = ref(false)


const selectedItem = computed(() => {
  return props.list.find((item: WatermarkTemplate) => item.id === props.selectedId)
})

function deleteItem(id: string) {
  emit('remove', id)
  routerProvider?.message.success(t('tip_deleteSuccessMessage', { name: t('tip_SelectedMsg') + t('watermark.watermark') }))
}

function createItem() {
  newDialog.value = true
  editDialog.value = false
}

function itemChangeHandler(id: string) {
  newDialog.value = false
  editDialog.value = false
  emit('update', null)
  switchDetail(id)
}

function editItem(id: string) {
  newDialog.value = false
  editDialog.value = true
  switchDetail(id)
}

function switchDetail(id: string) {
  emit('switch', id)
}

</script>

<style lang="scss" scoped>
.watermarkListContainer {
  width: 200px;
  background: var(--color-p3);
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  gap: var(--app-space-xs);
  padding: var(--app-space-xs);
  border-radius: 8px;
}

.listItemsContainer {
  height: 80vh;
  display: flex;
  flex-flow: column nowrap;
  overflow-y: auto;
  gap: 8px;
}

.listItem {
  --color: #8796A4;
  --bg: transparent;
  display: grid;
  grid-template-columns: 1fr min-content min-content;
  gap: 0;
  padding: calc(var(--app-space-s) / 2);
  color: var(--color);
  background: var(--bg);
  border-radius: 4px;
  cursor: pointer;

  .listItemLabel {
  }

  &.selected, &:hover {
    --color: #fff;
    cursor: default;
  }
  &:hover {
    --bg: var(--app-grey-700);
  }
  &.selected {
    --bg: var(--app-grey-9500);
  }
}

.listActionContainer {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  align-items: center;
  border-bottom: 1px solid var(--app-grey-400);
  flex: 0 0 auto;
  padding: calc(var(--app-space-xs) / 2);
}

.addButton {
  cursor: pointer;
}

.listAction {
  width: 12px;
  height: 12px;
}
</style>
