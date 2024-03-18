<script setup lang="ts">
// imports
import { useRoute } from "vue-router"
import { ref, onMounted, watch, nextTick } from "vue"
import { client } from "../../utils/axios";
import { Loading, Notify } from "quasar";
import { Icon } from "@iconify/vue"
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

// types
interface ITypesOfItems {
    pagination: {
        page: number,
        size: number,
        max_page: number
    },
    data: any[]
}

// route
const route = useRoute()

const data_of_items = ref<ITypesOfItems>({
    pagination: {
        page: 1,
        size: 15,
        max_page: 1
    },
    data: []
})
const component_rerender = ref<boolean>(true)

// methods
async function getProducts() {
    if (!route.query.category) {
        try {
            Loading.show()
            const { data } = await client.get("/api/products", {
                params: {
                    is_active: true,
                    search: route.query.name,
                    skip: data_of_items.value.pagination.page,
                    // limit: data_of_items.value.pagination.size
                }
            })
            data_of_items.value.data = data.data
            data_of_items.value.pagination.max_page = data.pages
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
                    categoryId: route.query.category,
                    skip: data_of_items.value.pagination.page,
                    // limit: data_of_items.value.pagination.size
                }
            })
            data_of_items.value.data = data.data
            data_of_items.value.pagination.max_page = data.pages
        } catch (err) {
            Notify.create({
                color: "red",
                message: "Ma'lumotlarni yuklab olishda xatolik yuz berdi!"
            })
        } finally {
            Loading.hide()
        }
    }
    component_rerender.value = false
    await nextTick()
    component_rerender.value = true
}
function getImageName(data: any) {
    const url = import.meta.env.VITE_APP_BASE_URL + "/uploads/" + data

    return url
}

// watch
watch(() => route.query, async () => {
    component_rerender.value = false
    await getProducts()
    await nextTick()
    component_rerender.value = true
})

// mounted
onMounted(() => {
    getProducts()
})

</script>

<template>
    <div class="mb-4 min-h-screen">
        <div v-if="data_of_items.data.length > 0">
            <div class="mt-4 text-lg flex justify-between">
                <div>
                    Qidiruv: {{ route.query.name }}
                </div>

                <div>
                    <q-pagination input v-model="data_of_items.pagination.page" :max="data_of_items.pagination.max_page"
                        :max-pages="6" @update:model-value="getProducts" />
                </div>
            </div>
            <div class="mt-4 row">
                <div class="max-sm:w-full min-h-[350px] col-xs-6 col-sm-6 col-md-3 col-lg-3 p-4 bg-white border-8 border-[#f6f8fa] item"
                    v-for="item of data_of_items.data" @click="$router.push({ path: '/item', query: { item: item.id } })">
                    <div class="image rounded-md flex items-center justify-center p-4">
                        <Carousel v-if="component_rerender">
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
                    <span class="text-sm mt-4">
                        {{ item.name }}
                    </span>

                    <div class="text-bold">
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