<template>
    <AuthState>
        <template #default="{ loggedIn }">
            <AppWrapper>
                <template #sidebar>
                    sidebar
                    <LangSwitch />
                </template>
                <template #header>
                    header
                </template>
                <template #default>
                    <slot />
                </template>
            </AppWrapper>
        </template>
        <template #placeholder>
            <LoadingBg >
             <h1>{{ $t('loading') }}</h1>
            </LoadingBg>
        </template>
    </AuthState>

</template>

<style scoped>
h1{
    color:#fff;
}
</style>