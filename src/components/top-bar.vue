<script setup lang="ts">
// imports
import { ref } from "vue"
import { Icon } from "@iconify/vue"
import { onClickOutside } from "@vueuse/core"

// ref
const target = ref<any>('')

// data
const drawer = ref<boolean>(false)
const m_drawer = ref<boolean>(false)

// methods
function changeDrawerValue(name: string) {
    if (name === "m_drawer") {
        m_drawer.value = !m_drawer.value
    } else {
        drawer.value = !drawer.value
    }
}

// click outside
onClickOutside(target, () => {
    if (drawer.value || m_drawer.value) {
        drawer.value = false
        m_drawer.value = false
    }
})

</script>

<template>
    <div class="top-bar">
        <div class="desktop">
            <div class="left-side">
                <span class="logo">KIW1</span>

                <div class="menu" @click="changeDrawerValue('d_drawer')">
                    <Icon icon="ri-menu-line" />
                    <span>
                        Katalog
                    </span>
                </div>
            </div>

            <div class="right-side">
                Right side
            </div>
        </div>

        <div class="mobile">
            <div class="m-menu" @click="changeDrawerValue('m_drawer')">
                <span>
                    <Icon icon="ri-menu-line" />
                </span>
            </div>
        </div>
    </div>

    <q-layout style="position: absolute">
        <q-drawer v-model="drawer" show-if-above bordered overlay ref="target" :width="800">
            <div class="drawer">
                <span class="category-text">
                    Katalog d
                </span>
            </div>
        </q-drawer>
    </q-layout>

    <q-layout style="position: absolute">
        <q-drawer v-model="m_drawer" show-if-above bordered overlay ref="target" :width="350">
            <div class="drawer">
                <span class="category-text">
                    Katalog m
                </span>
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
        justify-content: start;
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
    box-shadow: 0px 12px 10px -10px rgba(0, 0, 0, 0.1);

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
        }
    }

    .mobile {
        display: none;
    }
}
</style>