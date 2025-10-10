<template>
  <Splitpanes class="default-theme" @resized="
    (e) => {
      leftSize = e[0].size;
      rightSize = e[1].size;
    }
  ">
    <Pane v-if="dashboardSettingList && editMode" max-size="20" min-size="2" :size="leftSize" class="dp-left-pane">
      <el-icon class="cursorPointer" color="var(--app-primary-color)" @click="handleEditMode">
        <Setting />
      </el-icon>
      <el-collapse v-if="leftSize > 10" v-model="activeNames">
        <el-collapse-item v-for="(item, key) in dashboardSettingList" :key="key" :title="key" :name="key">
          <div class="dashboard-item-widget" v-for="(c, ckey) in item" :key="ckey" draggable="true" unselectable="on"
            @dragstart="(e) => dragStart(c)" @drag="drag" @dragend="dragEnd">
            <SvgIcon v-if="c.icon" class="el-icon--left" :src="`/icons/dashboard/${c.icon}.svg`"
              style="--icon-size: 12px" />
            {{ $t(`dashboard.${c.label}`) }}
          </div>
        </el-collapse-item>
      </el-collapse>
    </Pane>
    <Pane :size="rightSize">
      <div ref="wrapper" style="height: 100%; overflow: auto">
        <GridLayout ref="gridLayout" :style="`--grid-row-height: ${rowHeight}px; --grid-row-margin: 20px;`"
          :class="{ 'vue-grid-layout--edit': editMode }" v-model:layout="layout" :col-num="colNum" :margin="[12, 12]"
          :row-height="rowHeight" :is-draggable="draggable" :is-resizable="resizable" :responsive="true"
          :verticalCompact="true" :preventCollision="false" :use-css-transforms="true">
          <GridItem v-for="(item, index) in layout" :key="item.i" class="dashboard-item" v-bind="item"
            drag-ignore-from=".no-drag" @resize="chartResize(item)">
            <NuxtErrorBoundary>
              <template v-if="!componentMap[item.component]">
                <el-card class="custom-card" shadow="always">
                  <template #header>
                    <b>{{ item.label }} </b>
                  </template>
                  <div class="card-content">
                    <b class="button-container">
                      {{ $t('Dashboard.Home.card.error') }}
                    </b>
                    <div class="button-container">
                      <el-button type="primary" @click="handleDelete(item)">{{ $t('common_confirmDelete') }}</el-button>
                    </div>
                  </div>
                </el-card>
              </template>
              <component v-else :is="componentMap[item.component]" :ref="(el) => {
                sheetRefs[item.i] = el;
              }
                " :id="item.component" :key="item.i" :setting="item.setting" :hideSetting="hideSetting" :dates="dates"
                @delete="handleDelete(item)" @refreshSetting="(setting) => handleRefreshSetting(setting, item)">
              </component>
              <template #error="{ error, clearError }">
                <div class="errorBoundaryContainer dashboard">
                  <div class="messageContainer">
                    <h5 class="errorTitle">ERROR : {{ $t(item.label) }}</h5>
                    <pre>
                      {{ error }}
                    </pre>
                    <pre>
                      {{ item }}
                    </pre>
                    <el-button size="small" :icon="Refresh" circle @click="clearError">
                      {{ $t('common_refresh') }}
                    </el-button>
                  </div>
                </div>
              </template>
            </NuxtErrorBoundary>
          </GridItem>
        </GridLayout>
      </div>
    </Pane>
  </Splitpanes>
</template>

<script lang="ts" setup>
import { Refresh } from '@element-plus/icons-vue';
import { Setting } from '@element-plus/icons-vue';
import { Pane, Splitpanes } from 'splitpanes';
import 'splitpanes/dist/splitpanes.css';
// import { GridLayout, GridItem } from "vue3-grid-layout-next";
import { GridItem, GridLayout } from 'grid-layout-plus';
import type { DashboardWidgetSetting } from '~/utils/dashboardWidgetHelper';
import { widgetComponent } from '~/utils/dashboardWidgetHelper';
import { useDebounceFn } from '@vueuse/core';

const props = withDefaults(
  defineProps<{
    // layout: DashboardWidgetSetting[],
    resizable?: boolean;
    draggable?: boolean;
    hideSetting?: boolean;
    colNum?: number;
    rowHeight?: number;
    dates?: any;
    editMode?: boolean;
    dashboardSettingList?: any;
    componentMap?: any;
  }>(),
  {
    // layout: [],
    resizable: true,
    draggable: true,
    hideSetting: false,
    colNum: 12,
    rowHeight: 100,
    componentMap: widgetComponent
  }
);
const activeNames = ref(['default', '2', '3', '4']);
const leftSize = ref(15);
const rightSize = ref(100);
const layout = defineModel<DashboardWidgetSetting>('layout');
// const layout = computed({
//   get() {
//         return props.layout
//     },
//     set(val) {
//         emits('update:layout', val)
//     }
// })
const emits = defineEmits(['refreshSetting', 'delete', 'update:layout', 'save']);

const sheetRefs = ref<any>({});

function handleEditMode() {
  if (leftSize.value > 10) leftSize.value = 2;
  else leftSize.value = 20;
}

function handleDelete(row: any) {
  emits('delete', row.i);
}

function handleRefreshSetting(setting: any, row: any) {
  row.setting = setting;
  emits('refreshSetting', row);
}

