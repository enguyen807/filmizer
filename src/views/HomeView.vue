<script setup lang="ts">
import BaseCard from '@/components/BaseCard.vue';
const people = ['Actor', 'Actress', 'Director'];
</script>

<template>
    <main class="relative flex flex-col items-center justify-center overflow-hidden pb-6 sm:pb-12">
        <h1 class="mb-5 text-3xl font-bold underline">Select what to randomized</h1>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
            <BaseCard v-for="p in people" :key="p" :person="p"></BaseCard>
        </div>
    </main>
</template>
