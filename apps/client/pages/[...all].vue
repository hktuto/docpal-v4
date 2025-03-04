<template>
    <div>
        loading
    </div>
</template>


<script lang="ts" setup>
import { clientApi } from '../../../libraries/api/src';

import {ElMessage} from 'element-plus'
// TODO : add custom router control
const route = useRoute()
const router =useRouter()

const hanldeWorkflow = async(processInstanceId:string) => {
    try {
       const taskList = await clientApi.api.getWorkflowTasks({processInstanceId}).then(res => res.data)
        if (taskList && taskList.length > 0) {
            const taskId = taskList[0].id
            const newTab = routeWorkflowDetail({
                id: taskId
            })
            localStorage.setItem('additionalPath', JSON.stringify(newTab))
            router.push('/')
        }
    } catch (error) {
        ElMessage.error('task no valid');
    }
}
onMounted(() => {
    // step1 normalize route path by removing trailing slash
    const path = route.path.replace(/\/$/, '')
    console.log(path);
    
    switch(path){
        case '/browse':
            const path = ((route.query.id || route.query.path) || '/') as string
            const newTab = createBrowseListPageParams({
                idOrPath: decodeURI(path)
            })
            localStorage.setItem('additionalPath', JSON.stringify(newTab))
            router.push('/')
            break;
        case '/workflow/link':
            // TODO: add workflow page
            hanldeWorkflow(route.query.processInstanceId as string)
            break;
        default:
            router.push('/')
    }
})
</script>