<script lang="ts" setup>

const {item} = defineProps<{
    item:TableMenuActions
}>()

const isActive = ref(false)

function setActive(){

}

</script>

<template>
    <li :class="{['link--active']:isActive}">
        <a href="" class="vxe-context-menu--link">
            <div class="vxe-context-menu--link-prefix"></div>
            <div class="vxe-context-menu--link-content">
                {{ item.name }}
            </div>
            <div class="vxe-context-menu--link-suffix">
                <i v-if="item.children" class="vxe-table-icon-arrow-right" />
            </div>
        </a>
        <ContextmenuList :items="item.children" v-if="item.children" />
    </li>
</template>
