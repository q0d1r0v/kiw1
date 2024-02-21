<script setup lang="ts">
// @ts-ignore
import VueApexCharts from "vue3-apexcharts";
import { ref, onMounted, nextTick, watch } from "vue"
import { Loading, Notify } from "quasar";
import { admin } from "../utils/axios";
import { Icon } from "@iconify/vue/dist/iconify.js";
// types
interface IDashboardDataTypes {
    date: {
        input: any,
        date: any
    },
    categories: {
        data: any[],
        value: string
    }
}

// data
const d_data = ref<IDashboardDataTypes>({
    categories: {
        value: "",
        data: []
    },
    date: {
        input: "",
        date: ""
    }
})
const type = "area"
const chartOptions = ref<any>({
    chart: {
        id: "vuechart-example",
    },
    xaxis: {
        categories: [],
    },
})
const series = ref<any>([
    {
        name: "Sotildi",
        data: [],
    }
])
const component_rerender = ref<boolean>(true)
async function getDashboardData() {
    try {
        component_rerender.value = false
        chartOptions.value.xaxis.categories = []
        series.value[0].data = []
        Loading.show()
        const categories = await admin.get("api/categories")
        d_data.value.categories.data = categories.data.data
        const { data } = await admin.get("/api/statistics", {
            params: {
                categoryId: d_data.value.categories.value,
                fromDate: d_data.value.date.date.from ? d_data.value.date.date?.from.split("/").join("-") + "T00:00:00Z" : "1970-01-01T00:00:00Z",
                toDate: d_data.value.date.date.to ? d_data.value.date.date?.to.split("/").join("-") + "T00:00:00Z" : "2070-01-01T00:00:00Z"
            }
        })

        data.data.map((product: any) => {
            chartOptions.value.xaxis.categories.push(product.product.name)
            series.value[0].data.push(product.count)
        })
        await nextTick()
        component_rerender.value = true
    } catch (err) {
        Notify.create({
            color: "red",
            message: "Dashboard ma'lumotlarini yuklab olishda xatolik yuz berdi!"
        })
    } finally {
        Loading.hide()
    }
}
function clearData() {
    d_data.value.date.input = ""
    d_data.value.date.date = ""
}

// watch
watch(() => d_data.value.date.date, () => {
    if(d_data.value.date.date?.from && d_data.value.date.date?.to) {
        d_data.value.date.input = `${d_data.value.date.date?.from}-${d_data.value.date.date?.to}`
    }
    getDashboardData()
})

// on mounted
onMounted(() => {
    getDashboardData()
})
</script>

<template>
    <div>
        <div class="top-bar flex items-center justify-between bg-white p-2 rounded-md">
            <div class="text-lg">
                Filter
            </div>
            <div class="flex items-center justify-end gap-2">
                <q-input v-model="d_data.date.input" outlined dense class="w-[260px]" label="Sana">
                    <template v-slot:append>
                        <Icon icon="ri-close-line" class="cursor-pointer" @click="clearData" />
                        <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                <q-date v-model="d_data.date.date" range>
                                    <div class="row items-center justify-end">
                                        <q-btn v-close-popup label="Yopish" color="red" flat />
                                    </div>
                                </q-date>
                            </q-popup-proxy>
                        </q-icon>
                    </template>
                </q-input>
                <q-select v-model="d_data.categories.value" label="Katalog" :options="d_data.categories.data"
                    option-label="name" option-value="id" map-options emit-value class="w-[260px]" clearable outlined dense
                    @update:model-value="getDashboardData" />
            </div>
        </div>
        <VueApexCharts v-if="component_rerender" :type="type" class="w-full mt-6" height="600" :options="chartOptions"
            :series="series"></VueApexCharts>
    </div>
</template>
  