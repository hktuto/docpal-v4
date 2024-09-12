<script setup lang="ts">
const menuState = useMenuState()
const menu = useMenuList();
</script>

<template>
    <div :class="{menuContainer:true, [menuState]:true}">
        <div class="menuHeader">
            <slot name="header"></slot>
        </div>
        <div class="menuBody">
            <div class="menuContainer">
                <div v-for="item in menu" :key="item.id" class="menuItem" >
                    <div class="iconContainer">
                        <SvgIcon :src="item.icon" :content="item.key"/>
                    </div>
                    <div v-if="menuState !== 'icon'" class="label">
                        {{item.key}}
                    </div>
                </div>
            </div>
        </div>
        <div class="menuFooter">
            <slot name="footer"></slot>
        </div>
        <div class="toggler openButton" @click="menuState === 'icon' ? menuState = 'opened' : menuState = 'icon'">
            <div class="icon">
                <SvgIcon :src="menuState === 'icon' ? '/icons/right.svg' : '/icons/left.svg'" />
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.menuContainer{
    --icon-size: var(--app-space-m);
    --item-padding-block: var(--app-space-xs);
    --item-padding-inline: var(--app-space-s);
    --menu-max: 200px;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: min-content 1fr min-content;
    position: relative;
    isolation: isolate;
    padding-right: var(--page-padding);
    transition: all .2s ease-in-out;
    
    &.icon {
        width: calc( var(--icon-size) + (var(--item-padding-inline) * 2 ) +  var(--page-padding));
        transition-delay: .2s;
    }
    &.opened {
        width: var(--menu-max);
    }
    &:focus-within, &:hover {
        .toggler{
            transform: translate(0);
        }
    }
}

.menuItem{
    padding: var(--item-padding-block) var(--item-padding-inline);
    --icon-color: var(--el-color-info-light-3);
    --icon-hover-color: var(--app-grey-1);
    border-radius: var(--app-border-radius-xs);
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    color: var(--icon-color);
    gap: var(--item-padding-block);
    .iconContainer{
        width: var(--icon-size);
        height: var(--icon-size);
    }
    &:hover {
        --icon-color: var(--el-color-info);
        background-color: var(--app-grey-20);
    }
}

.toggler{
    --icon-size: var(--app-space-s);
    --transform : calc( var(--page-padding) + var(--icon-size) );
    position: absolute;
    top: 0;
    right: calc( var(--app-border-radius-s) * -1 ); 
    height: 100%;
    width: calc( var(--app-border-radius-s) * 2.5 );
    z-index: 1;
    transform: translate(var(--transform));
    cursor: pointer;
    background: linear-gradient( 90deg, rgba(255,255,255,0) 0%, var(--el-color-primary-light-7) 100% );
    transition: transform 0.2s ease-in-out;
    .icon{
        position: absolute;
        top: clamp(0%, calc(var(--mouse-y) - var(--icon-size)), calc(100% - var(--icon-size) - 5px) );
        left: 0;
        width: var(--icon-size);
        height: var(--icon-size);
        display: grid;
        place-items: center;
        color: var(--el-menu-active-color);
    }
}
</style>