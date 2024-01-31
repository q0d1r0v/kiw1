<script setup lang="ts">
// imports
import { Icon } from "@iconify/vue"

// data
const links = [
    {
        icon: "ri-telegram-line",
        url: "https://t.me/darakchi"
    },
    {
        icon: "ri-instagram-line",
        url: "https://t.me/darakchi"
    },
    {
        icon: "ri-youtube-line",
        url: "https://t.me/darakchi"
    },
]

</script>

<template>
    <div class="parent">
        <div class="mobile">
            <div v-for="(link, index) of links" :key="index">
                <Icon :icon="link.icon" class="icon" />
            </div>
        </div>
        <div class="left-side desktop">
            <span>
                +998 99 123 45 67
            </span>
        </div>
        <div class="right-side desktop">
            <div v-for="(link, index) of links" :key="index">
                <Icon :icon="link.icon" class="icon" />
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.mobile {
    gap: 10px;
}

.parent {
    height: 30px;
    background: #EFF0F1;
    padding-left: 200px;
    padding-right: 200px;
    display: flex;
    align-items: center;
    justify-content: center;

    & .left-side {
        width: 50%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }

    .right-side {
        width: 50%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 10px;

        .icon {
            cursor: pointer;
            -webkit-user-select: none;
            font-size: 18px;
        }
    }
}

@media screen and (max-width: 1180px) {
    .desktop {
        display: none !important;
    }

    .mobile {
        display: flex !important;
        align-items: center;
        max-height: 100px;
    }
}

@media screen and (min-width: 1180px) {
    .desktop {
        display: block;
    }

    .mobile {
        display: none !important;
    }
}
</style>