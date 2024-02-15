<template>
    <div class="mt-10 flex justify-center min-h-screen">
        <div>
            <div class="text-md text-center">
                Bunday ma'lumot topilmadi !
            </div>
            <img alt="not found" src="../assets/not-found.svg" width="300" class="mt-8" />
            <div class="flex items-center justify-center mt-8">
                <q-btn unelevated outline color="red" @click="$router.push('/')">
                    Bosh sahifaga qaytish
                </q-btn>
            </div>
        </div>
    </div>
</template>