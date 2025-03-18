<script lang="ts" setup>
import dayjs from 'dayjs'
import {ElMessage, ElTimeSelect} from 'element-plus'
import { snapDownTo15Minutes } from '../../utils/calendarHelper'
import { clientApi } from 'api'
const opened = ref(false);

const newEventId = defineModel<string>('newEventId')


</script>

<template>
<ElDialog v-model="opened" append-to-body>
</ElDialog>


</template>