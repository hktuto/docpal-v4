<script lang="ts" setup>
import { clientApi } from 'api'
const props = defeineProps<{
    idOrPath: string,
    home: any,
}>();
const { idOrPath } = toRefs(props)

const tabProvider = inject(TabManagerKey)
const routerProvider = inject(MenuRouterKey)
const selectedItem = ref<any[]>([])
if(!tabProvider || !routerProvider) {
    throw createError('provider not found')
}
const docDetail = ref<any>()
const aclDetail = ref<any>()

async function getDetail() {
    
}

</script>

<template>
    <div class="pageContainer" >

    </div>
</template>