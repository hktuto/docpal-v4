

<template>
    <AuthState>
        <template #default="{loggedIn}">
            <AppWraper>
                <template #sidebar>
                        <AppMenu>
                            <template #footer>
                            </template>
                        </AppMenu>
                </template>
                <slot name="header" />
                <template #header>
                    <slot name="header" />
                </template>
                <slot  />
                <slot name="footer" />
            </AppWraper>
        </template>
        <template #placeholder>
            <div class="loadingContainer">
                <LoadingBg >
                    Loading
                </LoadingBg>
            </div>
        </template>
    </AuthState>
</template>

<style scoped lang="scss">
.layoutSidebar{
    position: relative;
}
.loadingContainer{
    width:100svw;
    height: 100svh;
    display: grid;
    place-items: center;
    color: #fff;
    background: var(--el-menu-active-color);
}
</style>