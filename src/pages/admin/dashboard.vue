<script setup lang="ts">
// imports
import { Loading, Notify } from "quasar";
import ApexChart from "../../components/apex-chart.vue"
import { ref, onMounted, watch } from "vue"
import { admin } from "../../utils/axios";


async function getDashboardData() {
  try {
    Loading.show()
    
  } catch (err) {
    Notify.create({
      color: "red",
      message: "Dashboard ma'lumotlarini yuklab olishda xatolik yuz berdi!"
    })
  } finally {
    Loading.hide()
  }
}


// on mounted
onMounted(() => {
  getDashboardData()
})
</script>

<template>
  <ApexChart class="mt-4" />
</template>