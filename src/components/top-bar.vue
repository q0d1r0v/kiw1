<script setup lang="ts">
// imports
import { ref, onMounted } from "vue"
import { Icon } from "@iconify/vue"
import { onClickOutside } from "@vueuse/core"
import { useCategoryStore } from "../store/categories"
import { Loading, Notify } from "quasar";
import { router } from "../routes/router";

// types
interface ITypesOfFilter {
    search: string,
    data: any
}

// ref
const target = ref<any>('')

// store
const categories: any = useCategoryStore()

// data
const drawer = ref<boolean>(false)
const m_drawer = ref<boolean>(false)
const filter = ref<ITypesOfFilter>({
    search: "",
    data: null
})

// methods
async function getCategories() {
    try {
        Loading.show()
        await categories.getCategories()
    } catch (err) {
        Notify.create({
            color: "red",
            message: "Ma'lumotlarni yuklab olishda xatolik yuz berdi!"
        })
    } finally {
        Loading.hide()
    }
}

function changeDrawerValue(name: string) {
    if (name === "m_drawer") {
        m_drawer.value = !m_drawer.value
    } else {
        drawer.value = !drawer.value
    }
}

function getImageName(data: any) {
    const url = import.meta.env.VITE_APP_BASE_URL + "/uploads/" + data.photo

    return url
}

function closeNavBar(name: string) {
    if (name === "desktop") {
        drawer.value = false
    } else {
        m_drawer.value = false
    }
}

function goToItemsPage(search: string | boolean, data: boolean | any) {
    if (search) {
        router.push({
            path: "/items",
            query: {
                name: search.toString()
            }
        })
    } else {
        router.push({
            path: "/items",
            query: {
                name: data.name,
                category: data?.id
            }
        })
        drawer.value = false
    }
}

// click outside
onClickOutside(target, () => {
    if (drawer.value || m_drawer.value) {
        drawer.value = false
        m_drawer.value = false
    }
})

// onMounted
onMounted(() => {
    getCategories()
})

</script>

