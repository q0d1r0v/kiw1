<script setup lang="ts">
// imports
import { Loading, Notify } from 'quasar';
import { onMounted, ref } from 'vue';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
import { client } from '../utils/axios';
import { Icon } from '@iconify/vue/dist/iconify.js';

// data
const banner_images = ref<any>([])
const random_products = ref<any[]>([])

// methods
async function getBanners() {
    try {
        const { data } = await client.get("/api/banner")
        banner_images.value = data.data


        console.log(banner_images.value)
    } catch (err) {
        Notify.create({
            color: "red",
            message: "Bannerlarni yuklab olishda xatolik yuz berdi!"
        })
    } finally {
        Loading.hide()
    }
}
async function getRandomProducts() {
    try {
        Loading.show()
        await getBanners()
        const { data } = await client.get("/api/products/random")
        random_products.value = data.data
    } catch (err) {
        Notify.create({
            color: "red",
            message: "Tovarlarni yuklab olishda xatolik yuz berdi!"
        })
    } finally {
        Loading.hide()
    }
}
function getImageName(data: any) {
    const url = import.meta.env.VITE_APP_BASE_URL + "/uploads/" + data

    return url
}
function readImage(name: string) {
    return import.meta.env.VITE_APP_ADMIN_BASE_URL + '/uploads/' + name
}

// onmounted
onMounted(() => {
    getRandomProducts()
})

</script>

<template>
    <div>
        <Carousel>
            <Slide style="border-radius: 8px; overflow: hidden;" v-for="(img, index) of banner_images" :key="index">
                <div class="carousel__item text-white">
                    <img :src="readImage(img.image)" style="width: 100% !important;" alt="#banner_image" />
                </div>
            </Slide>

            <template #addons>
                <Navigation />
                <Pagination />
            </template>
        </Carousel>

        <div class="suggestions min-h-screen rounded-md mt-4 mb-4">
            <span class="text-lg">
                Random tovarlar
            </span>

            <div class="mt-4 row">
                <div class="max-sm:w-full min-h-[350px] col-xs-6 col-sm-6 col-md-3 col-lg-3 p-4 bg-white border-4 border-[#f6f8fa] item"
                    v-for="item of random_products" @click="$router.push({ path: '/item', query: { item: item.id } })">
                    <div class="image rounded-md flex items-center justify-center">
                        <Carousel>
                            <Slide v-for="link in item.photos" :key="link">
                                <div class="carousel__item text-white">
                                    <img :src="getImageName(link)" alt="item" width="250" />
                                </div>
                            </Slide>

                            <template #addons>
                                <Navigation />
                                <Pagination />
                            </template>
                        </Carousel>
                    </div>
                    <div class="text-lg mt-4">
                        {{ item.name }}
                    </div>

                    <div class="text-lg mt-4">
                        {{ parseInt(item.price).toLocaleString().split(",").join(" ") }} UZS
                    </div>

                    <div class="mt-4">
                        <q-btn unelevated outline style="color: #FF004D;">
                            <div class="flex items-center gap-2">
                                Sotib olish
                                <Icon icon="ri-shopping-cart-fill" />
                            </div>
                        </q-btn>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.carousel__item {
    width: 100%;
    background: #f6f8fa;
    color: var(--vc-clr-white);
    font-size: 20px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.carousel__slide {
    margin-top: 16px;
}

.carousel__prev,
.carousel__next {
    box-sizing: content-box;
    border: 5px solid white;
}

.item {
    z-index: 1;
    transition: all 0.3s;
    border-radius: 20px;
}

.item:hover {
    cursor: pointer;
}
</style>