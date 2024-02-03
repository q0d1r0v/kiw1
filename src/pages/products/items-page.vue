<script setup lang="ts">
// imports
import { useRoute } from "vue-router"
import { ref, onMounted, watch } from "vue"
import { client } from "../../utils/axios";
import { Loading, Notify } from "quasar";
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

// types
interface ITypesOfItems {
    pagination: {
        page: number,
        size: number
    },
    data: any[]
}

// route
const route = useRoute()

const data_of_items = ref<ITypesOfItems>({
    pagination: {
        page: 1,
        size: 15
    },
    data: []
})

// methods
async function getProducts() {
    if (!route.query.category) {
        try {
            Loading.show()
            const { data } = await client.get("/api/products", {
                params: {
                    is_active: true,
                    search: route.query.name
                }
            })
            data_of_items.value.data = data.data
        } catch (err) {
            Notify.create({
                color: "red",
                message: "Ma'lumotlarni yuklab olishda xatolik yuz berdi!"
            })
        } finally {
            Loading.hide()
        }
    } else {
        try {
            Loading.show()
            const { data } = await client.get("/api/products", {
                params: {
                    is_active: true,
                    categoryId: route.query.category
                }
            })
            data_of_items.value.data = data.data
        } catch (err) {
            Notify.create({
                color: "red",
                message: "Ma'lumotlarni yuklab olishda xatolik yuz berdi!"
            })
        } finally {
            Loading.hide()
        }
    }
}
function getImageName(data: any) {
    const url = import.meta.env.VITE_APP_BASE_URL + "/uploads/" + data

    return url
}

// watch
watch(() => route.query, async () => {
    getProducts()
})

// mounted
onMounted(() => {
    getProducts()
})

</script>

<template>
    <div class="mb-4 min-h-screen">
        <div v-if="data_of_items.data.length > 0">
            <div class="mt-4 text-lg">
                Qidiruv: {{ route.query.name }}
            </div>
            <div class="mt-4 row">
                <div class="max-sm:w-full min-h-[350px] col-sm-6 col-md-3 col-lg-2 p-4 bg-white border-8 border-[#f6f8fa] item"
                    v-for="item of data_of_items.data">
                    <div class="image rounded-md flex items-center justify-center p-4">
                        <Carousel>
                            <Slide v-for="link in item.photos" :key="link">
                                <div class="carousel__item text-white">
                                    <img :src="getImageName(link)" alt="item" />
                                </div>
                            </Slide>

                            <template #addons>
                                <Navigation />
                                <Pagination />
                            </template>
                        </Carousel>
                    </div>
                    <span class="text-sm mt-4">
                        {{ item.name }}
                    </span>
                </div>
            </div>
        </div>

        <div v-else class="mt-10 flex items-center justify-center">
            <div>
                <div class="text-md text-center">
                    Bunday ma'lumot topilmadi !
                </div>
                <img alt="no-data" src="../../assets/no-data.svg" width="300" class="mt-8" />
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.item {
    z-index: 1;
    transition: all 0.3s;
    border-radius: 20px;
}

.item:hover {
    cursor: pointer;
}
</style>