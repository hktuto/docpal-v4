<template>
    <div class="masterTable-setting" style="height: 100%;">
        <MasterTableSettingActive class="card-active" :table="table">1</MasterTableSettingActive>
        <MasterTableSettingName class="card-name" :table="table">2</MasterTableSettingName>
        <MasterTableSettingPermission class="card-permission" :table="table">3</MasterTableSettingPermission>
    </div>
</template>

<script lang="ts" setup>
import {
} from 'dp-api'
const props = defineProps(['table'])
// #region module: page
    const route = useRoute()
    const router = useRouter()

    const state = reactive<any>({
        loading: false,
    })

    
// #endregion

// #region module: init
    function init() {
        
    }
// #endregion
onMounted(() => {
    init()
})
defineExpose({  })
</script>

<style lang="scss" scoped>
.masterTable-setting {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: min-content 1fr;
    grid-column-gap: var(--app-padding);
    grid-row-gap: var(--app-padding);
}

.card-active { grid-area: 1 / 1 / 2 / 2; }
.card-name { grid-area: 1 / 2 / 2 / 3; }
.card-permission { grid-area: 2 / 1 / 3 / 3; }
</style>
