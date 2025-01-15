<script setup lang="ts">
const props = defineProps<{
    calendatView: "MONTH" | "WEEK" | "DAY",
    firstOfWeek: "MONDAY" | "SUNDAY",
    defaultSlot: number,
}>();

const { setting } = useCalendarStore();


</script>


<template>
    <div class="calendarContainer">

    </div>
</template>