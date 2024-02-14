<script setup lang="ts">
// imports
import { ref, onMounted } from "vue"
import { Icon } from '@iconify/vue/dist/iconify.js';
import { Loading, Notify } from "quasar";
import { admin } from "../../utils/axios";

// types
interface IItemTypes {
    data: any[],
    editing: boolean,
    pagination: {
        page: number,
        size: number,
        max_page: number
    },
    dialog_form: {
        editing_data: any,
        dialog_model: boolean
        dialog_title: string
        name: string,
        description: string
        category_id: string
        price: string
        photos: any[]
    },
    delete: {
        dialog_model: boolean,
        data: any
    }
}

// data
const categories = ref<any[]>([])
const data_of_products = ref<IItemTypes>({
    data: [],
    pagination: {
        page: 1,
        size: 15,
        max_page: 1
    },
    editing: false,
    dialog_form: {
        editing_data: null,
        category_id: '',
        description: '',
        dialog_model: false,
        dialog_title: '',
        name: "",
        photos: [],
        price: ''
    },
    delete: {
        dialog_model: false,
        data: null
    }
})
const header_of_items: any = [
    {
        name: "id",
        label: "ID",
        field: "id",
        align: "left"
    },
    {
        name: "name",
        label: "Nomi",
        field: "name",
        align: "left"
    },
    {
        name: "photo",
        label: "Surati",
        field: "photo",
        align: "left"
    },
    {
        name: "price",
        label: "Narxi",
        field: (product: any) => parseInt(product.price).toLocaleString().split(",").join(" ") + " UZS",
        align: "right"
    },
    {
        name: "is_active",
        label: "Holati",
        field: "is_active",
        align: "left"
    },
    {
        name: "created_at",
        label: "Yaratilgan sana",
        field: (row: any) => row.created_at.split("T").join(" / ").split(".")[0],
        align: "left"
    },
    {
        name: "actions",
        label: "Amallar",
        field: "actions",
        align: "left"
    },
]

// functions
function showFormDialog(action_name: string, data?: any) {
    if (action_name === "create") {
        data_of_products.value.editing = false
        data_of_products.value.dialog_form.dialog_title = "Tovar yaratish"
        data_of_products.value.dialog_form.name = ""
        data_of_products.value.dialog_form.description = ""
        data_of_products.value.dialog_form.category_id = ""
        data_of_products.value.dialog_form.price = ""
        data_of_products.value.dialog_form.photos = []
        data_of_products.value.dialog_form.dialog_model = true
    } else {
        console.log(data)
        data_of_products.value.dialog_form.editing_data = data
        data_of_products.value.editing = true
        data_of_products.value.dialog_form.dialog_title = "Tovarni o'zgartirish"
        data_of_products.value.dialog_form.name = data.name
        data_of_products.value.dialog_form.price = data.price
        data_of_products.value.dialog_form.description = data.description
        data_of_products.value.dialog_form.category_id = data.categoryId
        data_of_products.value.dialog_form.photos = []
        data_of_products.value.dialog_form.dialog_model = true
    }
}

async function getCategories() {
    try {
        const { data } = await admin.get("/api/categories")
        categories.value = data.data

    } catch (err) {
        Notify.create({
            color: "red",
            message: "Kategoriyalarni yuklab olishda xatolik yuz berdi!"
        })
    }
}

async function getProducts() {
    try {
        Loading.show()
        await getCategories()
        const { data } = await admin.get("/api/products", {
            params: {
                is_active: true,
                skip: data_of_products.value.pagination.page,
                limit: 12
            }
        })
        data_of_products.value.pagination.max_page = data.pages
        data_of_products.value.data = data.data
    } catch (err) {
        Notify.create({
            color: "red",
            message: "Tovarlarni yuklab olishda xatolik yuz berdi!"
        })
    } finally {
        Loading.hide()
    }
}
async function sendProduct() {
    if (!data_of_products.value.editing) {
        try {
            Loading.show()
            let images: string[] = []
            data_of_products.value.dialog_form.photos.forEach(async (file: any) => {
                const formData = new FormData()
                formData.append("file", file)
                const { data } = await admin.post("/api/file", formData)

                images.push(data.data)
            })
            setTimeout(async () => {
                await admin.post("/api/products", {
                    name: data_of_products.value.dialog_form.name,
                    description: data_of_products.value.dialog_form.description,
                    photos: images,
                    categoryId: data_of_products.value.dialog_form.category_id,
                    price: ~~data_of_products.value.dialog_form.price,
                })

                await getProducts()

                data_of_products.value.dialog_form.dialog_model = false
                Notify.create({
                    color: "green",
                    message: "Tovar muvoffaqiyatli yaratildi!"
                })
            }, 500)
        } catch (err) {
            Notify.create({
                color: "red",
                message: "Tovarni yaratishda xatolik yuz berdi!"
            })
        } finally {
            Loading.hide()
        }
    } else {
        try {
            Loading.show()
            let images: string[] = []
            if (data_of_products.value.dialog_form.photos.length) {
                data_of_products.value.dialog_form.photos.forEach(async (file: any) => {
                    const formData = new FormData()
                    formData.append("file", file)
                    const { data } = await admin.post("/api/file", formData)

                    images.push(data.data)
                })
            }
            setTimeout(async () => {
                await admin.patch(`/api/products/${data_of_products.value.dialog_form.editing_data.id}`, {
                    name: data_of_products.value.dialog_form.name,
                    description: data_of_products.value.dialog_form.description,
                    photos: data_of_products.value.dialog_form.photos.length ? images : data_of_products.value.dialog_form.editing_data.photos,
                    categoryId: data_of_products.value.dialog_form.category_id,
                    price: ~~data_of_products.value.dialog_form.price,
                })

                await getProducts()

                data_of_products.value.dialog_form.dialog_model = false
                Notify.create({
                    color: "green",
                    message: "Tovar muvoffaqiyatli o'zgartirildi!"
                })
            }, 500)
        } catch (err) {
            Notify.create({
                color: "red",
                message: "Tovarni o'zgartirishda xatolik yuz berdi!"
            })
        } finally {
            Loading.hide()
        }
    }
}
function readImage(name: string) {
    return import.meta.env.VITE_APP_ADMIN_BASE_URL + '/uploads/' + name
}
function showDeleteDialog(data: any) {
    data_of_products.value.delete.data = data
    data_of_products.value.delete.dialog_model = true
}
async function deleteCategory() {
    try {
        Loading.show()
        await admin.delete(`/api/products/${data_of_products.value.delete.data.id}`)

        await getProducts()
        data_of_products.value.delete.dialog_model = false
        Notify.create({
            color: "green",
            message: "Tovar muvoffaqiyatli o'chirildi!"
        })
    } catch (err) {
        Notify.create({
            color: "red",
            message: "Tovarni o'chirishda xatolik yuz berdi!"
        })
    } finally {
        Loading.hide()
    }
}

