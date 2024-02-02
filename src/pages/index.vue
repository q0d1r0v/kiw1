<script setup lang="ts">
// imports
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'

const images = [
    'https://olcha.uz/image/original/sliders/ru/PXi4Xq9hQ7Wk2uP2w9pyINXStwWbacpbnruVPMhCHlKkyvgTyRvcu8k3lbeR.png',
    'https://olcha.uz/image/original/sliders/ru/QoSQpYTUvniq1ml5XWW7wXn1lZkSKxI0VxuifX4SoRVPDX6ta9cWlUIXeE6w.jpg'
]

</script>

<template>
    <div>
        <Carousel>
            <Slide v-for="link in images" :key="link">
                <div class="carousel__item text-white">
                    <img :src="link" />
                </div>
            </Slide>

            <template #addons>
                <Navigation />
                <Pagination />
            </template>
        </Carousel>

        <div class="suggestions bg-white h-screen mb-4 rounded-md px-4 p-4">
            <span>
                Tavsiya tovarlar
            </span>
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
</style>