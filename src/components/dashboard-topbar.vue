<script setup lang="ts">
// types
interface IPropsType {
    title: string
}

// props
const props = defineProps<IPropsType>()

</script>

<template>
    <div class="p-6 text-2xl">
        {{ props?.title }}
    </div>
</template>