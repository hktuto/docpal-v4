<template>
    <!-- <div class="actionIconContainer">
        <el-tooltip content="copy">
            <el-icon class="actionIcon" @click="copyPath">
                <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728=""><path fill="currentColor" d="M768 832a128 128 0 0 1-128 128H192A128 128 0 0 1 64 832V384a128 128 0 0 1 128-128v64a64 64 0 0 0-64 64v448a64 64 0 0 0 64 64h448a64 64 0 0 0 64-64h64z"></path><path fill="currentColor" d="M384 128a64 64 0 0 0-64 64v448a64 64 0 0 0 64 64h448a64 64 0 0 0 64-64V192a64 64 0 0 0-64-64H384zm0-64h448a128 128 0 0 1 128 128v448a128 128 0 0 1-128 128H384a128 128 0 0 1-128-128V192A128 128 0 0 1 384 64z"></path></svg>
            </el-icon>
        </el-tooltip>
    </div> -->
    <BrowseActionsButton id="copyPathActionButton" :label="$t('button.copyPath')" @click="copyPath">
      <SvgIcon src="/icons/file/copy.svg" round :content="$t('button.copyPath')"
                  ></SvgIcon>
    </BrowseActionsButton>
</template>

<script lang="ts" setup>
import {ElNotification } from 'element-plus'
import { useRuntimeConfig } from 'nuxt/app';
const props = defineProps<{
    doc?: any
}>()
const { t } = useI18n()
function copyPath(){
    // copy path to clipboard
    // TODO : use object to copy
    const el = document.createElement('textarea');
    const host = window.location.host
    const protocol = window.location.protocol
    el.value = protocol + '//' + host + '/browse?path=' +  encodeURIComponent(props.doc.path);
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);

    // show notification using element-plus 
    ElNotification({
        title: 'Success',
        message: t('dpTip.copyPathSuccess'),
        type: 'success',
        duration: 6000
    });
}
</script>
