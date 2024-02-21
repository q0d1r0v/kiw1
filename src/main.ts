import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { router } from "./routes/router";
import { Quasar, Loading, Notify } from "quasar";
import "@quasar/extras/material-icons/material-icons.css";
import "quasar/src/css/index.sass";
import { createPinia } from "pinia";
import VueApexCharts from "vue3-apexcharts";

// pinia
const pinia = createPinia();

createApp(App)
  .use(Quasar, {
    plugins: {
      Loading,
      Notify,
    },
  })
  .use(router)
  .use(pinia)
  .use(VueApexCharts)
  .mount("#app");
