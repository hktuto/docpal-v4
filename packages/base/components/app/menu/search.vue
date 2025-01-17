<script setup lang="ts">
const { opened, displayList, keyword, keywordRef, selectedItemIndex } = useGlobalSearch()



const { t } = useI18n()

function itemClick(item:GlobalSearchItem) {
    item.action()
    opened.value = false
}


</script>


<template>
    <div class="searchInputButton" @click="opened = true">
        <div class="left">

        <Icon name="lucide:search"  />

            Search
        </div>
        <div class="sub">meta + k</div>
    </div>
    <ElDialog v-model="opened" append-to-body modal @opened="keywordRef.focus()" >
        <div class="searchActionContainer">
            <div class="searchInput">
                <ElInput ref="keywordRef" v-model="keyword" placeholder="Search" clearable></ElInput>
            </div>
            <div class="searchListContainer">
                <div class="searchList" v-for="(list, listIndex) in displayList" :key="listIndex">
                    <div class="searchListLabel">{{ t(list.label) }}</div>
                    <ul class="listItemsContainer">
                        <li v-for="(item, itemIndex) in list.items" :key="itemIndex" 
                            :class="{searchListItem:true ,seleted: selectedItemIndex === listIndex + '-' + itemIndex, ['item-'+listIndex + '-' + itemIndex] :true}"
                            @click="itemClick(item)"
                            @mouseenter="selectedItemIndex = listIndex + '-' + itemIndex"
                            >
                            <div class="label">

                                <Icon v-if="item.icon" :name="item.icon" />
                                {{ t(item.label) }}
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

    </ElDialog>
</template>

<style lang="scss" scoped>
.searchInputButton{
    width:100%;
    border-radius: var(--app-border-radius-m);
    background: var(--app-grey-1000);
    cursor: pointer;
    padding: var(--app-space-s);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: var(--app-font-size-m);
    color: var(--app-grey-400);
    .left{
         flex: 1 0 auto;
         display: flex;
         flex-flow: row nowrap;
         justify-content: flex-start;
         align-items: center;
         gap: var(--app-space-xs);
         line-height: 1;
    }
    .sub{
        font-size: var(--app-font-size-s);
        color: var(--app-grey-500);
    }
    &:hover{
        color: var(--app-accent-color);
        box-shadow: var(--app-shadow-m);
        
    }
}
.searchActionContainer{
    overflow: auto;
    display: grid;
    grid-template-rows: min-content 1fr;
    gap: var(--app-space-s);
    .searchListContainer{
        max-height: 400px;
        overflow: auto;
    }
}
.searchListLabel{
    font-size: var(--app-font-size-s);
}
.listItemsContainer{
    padding: var(--app-space-xs);
    margin: 0;
    list-style: none;
    
}
.searchListItem{
    padding: var(--app-space-xs);
    background: var(--app-grey-1000);
    transition: all 0.2s ease-in-out;
    &.seleted{
        background: var(--app-grey-900);
    }
}
</style>