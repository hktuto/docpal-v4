<template>
    <!-- <div style="--icon-color: var(--app-primary-color)"> -->
        <!-- <SvgIcon src="/icons/file/changeDocType.svg"  
            :content="$t('tip.changeDocType')"
            @click="iconClickHandler()"></SvgIcon> -->
    <el-button type="info" @click="iconClickHandler()">{{ $t('meta.regexData') }}</el-button>
        <el-dialog class="scroll-dialog" v-model="dialogOpened" append-to-body 
                    :close-on-click-modal="false">
            <template #header>
                <strong class="primaryTitle">{{ $t('meta.regexData') }}</strong>
            </template>
            <div>
                <div v-for="(item, key) in commonRegExp" >
                    <div style="--icon-color: var(--app-primary-color)" class="flex-x-start regex-title">
                        <SvgIcon v-if="!noCopy" size="16" src="/icons/file/copy.svg" @click="handleCopy(item)"></SvgIcon>
                        <b class="el-icon--right">{{$t(`designer.hint.${key}`) }}：</b> 
                    </div>
                    
                    <el-input :value="item" disabled>
                        <template #prepend>/</template>
                        <template #append>/</template>
                    </el-input>
                </div>
            </div>
        </el-dialog>
    <!-- </div> -->
    
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus'

const dialogOpened = ref(false)
async function iconClickHandler(){
    dialogOpened.value = true
}
const commonRegExp = {
    numberValidator: '^[-]?\\d+(\\.\\d+)?$',
    nonnegativeInteger: '^\d+$',
    letterValidator: '^[A-Za-z]+$',
    letterAndNumberValidator: '^[A-Za-z0-9]+$',
    mobilePhoneValidator: '^[1][3-9][0-9]{9}$',
    letterStartNumberIncluded: '^[A-Za-z]+[A-Za-z\\d]*$',
    // noChinese: '^[^\u4e00-\u9fa5]+$',
    // chinese: '^[\u4e00-\u9fa5]+$',
    emailValidator: '^([-_A-Za-z0-9.]+)@([_A-Za-z0-9]+\\.)+[A-Za-z0-9]{2,3}$',
    urlValidator: '^([hH][tT]{2}[pP]:\\/\\/|[hH][tT]{2}[pP][sS]:\\/\\/)(([A-Za-z0-9-~]+)\\.)+([A-Za-z0-9-~\\/])+$',
    IDNumber: '^\d{15}|\d{18}$'
}
function handleCopy(value) {
    copy(value, $i18n.t('common_copySuccess'))
}
onMounted(async() => {
})
defineExpose({ iconClickHandler })
</script>
<style lang="scss" scoped>
.regex-title {
    line-height: 30px;
    padding-top: 10px;
}
</style>