<template>
    <div class="top-bar">
        <div class="desktop">
            <div class="left-side">
                <span class="logo" @click="router.push('/')">KIW1</span>

                <div class="menu" @click="changeDrawerValue('d_drawer')">
                    <Icon icon="ri-menu-line" />
                    <span>
                        Katalog
                    </span>
                </div>
            </div>

            <div class="right-side w-[200px]">
                <q-input outlined dense placeholder="Qidiruv..." v-model="filter.search"
                    @keyup.enter="goToItemsPage(filter.search, false)">
                    <template #append>
                        <Icon icon="ri-search-line" class="text-md cursor-pointer"
                            @click="goToItemsPage(filter.search, false)" />
                    </template>
                </q-input>
            </div>
        </div>

        <div class="mobile">
            <div class="m-menu flex justify-between w-full">
                <span @click="changeDrawerValue('m_drawer')">
                    <Icon icon="ri-menu-line" />
                </span>
                <div class="w-[200px]">
                    <q-input outlined dense placeholder="Qidiruv..." v-model="filter.search"
                        @keyup.enter="goToItemsPage(filter.search, false)">
                        <template #append>
                            <Icon icon="ri-search-line" class="text-md cursor-pointer"
                                @click="goToItemsPage(filter.search, false)" />
                        </template>
                    </q-input>
                </div>
            </div>
        </div>
    </div>

    <q-layout style="position: absolute">
        <q-drawer v-model="drawer" bordered overlay ref="target" :width="800">
            <div class="drawer">
                <div class="flex items-center justify-between">
                    <span class="category-text" @click="router.push('/')">
                        Katalog
                    </span>

                    <div class="inline-block border border-red-400 p-2 rounded-md cursor-pointer select-none text-red-400"
                        @click="closeNavBar('desktop')">
                        <Icon icon="ri-close-line" class="text-lg" />
                    </div>
                </div>

                <div class="mt-6">
                    <div class="row">
                        <div class="col-md-4 bg-[#7316f60a] hover:bg-[#7316f618] active:bg-[#7316f61f] border border-white rounded-md p-4 cursor-pointer select-none text-[#7E39F6] text-lg flex gap-4 items-center"
                            v-for="(category, index) of  categories.categories" :key="index"
                            @click="goToItemsPage(false, category)">
                            <img alt="#katalog" :src="getImageName(category)" width="40" />
                            {{ category.name }}
                        </div>

                        <div class="col-md-4 bg-[#7316f60a] hover:bg-[#7316f618] active:bg-[#7316f61f] border border-white rounded-md p-4 cursor-pointer select-none text-[#7E39F6] text-lg flex gap-4 items-center"
                            @click="router.push('/')">
                            <div class="flex items-center justify-center gap-2">
                                <Icon icon="ri-arrow-left-line" />
                                Bosh sahifaqa qaytish
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </q-drawer>
    </q-layout>

    <q-layout style="position: absolute">
        <q-drawer v-model="m_drawer" bordered overlay ref="target" :width="350">
            <div class="drawer">
                <div class="flex items-center justify-between">
                    <div class="category-text border-none">
                        Katalog
                    </div>

                    <div class="inline-block border border-red-400 p-2 rounded-md cursor-pointer select-none text-red-400"
                        @click="closeNavBar('mobile')">
                        <Icon icon="ri-close-line" class="text-lg" />
                    </div>
                </div>

                <div class="mt-6">
                    <div class="row">
                        <div class="col-sm-6 col-xs-6 bg-[#7316f60a] active:bg-[#7316f618] border border-white rounded-md p-4 cursor-pointer select-none text-[#7E39F6] text-lg flex gap-4 items-center justify-center"
                            v-for="(category, index) of  categories.categories " :key="index"
                            @click="goToItemsPage(false, category)">
                            <img :src="getImageName(category)" width="40" />
                            <div class="text-center">
                                {{ category.name }}
                            </div>
                        </div>

                        <div class="col-sm-6 col-xs-6 bg-[#7316f60a] active:bg-[#7316f618] border border-white rounded-md p-4 cursor-pointer select-none text-[#7E39F6] text-lg flex gap-4 items-center justify-center"
                            @click="router.push('/')">
                            <Icon icon="ri-arrow-left-line" />
                            <div class="text-center">
                                Bosh sahifaqa qaytish
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </q-drawer>
    </q-layout>
</template>

<style scoped lang="scss">
@media screen and (max-width: 1180px) {
    .desktop {
        display: none !important;
    }

    .mobile {
        display: flex !important;
        align-items: center;
        max-height: 100px;
        height: 100%;
        align-items: center;
        justify-content: flex-start;
        padding-left: 10px;
        padding-right: 10px;

        & span {
            font-size: 25px;
            border: 1px solid rgba(0, 0, 0, 0.1);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 5px;
            border-radius: 8px;
            -webkit-user-select: none;
            cursor: pointer;
        }
    }
}

.m-menu {}

.drawer {
    padding: 20px;

    & .category-text {
        font-size: 24px;
        font-weight: 600;
    }
}

.top-bar {
    height: 65px;
    background: #fff;

    & .desktop {
        height: 100%;
        padding-left: 200px;
        padding-right: 200px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        & .left-side {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 40px;

            & .logo {
                font-size: 20px;
                font-weight: bold;
                -webkit-user-select: none;
                cursor: pointer;
                color: #7316F6;
            }

            .menu {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 10px;
                font-size: 20px;
                border: 1px solid #7316F6;
                background: #7316f60a;
                color: #7316F6;
                -webkit-user-select: none;
                cursor: pointer;
                padding-left: 10px;
                padding-right: 10px;
                padding-top: 5px;
                padding-bottom: 5px;
                border-radius: 5px;
            }

            .menu:hover {
                background: #7316f613;
            }

            .menu:active {
                background: #7316f61c;
            }
        }
    }

    .mobile {
        display: none;
    }
}
</style>