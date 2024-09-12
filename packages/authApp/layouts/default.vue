<template>
    <AuthState>
        <template #default="{ loggedIn }">
            <AppWrapper>
                <template #sidebar>
                    sidebar
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
            loading
        </template>
    </AuthState>

</template>