<template>
  <div class="editFormContainer">
    <div class="header">
      <span class="header__title">{{ $t('admin_watermark_properties') }}</span>
      <el-popconfirm width="200" @confirm="$emit('delete')"
                     :title="$t('tip_deleteMsg', {modelName: $t('watermark.watermark'), name: null})"
      >
        <template #reference>
          <div class="listItemDelete">
            <SvgIcon class="deleteIcon" src="/icons/menu/trash.svg" />
          </div>
        </template>
        <template #actions="{ confirm, cancel }">
          <el-button size="small" @click="cancel">{{ $t('el.datepicker.cancel') }}</el-button>
          <el-button type="warning" size="small" @click="confirm">
            {{ $t('common_confirmDelete') }}
          </el-button>
        </template>
      </el-popconfirm>
    </div>
    <slot />
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(['delete'])
</script>

<style scoped lang="scss">
.editFormContainer {
  display: flex;
  flex-flow: column nowrap;
  gap: 6px;
  align-items: center;
  justify-content: flex-start;
  background: #fff;
  border-radius: 4px;
  padding: 8px;
  max-width: 200px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
  background: var(--app-grey-950);

  :deep(.el-input-number)
     {
      width: 100%;
    }
}

.el-form-item {
  margin-bottom: 0;
  width: 100%;
}

.header {
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
}

.listItemDelete {
  color: #000;
}


.deleteIcon {
  width: 16px;
  height: 16px;
}
</style>
