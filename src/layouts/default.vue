<script setup lang="ts">
// imports
import TopLineBar from "../components/top-line-bar.vue"
import TopBar from "../components/top-bar.vue"

</script>

<template>
    <div>
        <top-line-bar />
        <top-bar />
        <div class="layout">
            <router-view />
        </div>
    </div>
</template>

<style scoped lang="scss">
@media screen and (max-width: 1180px) {
    .layout {
        padding: 0 !important;
    }
}

.layout {
    padding-left: 200px;
    padding-right: 200px;
}
</style>