<script setup lang="ts">
import { Loading, Notify } from 'quasar';
import { onMounted, ref } from 'vue';
import { admin } from '../../utils/axios';
import { Icon } from '@iconify/vue/dist/iconify.js';


// types
interface IBannerDataType {
    form: {
        image_file: any
    },
    dialog_model: boolean,
    data: any,
    deleting: {
        data: any,
        dialog_model: boolean
    }
}

// header of table
const header_of_banner: any = [
    {
        name: "id",
        label: "ID",
        field: "id",
        align: "left"
    },
    {
        name: "photo",
        label: "Surati",
        field: "photo",
        align: "left"
    },
    {
        name: "actions",
        label: "Amallar",
        field: "actions",
        align: "left"
    },
]

// data
const bdata = ref<IBannerDataType>({
    data: [],
    dialog_model: false,
    deleting: {
        data: null,
        dialog_model: false
    },
    form: {
        image_file: null
    }
})

// functions
async function getBanners() {
    try {
        const { data } = await admin.get("/api/banner")

        bdata.value.data = data.data
        console.log(data)
    } catch (err) {
        Notify.create({
            color: "red",
            message: "Bannerlarni yuklab olishda xatolik yuz berdi!"
        })
    } finally {
        Loading.hide()
    }
}
function showCreateDialog() {
    bdata.value.form.image_file = null
    bdata.value.dialog_model = true
}

async function createBanner() {
    try {
        const formData = new FormData()

        formData.append("file", bdata.value.form.image_file)

        // create image
        const { data } = await admin.post("/api/file", formData)

        // send image
        await admin.post("/api/banner", {
            image: data.data
        })

        // update data
        await getBanners()
        bdata.value.dialog_model = false
        Notify.create({
            color: "green",
            message: "Banner muvoffaqiyatli yaratildi!"
        })
    } catch (err) {
        Notify.create({
            color: "red",
            message: "Bannerlarni yaratishda xatolik yuz berdi!"
        })
    } finally {
        Loading.hide()
    }
}
function readImage(name: string) {
    return import.meta.env.VITE_APP_ADMIN_BASE_URL + '/uploads/' + name
}
function showDeleteDialog(data: any) {
    bdata.value.deleting.data = data
    bdata.value.deleting.dialog_model = true
}
async function deleteBanner() {
    try {
        await admin.delete(`/api/banner/${bdata.value.deleting.data?.id}`)

        await getBanners()
        bdata.value.deleting.dialog_model = false
        Notify.create({
            color: "green",
            message: "Banner muvoffaqiyatli o'chirildi!"
        })
    } catch (err) {
        Notify.create({
            color: "red",
            message: "Bannerlarni o'chirishda xatolik yuz berdi!"
        })
    } finally {
        Loading.hide()
    }
}

// on mounted
onMounted(() => {
    getBanners()
})
</script>

<template>
    <div>
        <div class="flex justify-end">
            <div class="bg-[#7316F6] p-2 rounded-md cursor-pointer" @click="showCreateDialog">
                <Icon icon="ri-add-line" class="text-white text-lg" />
            </div>
        </div>
        <q-table :columns="header_of_banner" :rows="bdata.data" flat no-data-label="Ma'lumotlar mavjud emas!" class="mt-4"
            hide-pagination :rows-per-page-options="[0]">
            <template #body-cell-photo="props">
                <q-td>
                    <img :src="readImage(props.row.image)" alt="#banner_image" width="60">
                </q-td>
            </template>

            <template #body-cell-actions="props">
                <q-td>
                    <q-btn outline round dense color="red" class="ml-2" @click="showDeleteDialog(props.row)">
                        <Icon icon="ri-delete-bin-line" class="text-sm" />
                    </q-btn>
                </q-td>
            </template>
        </q-table>

        <q-dialog v-model="bdata.dialog_model" persistent>
            <q-card style="min-width: 500px; min-height: 250px;" class="p-4">
                <div class="text-lg">
                    Yangi banner yaratish
                </div>

                <div class="mt-4">
                    <q-file v-model="bdata.form.image_file" label="Fayl" class="mt-4" accept=".jpg, .png" clearable>
                        <template v-slot:append>
                            <q-icon name="attach_file" />
                        </template>
                    </q-file>

                    <div class="absolute bottom-0 left-0 right-0 p-4 flex justify-end gap-4">
                        <q-btn outline color="green" :disable="!bdata.form.image_file" @click="createBanner">
                            Yaratish
                        </q-btn>
                        <q-btn outline color="red" @click="bdata.dialog_model = false">
                            Bekor qilish
                        </q-btn>
                    </div>
                </div>
            </q-card>
        </q-dialog>

        <q-dialog v-model="bdata.deleting.dialog_model" persistent>
            <q-card style="min-width: 300px; min-height: 150px;" class="p-4">
                <div class="text-lg">
                    Ushbu bannerni o'chirishni tasdiqlaysizmi?
                </div>

                <div class="mt-4">
                    <div class="absolute bottom-0 left-0 right-0 p-4 flex justify-end gap-4">
                        <q-btn outline color="green" @click="deleteBanner">
                            Tasdiqlash
                        </q-btn>
                        <q-btn outline color="red" @click="bdata.deleting.dialog_model = false">
                            Bekor qilish
                        </q-btn>
                    </div>
                </div>
            </q-card>
        </q-dialog>
    </div>
</template>