<script lang="ts" setup>
import {getUserPreference} from '#imports'
import {EventType, useEventBus} from 'eventbus'
import { clientApi  } from 'api'
const opened = ref(false);
const userPreference = useUserPreference()
function handleOpen() {
    console.log('handleOpen')
    opened.value = true;
}


async function reset(){
    await getUserPreference()
    updateStyle()
}

async function saveToServer(){
    clientApi.api.putUserSetting(userPreference.value as any)
}

function updateStyle() {
    // step 1 : get HTML element
    const htmlElement = document.querySelector('html');
    if(!htmlElement) return;
    // step 2 : set style
    console.log('updateStyle', userPreference.value)
    htmlElement.style.fontSize = fontSize.value + 'px';
    // set html light or dark mode class
    if(!userPreference.value || userPreference.value.color === 'light'){
        htmlElement.classList.remove('dark')
        // set data-vxe-ui-theme attr
        htmlElement.setAttribute('data-vxe-ui-theme', 'light');
    }else{
        htmlElement.classList.add('dark')
        htmlElement.setAttribute('data-vxe-ui-theme', 'dark');
    }

    
}

const fontSize = computed({
    get(){
        if(!userPreference.value || !userPreference.value.size) {
            return 16;
        }else{
            const fontSize = userPreference.value.size
            return Number(fontSize.replaceAll('px',""));
        }
    },
    set(value){
        if(!userPreference.value) return;
        userPreference.value.size = value + 'px';
        updateStyle();
    }
})

const colorMode = computed({
    get(){
        if(!userPreference.value || !userPreference.value.color){
            return true;
        }else{
            return userPreference.value.color === 'light'
        }
    },
    set(value){
        userPreference.value.color = value ? 'light' : 'dark';
        console.log("udpate color", value, userPreference.value.color )
        updateStyle();
    }
})

const bus = useEventBus(EventType.OPEN_SETTINGS)
bus.on(handleOpen)
const userLoginBus = useEventBus(EventType.USER_LOGIN__SUCCESS)
userLoginBus.on(updateStyle)
onUnmounted(() => {
    bus.off(handleOpen)
    bus.off(updateStyle)
})

</script>


<template>
    <ElDialog v-model="opened" draggable append-to-body destroy-on-close>
        <div class="settingContainer">
            <div   div class="fontSetting">
                <div class="label">Font Size</div>
                <el-slider v-model="fontSize" :min="10" :max="24"/>
            </div>
           <div class="colorSetting">
             <div class="label">Color Mode</div>
                <ElSwitch v-model="colorMode" active-text="Light" inactive-text="Dark"/>
           </div>
        </div>
        <template #footer>
            <div class="actions">
                <ElButton @click="reset">Cancel</ElButton>
                <ElButton @click="saveToServer">Save</ElButton>
            </div>
        </template>
    </ElDialog>

</template>