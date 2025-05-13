<script setup lang="ts">
import { DocTemplateProveKey } from "~/utils/docTempalteHelper";

const { editor, options, initEditor } = inject(DocTemplateProveKey);
const { t } = useI18n();

const fontPredefineFamily = ["Inter", "Comic Sans MS, Comic Sans", "serif", "monospace", "cursive"];
const fontPredefineSize = [8, 9, 10, 11, 12, 14, 15, 18, 20, 22, 24, 26, 28, 36, 48];
const fontPredefineColors = ref(["#ffff00", "#00ff00", "#007FFF", "#FF0000", "#FF00FF", "#00FFFF"]);

const state = reactive({
  fontFamily: "Inter",
  fontDataOptions: Array.from({ length: fontPredefineSize.length }).map((_, idx) => ({
    value: fontPredefineSize[idx],
    label: fontPredefineSize[idx]
  })),
  fontSize: 12,
  fontHighlightColor: "#ffff00",
  fontLinkDialogVisible: false,
  link: ""
});

function checkFontSizeIsNumber() {
  console.log("value", state.fontSize);
  // Regular expressions that allow integers and up to one decimals
  const regex = /^\d+(\.\d{1})?$/;
  if (!regex.test(state.fontSize.toString())) {
    state.fontSize = 12;
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

function handlerFontSizeNumber(status: boolean) {
  console.log(state.fontSize);
  let down = 8;
  let up = 48;

  if (state.fontSize < fontPredefineSize[0]) {
    console.log("--1");
    if (state.fontSize <= 1) {
      down = 1;
      up = 2;
    } else {
      down = state.fontSize - 1;
      up = state.fontSize + 1;
    }
  } else {
    const lastNumber = fontPredefineSize[fontPredefineSize.length - 1];
    if (fontPredefineSize[0] <= state.fontSize && state.fontSize <= lastNumber) {
      console.log("--2");
      if (state.fontSize == lastNumber) {
        down = fontPredefineSize[fontPredefineSize.length - 2];
        up = Math.ceil(state.fontSize / 10) * 10;
        return status ? up : down;
      }

      // 數組包含的數據
      for (let i = 0; i < fontPredefineSize.length; i++) {
        if (fontPredefineSize[i] === state.fontSize) {
          down = fontPredefineSize[i - 1];
          up = fontPredefineSize[i + 1];
          break;
        } else if (fontPredefineSize[i] > state.fontSize) {
          down = fontPredefineSize[i - 1];
          up = fontPredefineSize[i + 1];
          break;
        }
      }
    } else if (state.fontSize > lastNumber) {
      // 大於最後的值
      console.log("--3");
      if (state.fontSize <= Math.ceil(lastNumber / 10) * 10) {
        down = lastNumber;
        up = (Math.ceil(lastNumber / 10) + 1) * 10;
      } else {
        down = (Math.ceil(state.fontSize / 10) - 1) * 10;
        up = (Math.ceil(state.fontSize / 10) + 1) * 10;
      }
    }
  }
  return status ? up : down;
}

function handlerFontSizeResize(status: boolean) {
  // TODO 需要考慮當前選中的數據的大小，動態變更字體的大小時，需要先獲取當前選中的數據的字體大小
  // TODO 如果存在多個字體大小格式，需要分別處理
  state.fontSize = handlerFontSizeNumber(status);
  handleFontSizeChange(state.fontSize);
}

/**
 * Set the selected string Bold
 */
function handleFontBoldChange() {
  editor.value.chain().focus().toggleBold().run();
}

/**
 * Set the selected string Italic
 */
function handleFontItalicChange() {
  editor.value.chain().focus().toggleItalic().run();
}

/**
 * Set the selected string font family
 * @param fontFamily font family
 * default font family ["Inter" :String]
 */
function handleFontFamilyChange(fontFamily: string) {
  if (fontFamily) {
    editor.value.chain().focus().setFontFamily(fontFamily).run();
    return;
  }
  editor.value.chain().focus().setFontFamily(state.fontFamily).run();
}

/**
 * Set the selected string font size
 * @param size font size number
 * default color [12 :Number]
 */
function handleFontSizeChange(size: Number) {
  editor.value.chain().focus().setFontSize(size + "px").run();
}

/**
 * Set the selected string to highlight
 * @param highlightColor The HEX value of the color
 * default color [Yellow :String]
 */
function handleFontHighlight(highlightColor: string) {
  editor.value.chain().focus().toggleHighlight({ color: highlightColor }).run();
}

function openSetLinkDialog() {
  state.fontLinkDialogVisible = true;
  const href = editor.value.getAttributes('link').href;
  if (href) {
    state.link = href;
  } else {
    state.link = "";
  }
}

function handleResetLink() {
  editor.value.chain().focus().extendMarkRange("link").unsetLink().run();
  state.fontLinkDialogVisible = false;
}

function handleSetLink() {
  editor.value.chain().focus().extendMarkRange("link").setLink({ href: state.link }).run();
  state.fontLinkDialogVisible = false;
}

</script>

<template>
  <!-- font family -->
  <div style="width: 240px">
    <el-dropdown trigger="click" split-button type="primary" @click="handleFontFamilyChange(state.fontFamily)">
      {{ state.fontFamily }}
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="(item,index) in fontPredefineFamily" :key="index" @click="state.fontFamily = item">
            {{ item }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>

  <!-- font size -->
  <div>
    <el-select-v2
      v-model="state.fontSize"
      :options="state.fontDataOptions"
      placeholder="please select"
      style="width: 233px"
      allow-create
      filterable
      clearable
      @blur="checkFontSizeIsNumber"
    />
    <el-button @click="handlerFontSizeResize(true)">
      A+
    </el-button>
    <el-button @click="handlerFontSizeResize(false)">
      A-
    </el-button>
  </div>

  <div>
    <!-- font bold  -->
    <el-button @click="handleFontBoldChange">
      Bold
    </el-button>

    <!--  font italic  -->
    <el-button @click="handleFontItalicChange">
      Italic
    </el-button>

    <!-- font highlight -->
    <el-button @click="handleFontHighlight(state.fontHighlightColor)">
      Highlight
    </el-button>
    <el-color-picker v-model="state.fontHighlightColor" :predefine="fontPredefineColors" />
  </div>


  <el-button @click="openSetLinkDialog">
    Set Link
  </el-button>

  <el-dialog v-model="state.fontLinkDialogVisible" title="Set Link" width="500">
    <el-form>
      <el-form-item label="Link">
        <el-input v-model="state.link" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleResetLink">Reset</el-button>
        <el-button type="primary" @click="handleSetLink">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>


</template>

<style scoped lang="scss">

</style>