const chartResize = useDebounceFn(
  (row: any) => {
    if (sheetRefs.value[row.i] && sheetRefs.value[row.i].resize) {
      sheetRefs.value[row.i].resize();
    }
    emits('save');
  },
  1000,
  { maxWait: 5000 }
);

const dropId = 'drop';
let dragItem = { x: -1, y: -1, w: 2, h: 2, i: '' };
const defaultSize = {
  w: 2,
  h: 2
};
const mouseAt = { x: -1, y: -1 };

function syncMousePosition(event: MouseEvent) {
  mouseAt.x = event.clientX;
  mouseAt.y = event.clientY;
}

onMounted(() => {
  document.addEventListener('dragover', syncMousePosition);
});

onDeactivated(() => {
  document.removeEventListener('dragover', syncMousePosition);
});
const wrapper = ref<HTMLElement>();
const gridLayout = ref();

function dragStart(c) {
  dragItem = JSON.parse(JSON.stringify(c));
}

const drag = () => {
  // dragItem = JSON.parse(JSON.stringify(item));
  const parentRect = wrapper.value?.getBoundingClientRect();

  if (!parentRect || !gridLayout.value) return;

  const mouseInGrid = mouseAt.x > parentRect.left && mouseAt.x < parentRect.right && mouseAt.y > parentRect.top && mouseAt.y < parentRect.bottom;

  if (mouseInGrid && !layout.value.find((item) => item.i === dropId)) {
    layout.value.push({
      x: (layout.value.length * 2) % 12,
      y: layout.value.length + 12, // puts it at the bottom
      w: defaultSize.w,
      h: defaultSize.h,
      i: dropId
    });
  }

  const index = layout.value.findIndex((item) => item.i === dropId);
  if (index !== -1) {
    const item = gridLayout.value.getItem(dropId);

    if (!item) return;

    try {
      item.wrapper.style.display = 'none';
    } catch (e) {
    }

    Object.assign(item.state, {
      top: mouseAt.y - parentRect.top,
      left: mouseAt.x - parentRect.left
    });
    const newPos = item.calcXY(mouseAt.y - parentRect.top, mouseAt.x - parentRect.left);

    if (mouseInGrid) {
      gridLayout.value.dragEvent('dragstart', dropId, newPos.x, newPos.y, defaultSize.h, defaultSize.w);
      // dragItem.i = String(index);
      dragItem.x = layout.value[index].x;
      dragItem.y = layout.value[index].y;
    } else {
      gridLayout.value.dragEvent('dragend', dropId, newPos.x, newPos.y, defaultSize.h, defaultSize.w);

      layout.value = layout.value.filter((item) => item.i !== dropId);
    }
  }
};

function dragEnd() {
  const parentRect = wrapper.value?.getBoundingClientRect();
  if (!parentRect || !gridLayout.value) return;
  const mouseInGrid = mouseAt.x > parentRect.left && mouseAt.x < parentRect.right && mouseAt.y > parentRect.top && mouseAt.y < parentRect.bottom;
  if (mouseInGrid) {
    // alert(`Dropped element props:\n${JSON.stringify(dragItem, ['x', 'y', 'w', 'h'], 2)}`)
    gridLayout.value.dragEvent('dragend', dropId, dragItem.x, dragItem.y, defaultSize.h, defaultSize.w);
    const newLayout = layout.value.filter((item) => item.i !== dropId);
    newLayout.push({
      ...dragItem,
      w: defaultSize.w,
      h: defaultSize.h,
      i: new Date().valueOf().toString()
    });
    emits('update:layout', newLayout);
    return;
  } else {
    const newLayout = layout.value.filter((item) => item.i !== dropId);
    emits('update:layout', newLayout);
    return;
  }
}
</script>

<style lang="scss" scoped>
.custom-card {
  height: 100%;

  .card-content {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: var(--el-card-padding);
    margin-top: 150px;

    .button-container {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}

.droppable-element {
  width: 200px;
  height: 100px;
  background-color: red;
}

.dashboard-item {
  :deep(.dashboard-item-main) {
    height: 100%;
  }
}

:deep(.setting-man-made) {
  --icon-size: 1.14rem;
  --icon-color: #8796a4;
  position: absolute;
  top: var(--app-space-xs);
  right: var(--app-space-xs);
  cursor: pointer;
}

:deep(.dashboard-auto) {
  overflow: auto;
}

.vue-grid-layout--edit {
  position: relative;

  &::after {
    --b-gap: 24px;
    content: '';
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    position: absolute;
    z-index: -1;
    background-color: var(--app-grey-200);
    /* 背景颜色 */
    background-size: calc((100% - 20px) / 12) calc(var(--grid-row-height) + var(--grid-row-margin));
    /* 网格大小 */
    background-image: linear-gradient(to right, var(--app-grey-950) var(--b-gap), transparent var(--b-gap)),
      linear-gradient(to bottom, var(--app-grey-950) var(--b-gap), transparent var(--b-gap));
  }
}

.splitpanes.default-theme .splitpanes__pane {
  background-color: var(--app-grey-950);
}

.dashboard-item-widget {
  border: 1px solid var(--app-grey-800);
  display: flex;
  align-items: center;
  height: 32px;
  line-height: 32px;
  width: fit-content;
  float: left;
  margin: 2px 6px 6px 0;
  cursor: move;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  background: #fff;
  border: 1px solid #e8e9eb;
  border-radius: 4px;
  padding: 0 8px;
}
</style>
