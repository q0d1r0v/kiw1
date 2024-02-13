<script setup lang="ts">
// imports
import { onMounted, ref } from "vue"
import { Icon } from '@iconify/vue/dist/iconify.js';
import { Loading, Notify } from "quasar";
import { admin } from "../../utils/axios";

// types
interface ITypesOfForm {
    dialog_model: boolean,
    editing: boolean,
    editing_data: any,
    dialog_title: string
    form: {
        name: string
        file: any
    },
    data: any[],
    delete: {
        dialog_model: boolean,
        data: any
    }
}

// data
const form = ref<ITypesOfForm>({
    data: [],
    dialog_model: false,
    editing_data: null,
    dialog_title: "",
    editing: false,
    form: {
        name: "",
        file: []
    },
    delete: {
        dialog_model: false,
        data: null
    }
})
const header_of_categories: any = [
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
        name: "actions",
        label: "Amallar",
        field: "actions",
        align: "left"
    },
]

// functions
function showFormDialog(action_name: string, data?: any) {
    if (action_name === "create") {
        form.value.editing = false
        form.value.form.name = ""
        form.value.form.file = []
        form.value.dialog_title = "Yangi katalog yaratish"
        form.value.dialog_model = true
    } else {
        form.value.editing_data = data
        form.value.editing = true
        form.value.form.name = data.name
        form.value.form.file = data.photo
        form.value.dialog_title = "Katalogni yangilash"
        form.value.dialog_model = true
    }
}

async function sendForm() {
    if (!form.value.editing) {
        try {
            Loading.show()
            const formData = new FormData()

            formData.append("file", form.value.form.file)
            const { data } = await admin.post("/api/file", formData)

            const file_url = data.data

            await admin.post("/api/categories", {
                name: form.value.form.name,
                photo: file_url
            })

            await getCategories()
            form.value.dialog_model = false
            Notify.create({
                color: "green",
                message: "Kategoriya muvoffaqiyatli yaratildi!"
            })
        } catch (err) {
            Notify.create({
                color: "red",
                message: "Kategoriya yaratishda xatolik yuz berdi!"
            })
        } finally {
            Loading.hide()
        }
    } else {
        try {
            Loading.show()
            const formData = new FormData()

            if (form.value.form.file.__key) {
                formData.append("file", form.value.form.file)
                const { data } = await admin.post("/api/file", formData)

                const file_url = data.data

                await admin.patch(`/api/categories/${form.value.editing_data.id}`, {
                    name: form.value.form.name,
                    photo: file_url
                })
            } else {
                await admin.patch(`/api/categories/${form.value.editing_data.id}`, {
                    name: form.value.form.name,
                    photo: form.value.editing_data.photo
                })
            }

            await getCategories()
            form.value.dialog_model = false
            Notify.create({
                color: "green",
                message: "Kategoriya muvoffaqiyatli o'zgartirildi!"
            })
        } catch (err) {
            Notify.create({
                color: "red",
                message: "Kategoriya yaratishda xatolik yuz berdi!"
            })
        } finally {
            Loading.hide()
        }
    }
}

async function getCategories() {
    try {
        Loading.show()
        const { data } = await admin.get("api/categories")
        form.value.data = data.data
    } catch (err) {
        Notify.create({
            color: "red",
            message: "Kategoriyalarni yuklab olishda xatolik yuz berdi!"
        })
    } finally {
        Loading.hide()
    }
}
function showDeleteDialog(data: any) {
    form.value.delete.data = data
    form.value.delete.dialog_model = true
}
async function deleteCategory() {
    try {
        await admin.delete(`/api/categories/${form.value.delete.data.id}`)

        await getCategories()
        form.value.delete.dialog_model = false
        Notify.create({
            color: "green",
            message: "Kategoriya muvoffaqiyatli o'chirildi!"
        })
    } catch (err) {
        Notify.create({
            color: "red",
            message: "Kategoriyani o'chirishda xatolik yuz berdi!"
        })
    } finally {
        Loading.hide()
    }
}

// on mounted
onMounted(() => {
    getCategories()
})

</script>

<template>
    <div class="flex justify-end">
        <div class="bg-[#7316F6] p-2 rounded-md cursor-pointer" @click="showFormDialog('create')">
            <Icon icon="ri-add-line" class="text-white text-lg" />
        </div>
    </div>
    <div class="mt-4">
        <q-table :columns="header_of_categories" :rows="form.data" flat no-data-label="Ma'lumotlar mavjud emas!"
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
        </q-table>
    </div>

    <div>
        <q-dialog v-model="form.dialog_model" persistent>
            <q-card style="min-width: 550px; min-height: 350px;" class="p-4">
                <div class="text-lg">
                    {{ form.dialog_title }}
                </div>

                <div class="mt-4">
                    <q-input v-model="form.form.name" label="Nomi" clearable />
                    <q-file v-model="form.form.file" label="Fayl" class="mt-4" accept=".jpg, .png" clearable>
                        <template v-slot:append>
                            <q-icon name="attach_file" />
                        </template>
                    </q-file>

                    <div class="absolute bottom-0 left-0 right-0 p-4 flex justify-end gap-4">
                        <q-btn v-if="form.editing" outline color="green" @click="sendForm" :disable="!form.form.name">
                            O'zgartirish
                        </q-btn>
                        <q-btn v-else outline color="green" @click="sendForm"
                            :disable="!form.form.name || !form.form.file?.__key">
                            Yaratish
                        </q-btn>
                        <q-btn outline color="red" @click="form.dialog_model = false">
                            Bekor qilish
                        </q-btn>
                    </div>
                </div>
            </q-card>
        </q-dialog>

        <q-dialog v-model="form.delete.dialog_model" persistent>
            <q-card style="min-width: 300px; min-height: 150px;" class="p-4">
                <div class="text-lg">
                    Ushbu kategoriyani o'chirishni tasdiqlaysizmi?
                </div>

                <div class="mt-4">
                    <div class="absolute bottom-0 left-0 right-0 p-4 flex justify-end gap-4">
                        <q-btn outline color="green" @click="deleteCategory">
                            Tasdiqlash
                        </q-btn>
                        <q-btn outline color="red" @click="form.delete.dialog_model = false">
                            Bekor qilish
                        </q-btn>
                    </div>
                </div>
            </q-card>
        </q-dialog>
    </div>
</template>