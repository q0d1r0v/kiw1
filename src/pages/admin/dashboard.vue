<script setup lang="ts">
// imports
import { ref } from 'vue'
import { Chart, Grid, Line, Tooltip, Marker, Area } from 'vue3-charts'

// data
const data = ref([
    {
        product: {
            name: "Posture Support",
            category: {
                name: "Salomatlik"
            }
        },
        count: 2
    },
    {
        product: {
            name: "Posture Support",
            category: {
                name: "Salomatlik"
            }
        },
        count: 2
    },
    {
        product: {
            name: "Posture Support",
            category: {
                name: "Salomatlik"
            }
        },
        count: 2
    },
    {
        product: {
            name: "Posture Support",
            category: {
                name: "Salomatlik"
            }
        },
        count: 2
    }

])
const direction = ref<any>('horizontal')
const margin = ref<any>({
    left: 0,
    top: 20,
    right: 20,
    bottom: 0
})

const axis = ref<any>({
    primary: {
        type: 'band'
    },
    secondary: {
        domain: ['dataMin', 'dataMax + 100'],
        type: 'linear',
        ticks: 8
    }
})

</script>

<template>
    <div>
        <!-- <Chart :size="{ width: 500, height: 420 }" :data="data" :margin="margin" :direction="direction" :axis="axis">

            <template #layers>
                <Grid strokeDasharray="2,2" />
                <Area :dataKeys="['product.name', 'count']" type="monotone" :areaStyle="{ fill: 'url(#grad)' }" />
                <Line :dataKeys="['product.name', 'count']" type="monotone" :lineStyle="{
                    stroke: '#9f7aea'
                }" />
            </template>

            <template #widgets>
                <Tooltip borderColor="#48CAE4" :config="{
                    product: { color: '#9f7aea' },
                    // avg: { hide: true },
                    // inc: { hide: true }
                }" />
            </template>

        </Chart> -->
    </div>
</template>