// on mounted
onMounted(() => {
    getProducts()
})

</script>

<template>
    <div class="flex items-center justify-end gap-4">
        <div>
            <q-pagination boundary-numbers :max-pages="6" v-model="data_of_products.pagination.page"
                :max="data_of_products.pagination.max_page" input dense @update:model-value="getProducts" />
        </div>
        <div class="bg-[#7316F6] p-2 rounded-md cursor-pointer" @click="showFormDialog('create')">
            <Icon icon="ri-add-line" class="text-white text-lg" />
        </div>
    </div>
    <div class="mt-4">
        <q-table :columns="header_of_items" :rows="data_of_products.data" flat no-data-label="Ma'lumotlar mavjud emas!"
            hide-pagination :rows-per-page-options="[0]">
            <template #body-cell-actions="props">
                <td>
                    <q-btn outline round dense color="orange" @click="showFormDialog('edit', props.row)">
                        <Icon icon="ri-edit-line" class="text-sm" />
                    </q-btn>
                    <q-btn outline round dense color="red" class="ml-2" @click="showDeleteDialog(props.row)">
                        <Icon icon="ri-delete-bin-line" class="text-sm" />
                    </q-btn>
                </td>
            </template>

            <template #body-cell-photo="props">
                <td>
                    <img :src="readImage(props.row.photos[0])" width="40" />
                </td>
            </template>
        </q-table>
    </div>

    <q-dialog persistent v-model="data_of_products.dialog_form.dialog_model">
        <q-card style="min-width: 550px; min-height: 460px;" class="p-4">
            <div class="text-lg">
                {{ data_of_products.dialog_form.dialog_title }}
            </div>

            <div class="mt-4">
                <q-input label="Nomi" clearable v-model="data_of_products.dialog_form.name" />
                <q-input label="Narxi" clearable v-model="data_of_products.dialog_form.price" />
                <q-select clearable label="Katalog" option-label="name" option-value="id" :options="categories"
                    v-model="data_of_products.dialog_form.category_id" emit-value map-options />
                <q-input label="Izoh" clearable v-model="data_of_products.dialog_form.description" />
                <q-file label="Tovar rasmi" class="mt-4" accept=".jpg, .png" clearable
                    v-model="data_of_products.dialog_form.photos" multiple>
                    <template v-slot:append>
                        <q-icon name="attach_file" />
                    </template>
                </q-file>

                <div class="absolute bottom-0 left-0 right-0 p-4 flex justify-end gap-4">
                    <q-btn outline color="green" v-if="!data_of_products.editing"
                        :disable="!data_of_products.dialog_form.name || !data_of_products.dialog_form.price || !data_of_products.dialog_form.category_id || !data_of_products.dialog_form.photos?.length"
                        @click="sendProduct">
                        Yaratish
                    </q-btn>
                    <q-btn outline color="green" v-else
                        :disable="!data_of_products.dialog_form.name || !data_of_products.dialog_form.price || !data_of_products.dialog_form.category_id"
                        @click="sendProduct">
                        O'zgartirish
                    </q-btn>
                    <q-btn outline color="red" @click="data_of_products.dialog_form.dialog_model = false">
                        Bekor qilish
                    </q-btn>
                </div>
            </div>
        </q-card>
    </q-dialog>

    <q-dialog v-model="data_of_products.delete.dialog_model" persistent>
        <q-card style="min-width: 300px; min-height: 150px;" class="p-4">
            <div class="text-lg">
                Ushbu tovarni o'chirishni tasdiqlaysizmi?
            </div>

            <div class="mt-4">
                <div class="absolute bottom-0 left-0 right-0 p-4 flex justify-end gap-4">
                    <q-btn outline color="green" @click="deleteCategory">
                        Tasdiqlash
                    </q-btn>
                    <q-btn outline color="red" @click="data_of_products.delete.dialog_model = false">
                        Bekor qilish
                    </q-btn>
                </div>
            </div>
        </q-card>
    </q-dialog>
</template>