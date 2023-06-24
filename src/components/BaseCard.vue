<template>
    <div
        class="flex w-56 items-center justify-center overflow-hidden rounded bg-stone-800 shadow-lg hover:cursor-pointer hover:bg-emerald-700 md:h-40 md:w-48"
    >
        <div class="p-6">
            <div class="text-xl font-bold">{{ person }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    person: string;
}>();
</script>
