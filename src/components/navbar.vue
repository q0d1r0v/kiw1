<script setup lang="ts">
// imports
import { Icon } from '@iconify/vue/dist/iconify.js';
import { useRouter } from 'vue-router';

// types
interface ITypesOfNavbar {
    id: number
    name: string
    path: string
    icon: string
}

// router
const router = useRouter()

// data
const list_of_navbar: ITypesOfNavbar[] = [
    {
        id: 1,
        name: "Dashboard",
        path: "/admin/dashboard",
        icon: "ri-dashboard-line"
    },
    {
        id: 2,
        name: "Banner",
        path: "/admin/banner",
        icon: "ri-dropdown-list"
    },
    {
        id: 3,
        name: "Tovarlar",
        path: "/admin/items",
        icon: "ri-file-list-2-line"
    },
    {
        id: 4,
        name: "Katalog",
        path: "/admin/categories",
        icon: "ri-list-check-2"
    }
]

// functions
function changePage(list: ITypesOfNavbar) {
    router.push({
        path: list.path
    })
}

</script>

<template>
    <div class="select-none">
        <div class="logo flex items-center justify-center p-4 text-2xl">
            <img alt="logo" src="../assets/logo.svg" width="80"/>
        </div>

        <div class="menu flex items-center justify-center mt-4 px-8">
            <div v-for="(list, index) of list_of_navbar" :key="index"
                :class="`${$route.path === list.path ? `bg-[#7316F6] text-white` : ``} w-full text-[#7316F6] flex items-center justify-start p-4 rounded-xl gap-4 cursor-pointer`" @click="changePage(list)">
                <Icon :icon="list.icon" class="text-2xl" />
                <span class="text-md">
                    {{ list.name }}
                </span>
            </div>
        </div>
    </div>
</template>