<template>
  <!--
		Seeing type errors on the word `class`?
		This unfortunately happens because @types/react's JSX definitions leak into every file due to being declared globally.
		There's currently no way to prevent this when using both Vue and React with TypeScript in the same project.
		You can read more about this issue here: https://github.com/johnsoncodehk/volar/discussions/592
	-->
  <div
    class="bg-white/70 flex flex-col p-3 flex-1 backdrop-blur-md rounded-xl h-72"
  >
    <div class="flex">
      <p class="font-semibold flex-1 text-lg text-black/70">Evolution Chain</p>
      <div>
        <svg
          width="28"
          height="28"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          viewBox="0 0 261.76 226.69"
        >
          <g transform="matrix(1.3333 0 0 -1.3333 -76.311 313.34)">
            <g transform="translate(178.06 235.01)">
              <path
                d="m0 0-22.669-39.264-22.669 39.264h-75.491l98.16-170.02 98.16 170.02z"
                fill="#41b883"
              />
            </g>
            <g transform="translate(178.06 235.01)">
              <path
                d="m0 0-22.669-39.264-22.669 39.264h-36.227l58.896-102.01 58.896 102.01z"
                fill="#34495e"
              />
            </g>
          </g>
        </svg>
      </div>
    </div>

    <div class="flex-1 relative flex items-center">
      <div
        v-for="chainItem in data"
        class="relative flex-1 flex gap-2 flex-col justify-center items-center"
        :key="chainItem.id"
      >
        <p :style="{ color: color }">{{ properCase(chainItem.name) }}</p>
        <img
          :src="
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/' +
            chainItem.id +
            '.png'
          "
          class="w-32 h-32"
        />
      </div>
    </div>

    <div class="flex items-center">
      <button
        @click="subtract()"
        class="text-black/80 hover:bg-black/5 w-8 h-8 flex justify-center items-center rounded-md"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 18L9 12L15 6"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      <div class="flex-1 text-center text-sm text-black/80 font-medium">
        #{{ createLeadingZero(count) }}
      </div>
      <button
        @click="add()"
        class="text-black/80 hover:bg-black/5 w-8 h-8 flex justify-center items-center rounded-md"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 18L15 12L9 6"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { useStore } from "@nanostores/vue";
import { counter, client } from "../utils";
import { createLeadingZero, properCase } from "../utils/fns";
import { useQuery, QueryClient } from "@tanstack/vue-query";
import { getEvolutionChain } from "../api/pokemon";

export default {
  setup() {
    const count = useStore(counter);
    const add = () => counter.set(count.value + 1);
    const subtract = () => counter.set(count.value - 1);

    const queryClient = new QueryClient({
      queryCache: client.getQueryCache(),
    });

    const { data } = useQuery(
      {
        queryKey: ["evolution", count],
        queryFn: () => getEvolutionChain(count.value),
        placeholderData: (prev) => prev,
      },
      queryClient
    );

    const { data: color } = useQuery(
      {
        queryKey: ["color", count],
        queryFn: () => getEvolutionChain(count.value),
        placeholderData: (prev) => prev,
        select(data) {
          return `hsl(${data[0]}, 50%, 25%)`;
        },
      },
      queryClient
    );

    return {
      count,
      add,
      subtract,
      data,
      createLeadingZero,
      properCase,
      color,
    };
  },
};
</script>
