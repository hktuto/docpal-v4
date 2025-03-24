<script setup lang="ts">
import { useRelatedFolder } from '~/composables/relatedFolder';

const props = defineProps<{
  detail: any,
  permission: any,
}>()

const emit = defineEmits(['show-relate', 'hide-relate'])
const relatedChildren = ref<any>([])
const { getRelated} = useRelatedFolder();

function openMap() {
  const ev = new CustomEvent('show-relate-map',{detail:{
    doc: props.detail,
    permission: props.permission
  }})
  document.dispatchEvent(ev)
}

watch(() => props.detail, async(val) => {
  console.log("detail", val)
  relatedChildren.value = await getRelated(val);
},{
  immediate: true
})


</script>

<template>
  <div id="relatedInfoContainer">
    
    <div class="header">
      <!-- <div v-if="relatedChildren.length > 0" class="action" @click="openMap">
        {{ $t('related_view_map') }}
        <SvgIcon src="/icons/map.svg" />
      </div> -->
    </div>
    <div class="content">
      <template v-if="relatedChildren.length === 0">
        {{ $t('noData') }}
        </template>
      <RelatedTable v-for="item in relatedChildren" :key="item.id" :data="item"></RelatedTable>
    </div>
  </div>
</template>

<style scoped lang="scss">
#relatedInfoContainer{
  height: 100%;
  display: grid;
  grid-template-rows: min-content 1fr;
  gap: var(--app-space-s);
  .content{
    overflow: auto;
  }
}
.header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .action {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    color: var(--color-grey-300);
    font-size: 0.8rem;
    &:hover {
      color: var(--app-primary-color);
    }
  }
}
</style>