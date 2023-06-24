<script setup lang="ts">
import BaseCard from '@/components/BaseCard.vue';
import { onMounted, ref } from 'vue';
import ApiService from '@/core/services/ApiService';
import type { PeopleList, Result } from '@/core/interfaces/MoviesInterface';

enum Department {
  Actor = "Acting",
  Actress = "Acting",
  Director = "Directing"
}

const PEOPLE: Array<string> = ['Actor', 'Actress', 'Director'];
const people = ref<Result[]>([]);

/**
 * 
 * @param max number - max number of pages
 * @param min number - min number of pages
 * @return number - random int between min and max
 */
const getRandomPage = (max: number, min: number = 1): number => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
};

/**
 * 
 * @param pageNumber number
 * @return PeopleList - Promise with the results from api call to /person/popular
 */
const getPeople = (pageNumber: number): Promise<PeopleList> => {
    return ApiService.get('https://api.themoviedb.org/3/person/popular', {
        params: { page: pageNumber },
    })
    .then(response => response.data)
    .catch(error => error);
};

/**
 * 
 * @param peopleArray Result
 */
const checkForDirector = async (peopleArray: Result[]) => {
  const pArray = peopleArray.filter(p => p.known_for_department === "Directing");
  if (!pArray.length) {
    const res = await getPeople(getRandomPage(500))
    people.value.push(...res.results);
    checkForDirector(people.value);
  } 
}

const handleGetPerson = (department: string, gender?: number): Result => {
  const pArray = people.value.filter(p => p.known_for_department === department);
  gender ? pArray.filter(p => p.gender === gender) : null;
  return pArray[Math.floor(Math.random() * people.value.length)];
}

/**
 * 
 * @param p string - either Actor, Actress or Director
 */
const handleInitialialSelect = (p: string) => {
  const department = Department[p as keyof typeof Department];

  if (department === Department.Director) {
    checkForDirector(people.value)
    console.log(handleGetPerson(department))
  } else if (p === 'Actress') {
    console.log(handleGetPerson(department, 1))
  } else {
    console.log(handleGetPerson(department, 2))
  }
  
}

onMounted(() => {
  getPeople(getRandomPage(500))
    .then(res => {
      people.value.push(...res.results)
    });
});
</script>

<template>
    <main class="relative flex flex-col items-center justify-center overflow-hidden pb-6 sm:pb-12">
        <h1 class="mb-5 text-3xl font-bold underline">Select what to randomized</h1>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
            <BaseCard v-for="p in PEOPLE" :key="p" :person="p" @click="handleInitialialSelect(p)"></BaseCard>
        </div>
    </main>
</template>
