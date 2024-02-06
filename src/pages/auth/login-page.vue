<script setup lang="ts">
// imports
import { ref } from "vue"
import { vMaska } from "maska"
import { Loading, Notify } from "quasar";
import { client } from "../../utils/axios";
import { useRouter } from "vue-router";

// types
interface IFormType {
  phone_number: string
  password: string
}

// router
const router = useRouter()

// data
const form = ref<IFormType>({
  phone_number: '',
  password: '',
})

// methods
async function sendForm() {
  try {
    Loading.show()
    const {data} = await client.post("/api/auth/login", {
      phone_number: form.value.phone_number,
      password: form.value.password
    })
    localStorage.setItem("access_token", data.data)
    router.push("/admin/dashboard")
  } catch(err) {
    Notify.create({
      color: "red",
      message: "Kirishda xatolik yuz berdi!"
    })
  } finally {
    Loading.hide()
  }
}

</script>

<template>
  <div class="login_container">
    <div class="login_block">
      <div class="login_text">
        Kirish
      </div>
      <div class="form pt-4">
        <q-input v-model="form.phone_number" label="Telefon raqam" placeholder="+998" clearable class="mb-3" v-maska data-maska="+998#########" />
        <q-input v-model="form.password" type="password" clearable label="Parol" class="mb-8" />
        <div>
          <q-btn outline style="width: 100%;" class="mt-4" color="blue" :disable="!form.phone_number || !form.password" @click="sendForm">
            Kirish
          </q-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: #f7f7fa;
  display: flex;
  align-items: center;
  justify-content: center;

  & .login_block {
    width: 600px;
    background: #fff;
    border-radius: 8px;
    padding: 35px;

    & .login_text {
      text-align: center;
      font-size: 25px;
    }

    & .form {
      width: 100%;
      height: 100%;
      margin: auto;
    }
  }
}
</style>