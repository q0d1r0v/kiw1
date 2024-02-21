<script setup lang="ts">
// imports
import NavBar from '../components/navbar.vue'
import DashboardTopBar from "../components/dashboard-topbar.vue"
</script>

<template>
    <div class="flex">
        <div class="w-[15%] bg-white">
            <NavBar />
        </div>
        <div class="w-[85%] h-screen">
            <DashboardTopBar class="bg-white" />
            <div class="bg-[#f6f8fa] h-full p-4">
                <RouterView/>
            </div>
        </div>
    </div>
</template>