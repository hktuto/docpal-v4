<script setup lang="ts">
import { useDebounceFn } from "@vueuse/core";
import draggable from "vuedraggable";
import formJson from "./setting.vform.json";
import { ElStep } from "element-plus";

const emits = defineEmits(["refresh", "delete"]);
const { t } = useI18n();

const state = reactive<{
  loading: boolean;
  visible: boolean;
  setting: {
    displayColumnSetting?: Array<{ field: string; label: string }>;
    [key: string]: unknown;
  };
}>({
  loading: false,
  visible: false,
  setting: {},
});

const FormRendererRef = ref();

function ensureDisplayColumnSetting() {
  if (!Array.isArray(state.setting.displayColumnSetting)) {
    state.setting.displayColumnSetting = [];
  }
}

function updateDisplayColumnChange({ fieldName, newValue, oldValue }: any) {
  if (fieldName !== "displayColumns" || !oldValue || oldValue.length === 0) {
    return;
  }
  const selectedColumns: string[] = Array.isArray(newValue) ? newValue : [];
  const currentSettings = Array.isArray(state.setting.displayColumnSetting)
    ? state.setting.displayColumnSetting
    : [];
  const currentSettingsMap = new Map(
    currentSettings.map((item: any) => [item.field, item])
  );
  const nextSettings = selectedColumns.map((field: string) => {
    if (currentSettingsMap.has(field)) {
      const existing = currentSettingsMap.get(field);
      return {
        ...existing,
        field,
        label: existing?.label || field.replace(/_/g, ' '),
      };
    }
    return { field, label: field };
  });
  state.setting.displayColumnSetting = nextSettings;
}

const updateDisplayColumnChangeDebounced = useDebounceFn(
  updateDisplayColumnChange,
  300
);

async function handleSubmit() {
  if (!FormRendererRef.value) {
    return;
  }
  state.loading = true;
  try {
    const formData = await FormRendererRef.value.getFormData();

    const payload = structuredClone(toRaw(formData));
    if(state.setting.displayColumnSetting) {
      payload.displayColumnSetting = JSON.parse(JSON.stringify(state.setting.displayColumnSetting));
    }else{
      payload.displayColumnSetting = [];
    }
    emits("refresh", payload);
    state.visible = false;
  } finally {
    state.loading = false;
  }
}

function handleOpen(setting: any) {
  state.visible = true;
  setTimeout(async () => {
    state.setting = JSON.parse(JSON.stringify(setting || {}));

    ensureDisplayColumnSetting();
    await FormRendererRef.value?.vFormRenderRef.setFormData(state.setting);
    const currentDisplayColumns = Array.isArray(state.setting.displayColumns)
      ? state.setting.displayColumns
      : [];
    updateDisplayColumnChange({
      fieldName: "displayColumns",
      newValue: currentDisplayColumns,
    });
    state.loading = false;
  });
}

defineExpose({ handleOpen });
</script>

<template>
  <el-dialog
    v-model="state.visible"
    :title="t('dashboard.setting')"
    class="scroll-dialog"
    append-to-body
    :close-on-click-modal="false"
    destroy-on-close
  >
    <FormRenderer
      ref="FormRendererRef"
      :form-json="formJson"
      @formChange="updateDisplayColumnChangeDebounced"
    />
    <section
      v-if="state.setting.displayColumnSetting?.length"
      class="display-columns-editor"
    >
      <header class="editor-heading">
        <h4 class="editor-title">{{ t("tableHeader_displayColumn") }}</h4>
      </header>
      <el-scrollbar max-height="240">
        <draggable
          tag="ul"
          class="display-columns-list"
          :list="state.setting.displayColumnSetting"
          item-key="field"
          v-bind="{ handle: '.drag-handle', ghostClass: 'ghost' }"
        >
          <template #item="{ element: column, index }">
            <li class="display-columns-item">
              <span class="drag-handle" role="button" tabindex="0" :aria-label="t('designer.hint.dragHandler')">
                <i class="iconfont icon-drag" aria-hidden="true"></i>
              </span>
              <div class="column-details">
                <span class="column-field">{{ column.field }}</span>
                <el-input
                  v-model="state.setting.displayColumnSetting[index].label"
                  :placeholder="column.field"
                  :aria-label="`${t('tableHeader_displayColumn')} ${column.field}`"
                  size="small"
                />
              </div>
            </li>
          </template>
        </draggable>
      </el-scrollbar>
    </section>
    <template #footer>
      <div class="footer-grid">
        <el-button type="primary" :loading="state.loading" @click="handleSubmit">
          {{ t("common_submit") }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
.display-columns-editor {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.editor-heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.editor-title {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--el-text-color-primary);
}

.display-columns-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.display-columns-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.drag-handle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  color: var(--el-text-color-secondary);
  cursor: move;
}

.column-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.column-field {
  font-size: 12px;
  color: var(--el-text-color-secondary);
  word-break: break-all;
}

.ghost {
  opacity: 0.6;
}
</style>
