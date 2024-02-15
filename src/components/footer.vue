<script setup lang="ts">
import {Icon} from "@iconify/vue/dist/iconify.js";

// data
const links = [
  {
    icon: "ri-telegram-line",
    url: "https://t.me/darakchi",
  },
  {
    icon: "ri-instagram-line",
    url: "https://t.me/darakchi",
  },
  {
    icon: "ri-youtube-line",
    url: "https://t.me/darakchi",
  },
];
</script>

<template>
  <div class="parent">
    <div class="desktop bg-black gap-6">
      <div class="row text-white">
        <div
          class="max-sm:w-full min-h-[150px] col-sm-6 col-md-3 border border-[#ffffff1f] p-4"
        >
          <div class="text-lg">Biz haqimizda</div>
          <div class="text-gray-300">
            Biz so'ngi tendensiyalarni taklif qilish uchun mavjudmiz!
          </div>
        </div>
        <div
          class="max-sm:w-full min-h-[150px] col-sm-6 col-md-3 border border-[#ffffff1f] p-4"
        >
          <div class="text-lg">Mijozlar uchun</div>
          <div class="text-gray-300">
            Doimiy mijozlarimiz uchun turli sovg'a va katta chegirmalar!
          </div>
        </div>
        <div
          class="max-sm:w-full min-h-[150px] col-sm-6 col-md-3 border border-[#ffffff1f] p-4"
        >
          <div class="text-lg">Call-Center</div>
          <div class="text-gray-300">+998(95) 973-44-33</div>
        </div>
        <div
          class="max-sm:w-full min-h-[150px] col-sm-6 col-md-3 border border-[#ffffff1f] p-4"
        >
          <div class="text-lg">Biz ijtimoiy tarmoqlarda</div>
          <div class="text-gray-300 flex mt-2 gap-2 text-xl">
            <div
              v-for="(link, index) of links"
              :key="index"
              class="cursor-pointer"
            >
              <Icon :icon="link.icon" class="icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="text-center">
    <span> Created By KIWI </span>
  </div>
</template>

<style scoped lang="scss">
@media screen and (max-width: 1180px) {
  .desktop {
    padding-left: 20px !important;
    padding-right: 20px !important;
    padding-top: 50px !important;
    padding-bottom: 50px !important;
  }
}

.desktop {
  padding-left: 200px;
  padding-right: 200px;
  padding-top: 100px;
  padding-bottom: 100px;
}
</style>
