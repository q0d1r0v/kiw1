<script setup lang="ts">
// imports
import {ref} from "vue"
import NavBar from '../components/navbar.vue'
import DashboardTopBar from "../components/dashboard-topbar.vue"

// data
const page_title = ref<string>("")

// methods
function changeTitle(title: string) {
    page_title.value = title
}

</script>

<template>
    <div>
    </div>
    <div class="flex">
        <div class="w-[15%]">
            <NavBar @change-title="changeTitle" />
        </div>
        <div class="w-[85%] h-screen">
            <DashboardTopBar :title="page_title"/>
            <div class="bg-[#f1f4f7] h-full p-4">
                <RouterView/>
            </div>
        </div>
    </div>
</template>