<script setup lang="ts">
import { DocTemplateProveKey } from "~/utils/docTempalteHelper";

const { editor, options, initEditor } = inject(DocTemplateProveKey);
const { t } = useI18n();


const fontDataOptions = [8, 9, 10, 11, 12, 14, 15, 18, 20, 22, 24, 26, 28, 36, 48];

const state = reactive({
  fontDataOptions: Array.from({ length: fontDataOptions.length }).map((_, idx) => ({
    value: fontDataOptions[idx],
    label: fontDataOptions[idx]
  })),
  fontSize: 12

});

function checkFontSizeIsNumber() {
  console.log("value", state.fontSize);
  // Regular expressions that allow integers and up to one decimals
  const regex = /^\d+(\.\d{1})?$/;
  if (!regex.test(state.fontSize.toString())) {
    state.fontSize = 12;
    console.log("fontDataOptions22", deepCopy(state.fontDataOptions));
    return;
  }
  const fontSize = Number(state.fontSize);
  if (fontSize <= 0) {
    state.fontSize = 1;
  } else if (fontSize > 500) {
    state.fontSize = 500;
  } else {
    state.fontSize = fontSize;
  }
  console.log("fontDataOptions", state.fontDataOptions);
}

function handlerFontSizeResize(status: boolean) {
  console.log(state.fontSize);
  let a = 8;
  let b = 48;

  for (let i = 0; i < fontDataOptions.length; i++) {
    if (fontDataOptions[i] === state.fontSize) {
      a = fontDataOptions[i - 1];
      b = fontDataOptions[i + 1];
      break;
    } else if (fontDataOptions[i] > state.fontSize) {
      a = fontDataOptions[i - 1];
      b = fontDataOptions[i + 1];
      break;
    }
  }

  if (status) {
    state.fontSize = b;
  } else {
    state.fontSize = a;
  }
}

function changeFontSize(size: Number) {
  editor.value.chain().focus().setTextStyle({ fontSize: size }).run();
}


</script>

<template>
  <!-- fontStyle -->


  <!-- fontSize -->
  <el-select-v2
    v-model="state.fontSize"
    :options="state.fontDataOptions"
    placeholder="please select"
    style="width: 240px; vertical-align: middle"
    allow-create
    filterable
    clearable
    @blur="checkFontSizeIsNumber"
  />
  <el-button @click="handlerFontSizeResize(true)">A+</el-button>
  <el-button @click="handlerFontSizeResize(false)">A-</el-button>


</template>

<style scoped lang="scss">

</style>