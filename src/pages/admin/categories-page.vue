<script setup lang="ts">
// imports
import { ref } from "vue"
import { Icon } from '@iconify/vue/dist/iconify.js';

// types
interface ITypesOfForm {
    dialog_model: boolean,
    editing: boolean,
    dialog_title: string
    form: {
        name: string
        file: any[]
    },
    data: any[]
}

// data
const form = ref<ITypesOfForm>({
    data: [],
    dialog_model: false,
    dialog_title: "",
    editing: false,
    form: {
        name: "",
        file: []
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
    }
}

</script>

<template>
    <div class="flex justify-end">
        <div class="bg-[#7316F6] p-2 rounded-md cursor-pointer" @click="showFormDialog('create')">
            <Icon icon="ri-add-line" class="text-white text-lg" />
        </div>
    </div>
    <div class="mt-4">
        <q-table :columns="header_of_categories" :rows="form.data" flat no-data-label="Ma'lumotlar mavjud emas!" />
    </div>

    <div>
        <q-dialog v-model="form.dialog_model" persistent>
            <q-card style="min-width: 550px; min-height: 350px;" class="p-4">
                <div class="text-lg">
                    {{ form.dialog_title }}
                </div>

                <div class="mt-4">
                    <q-input v-model="form.form.name" label="Nomi" clearable />
                    <q-file v-model="form.form.file" labela="Fayl" class="mt-4" accept=".jpg, .png" clearable>
                        <template v-slot:append>
                            <q-icon name="attach_file" />
                        </template>
                    </q-file>

                    <div class="absolute bottom-0 left-0 right-0 p-4 flex justify-end gap-4">
                        <q-btn outline color="green">
                            Saqlash
                        </q-btn>
                        <q-btn outline color="red" @click="form.dialog_model = false">
                            Bekor qilish
                        </q-btn>
                    </div>
                </div>
            </q-card>
        </q-dialog>
    </div>
</template>