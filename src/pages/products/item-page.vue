<script setup lang="ts">
// imports
import { Loading, Notify } from "quasar";
import { onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";
import { client } from "../../utils/axios";
import { Carousel, Navigation, Pagination, Slide } from "vue3-carousel";
import { vMaska } from "maska"

// types
interface IPaymentMethodType {
    id: number,
    title: string,
    value: string
}

interface IFormTypes {
    dialog_model: boolean,
    phone_number: string,
    full_name: string,
    address: string,
    payment_method: {
        data: IPaymentMethodType[],
        value: string
    },
    description: string
}

// route
const route = useRoute();

// data
const product = ref<any>(null);
const form = ref<IFormTypes>({
    dialog_model: false,
    full_name: "",
    phone_number: "",
    address: "",
    payment_method: {
        data: [
            {
                id: 1,
                title: "NAQT",
                value: "NAQT"
            },
            {
                id: 2,
                title: "KARTA",
                value: "KARTA"
            }
        ],
        value: ""
    },
    description: ""
})

// functions
async function getProduct() {
    try {
        Loading.show();
        const { data } = await client.get(`/api/products/${route.query.item}`);
        product.value = data.data;
    } catch (err) {
        Notify.create({
            color: "red",
            message: "Tovarlarni yuklab olishda xatolik yuz berdi!",
        });
    } finally {
        Loading.hide();
    }
}
function getImageName(data: any) {
    const url = import.meta.env.VITE_APP_BASE_URL + "/uploads/" + data

    return url
}
function showOrderDialog() {
    form.value.full_name = ""
    form.value.phone_number = ""
    form.value.address = ""
    form.value.payment_method.value = ""
    form.value.description = ""
    form.value.dialog_model = true
}

async function sendForm() {
    try {
        await client.post("/api/orders", {
            productId: product.value.id,
            full_name: form.value.full_name,
            phone_number: form.value.phone_number,
            address: form.value.address,
            payment_method: form.value.payment_method.value,
            note: form.value.description
        })

        form.value.dialog_model = false
        Notify.create({
            color: "green",
            message: "Buyurtma muvaffaqiyatli yuborildi!"
        })
    } catch (err) {
        Notify.create({
            color: "red",
            message: "Buyurtmani yuborishda xatolik uz berdi!"
        })
    } finally {
        Loading.hide()
    }
}

// mounted
onBeforeMount(() => {
    getProduct();
});
</script>

<template>
    <div class="min-h-screen rounded-md overflow-hidden">
        <div class="row mt-4 rounded-md overflow-hidden">
            <div class="bg-white col-sm-12 col-md-6 col-lg-6">
                <div class="image rounded-md p-4 min-w-[400px]">
                    <Carousel>
                        <Slide v-for="link in product?.photos" :key="link">
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
            </div>
            <div class="max-sm:w-full bg-white col-sm-12 col-md-6 col-lg-6 p-4">
                <div class="text-[#FF004D]">
                    Nomi:
                </div>
                <div class="text-lg">{{ product?.name }}</div>

                <div class="mt-4 text-[#FF004D]">
                    Narxi:
                </div>
                <div class="text-lg">{{ parseInt(product?.price).toLocaleString().split(",").join(" ") }} UZS</div>

                <div class="mt-4 text-[#FF004D]">
                    Buyurtma:
                </div>
                <div class="mt-2">
                    <q-btn unelevated style="background: #FF004D; color: #fff; border-radius: 5px;"
                        @click="showOrderDialog">
                        <div class="flex items-center gap-2">
                            Buyurtma berish
                        </div>
                    </q-btn>
                </div>

                <div class="mt-4 text-[#FF004D]">
                    Mahsulot haqida qisqacha:
                </div>
                <div class="text-md" v-html="product?.description"></div>
            </div>
        </div>

        <q-dialog v-model="form.dialog_model">
            <q-card style="max-width: 500px; max-height: 400px; width: 500px; height: 400px;">
                <div class="p-4">
                    <div class="text-lg">
                        Buyurtma berish
                    </div>

                    <div class="mt-4">
                        <q-input v-model="form.full_name" placeholder="Ism va familya" dense clearable />
                        <q-input v-model="form.phone_number" v-maska data-maska="+998(##)-###-##-##" placeholder="+998()"
                            dense class="mt-2" clearable />
                        <q-input v-model="form.address" placeholder="Manzil" dense class="mt-2" clearable />
                        <q-select v-model="form.payment_method.value" :options="form.payment_method.data" map-options
                            emit-value option-label="title" option-value="value" label="To'lov usuli" dense class="mt-2" clearable />
                        <q-input v-model="form.description" placeholder="Izoh" dense class="mt-2" clearable />
                    </div>

                    <div class="absolute bottom-0 left-0 right-0 flex justify-end p-4">
                        <q-btn unelevated color="green" :disable="!form.full_name || !form.phone_number || !form.address || !form.payment_method.value"
                            @click="sendForm">
                            Buyurtma berish
                        </q-btn>
                    </div>
                </div>
            </q-card>
        </q-dialog>
    </div>
</template>
