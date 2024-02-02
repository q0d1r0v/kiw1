<script setup lang="ts">
// imports
import { useRoute } from "vue-router"
import { ref, onMounted, watch } from "vue"
import { client } from "../../utils/axios";
import { Loading, Notify } from "quasar";

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

// data
const page_name = ref<string>(route.query.name)

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
                    category_id: route.query.category
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
    const url = import.meta.env.VITE_APP_BASE_URL + "/uploads/" + data.photo1
    console.log(url)

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
                <div class="max-sm:w-full min-h-[350px] col-sm-6 col-md-3 p-4 bg-white border-8 border-[#f6f8fa] rounded-md item"
                    v-for="item of data_of_items.data">
                    <div class="image rounded-md flex items-center justify-center p-4 overflow-scroll">
                        <img :alt="item.name" :src="getImageName(item)" width="200" />
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
}

.item:hover {
    cursor: pointer;
}
</style>