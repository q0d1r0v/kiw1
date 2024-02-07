
<script setup lang="ts">
// imports
import { Icon } from '@iconify/vue/dist/iconify.js';

// functions
function logOut() {
    window.localStorage.clear()
    window.location.reload()
}

</script>

<template>
    <div class="p-6 text-2xl flex items-center justify-between">
        {{ $route.meta.title }}
        <div>
            <Icon icon="ri-logout-box-r-line" class="text-md cursor-pointer" @click="logOut()" />
        </div>
    </div>
</template>