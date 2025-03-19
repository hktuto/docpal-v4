<template>
  <div :class="{ container: true, 'container--auto': isAuto }">
    <div>
      <h3>{{ $t("caseManage.fieldsLayout") }}</h3>
      <draggable
        class="list-group flex-zoom"
        :list="layout"
        group="people"
        itemKey="name"
      >
        <template #item="{ element, index }">
          <div
            :style="`--field-width: ${element.width || '50%'}`"
            :class="{ 'list-group-item': true, 'list-group-item--auto': isAuto }"
          >
            <SvgIcon class="handle-icon" src="/icons/drag.svg"/>
            <div>{{ element.name }}</div>
            <div class="flex-x-end">
              <el-dropdown v-if="!isAuto" @command="(command) => handleCommand(command, element)">
                <SvgIcon class="zoom-icon" src="/icons/tools/zoom.svg"/>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item
                      v-for="item in widthList"
                      :key="item.width"
                      :command="item.width"
                    >
                      {{ item.width }}
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
              <div v-else>Auto</div>
              <el-icon
                class="el-icon--right cursorPointer icon__hover"
                @click="handleDelete(element)"
              >
                <Delete/>
              </el-icon>
            </div>
            <div></div>
            <div style="flex-wrap: wrap;" class="flex-x-start">
              <el-dropdown @command="(command) => handleCommand(command, element, 'size')">
                <!-- <SvgIcon class="zoom-icon" src="/icons/tools/zoom.svg" /> -->
                <span class="el-dropdown-link">
                  {{ element.size || "Default" }}
                  <el-icon class="el-icon--right">
                    <arrow-down/>
                  </el-icon>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item
                      v-for="item in sizeList"
                      :key="item.label"
                      :command="item.label"
                    >
                      {{ item.label }}
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
              <SvgIcon
                v-for="item in alignList"
                :key="item.label"
                :class="{'el-icon--right': true, 'text-icon': true, 'selected': item.value === element.align }"
                :src="`/icons/tools/${item.label}.svg`"
                @click="handleCommand(item.value, element, 'align')"
              />
            </div>
            <template v-if="!isAuto">
              <div></div>
              <div></div>
              <el-input v-model="element.label" :placeholder="$t('dpTable_label')" clearable/>
            </template>
          </div>
        </template>
      </draggable>
    </div>
    <div>
      <h3>{{ $t("caseManage.avalibleFields") }}</h3>
      <draggable
        class="list-group list-group--avalible"
        :list="pLayout"
        group="people"
        itemKey="name"
      >
        <template #item="{ element, index }">
          <div class="list-group-item">
            <SvgIcon class="handle-icon" src="/icons/drag.svg"/>
            {{ element.name }}
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {Delete, ArrowDown} from "@element-plus/icons-vue";
import draggable from "vuedraggable";

const props = withDefaults(
  defineProps<{
    layout: any;
    pLayout: any;
    isAuto: boolean;
  }>(),
  {
    isAuto: false,
  }
);
const widthList = [
  {width: "25%", label: "25%"},
  {width: "33%", label: "33%"},
  {width: "50%", label: "50%"},
  {width: "75%", label: "75%"},
  {width: "100%", label: "100%"},
];
const sizeList = [
  // { size: "mini", label: "Mini" },
  {size: "small", label: "Small"},
  {size: "default", label: "Default"},
  {size: "large", label: "Large"},
];
const alignList = [
  {value: "left", label: "text-left"},
  {value: "center", label: "text-center"},
  {value: "right", label: "text-right"},
];

function handleCommand(command: string, row: any, prop: string = "width") {
  row[prop] = command;
}

function handleDelete(row: any) {
  console.log(row);
  const index = props.layout.findIndex((item) => item.name === row.name);
  props.layout.splice(index, 1);
  props.pLayout.push(row);
}
</script>
<style lang="scss" scoped>
.container {
  --icon-size: 1.14rem;
  display: grid;
  grid-template-columns: 1fr 30%;
  gap: var(--app-space-xs);
  overflow: auto;

  & > div {
    background-color: #f2f8f9;
    padding: var(--app-space-xs);
    display: grid;
    grid-template-rows: min-content 1fr;
    overflow: hidden;
    max-height: 50vh;
  }
}

.container--auto {
  grid-template-columns: unset;

  .list-group--avalible {
    display: flex;
    flex-wrap: wrap;
    column-gap: var(--app-space-xs);
  }
}

.list-group {
  min-height: 50px;
  overflow: auto;
}

.list-group-item {
  display: grid;
  grid-template-columns: min-content 1fr min-content;
  background-color: #fff;
  padding: var(--app-space-xs);
  margin-bottom: var(--app-space-xs);
  align-items: center;

  .el-input {
    width: 100%;
  }
}

.flex-zoom {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  row-gap: var(--app-space-xs);
  column-gap: var(--app-space-xs);

  .list-group-item {
    min-width: 100px;
    height: fit-content;
    gap: var(--app-space-xs);
    width: calc(var(--field-width, 50%) - var(--app-space-xs));

    margin-bottom: unset;

    &--auto {
      width: unset;
    }
  }
}

.el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}

.text-icon {
  --icon-color: #ddd;

  &.selected {
    --icon-color: #000;
  }
}
</style>
