/** @jsxImportSource solid-js */

import { createMemo, createSignal, Index } from "solid-js";
import { getPokemon } from "../../api/pokemon";
import { client, counter } from "./store";
import { createQuery } from "@tanstack/solid-query";
import { useStore } from "@nanostores/solid";

/** A counter written with Solid */
export function SolidCounter() {
  const count = useStore(counter);
  const add = () => counter.set(count() + 1);
  const subtract = () => counter.set(count() - 1);

  const pokemonQuery = createQuery(
    () => ({
      queryKey: ["pokemon", count()],
      queryFn: () => getPokemon(count()),
    }),
    () => client
  );

  return (
    <div class="min-h-96 overflow-hidden flex flex-col border shadow-md flex-1 rounded-xl bg-white p-4">
      <Header />

      <div class="flex justify-center items-center text-5xl py-8">
        {count()}
      </div>

      <div class="flex gap-2 items-center justify-center">
        <button
          onClick={subtract}
          class="text-black/80 text-xl border shadow-sm hover:bg-black/5 w-8 h-8 flex justify-center items-center rounded-md"
        >
          -
        </button>

        <button
          onClick={add}
          class="text-black/80 text-xl border shadow-sm hover:bg-black/5 w-8 h-8 flex justify-center items-center rounded-md"
        >
          +
        </button>
      </div>

      <pre>{JSON.stringify(pokemonQuery.data?.name, null, 2)}</pre>
      <CorgiList count={count()} />
    </div>
  );
}

function CorgiList(props: { count: number }) {
  const countArray = createMemo(() =>
    Array.from({ length: props.count }, (_, i) => i)
  );

  return (
    <div class="flex gap-3 flex-wrap mt-4">
      <Index each={countArray()}>
        {(i) => (
          <div class="h-16 w-16 relative">
            <img
              class="absolute inset-0 w-full h-full object-contain object-center"
              src={i() % 2 == 0 ? "./rubber-corgi.png" : "./corgi-pal.png"}
              alt="Corgi"
            />
          </div>
        )}
      </Index>
    </div>
  );
}

function Header() {
  return (
    <div class="flex">
      <div class="text-lg font-semibold flex-1">Solid Component</div>
      <div>
        <svg
          width="28"
          height="28"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 166 155.3"
        >
          <defs>
            <linearGradient
              id="a"
              gradientUnits="userSpaceOnUse"
              x1="27.5"
              y1="3"
              x2="152"
              y2="63.5"
            >
              <stop offset=".1" stop-color="#76b3e1" />
              <stop offset=".3" stop-color="#dcf2fd" />
              <stop offset="1" stop-color="#76b3e1" />
            </linearGradient>
            <linearGradient
              id="b"
              gradientUnits="userSpaceOnUse"
              x1="95.8"
              y1="32.6"
              x2="74"
              y2="105.2"
            >
              <stop offset="0" stop-color="#76b3e1" />
              <stop offset=".5" stop-color="#4377bb" />
              <stop offset="1" stop-color="#1f3b77" />
            </linearGradient>
            <linearGradient
              id="c"
              gradientUnits="userSpaceOnUse"
              x1="18.4"
              y1="64.2"
              x2="144.3"
              y2="149.8"
            >
              <stop offset="0" stop-color="#315aa9" />
              <stop offset=".5" stop-color="#518ac8" />
              <stop offset="1" stop-color="#315aa9" />
            </linearGradient>
            <linearGradient
              id="d"
              gradientUnits="userSpaceOnUse"
              x1="75.2"
              y1="74.5"
              x2="24.4"
              y2="260.8"
            >
              <stop offset="0" stop-color="#4377bb" />
              <stop offset=".5" stop-color="#1a336b" />
              <stop offset="1" stop-color="#1a336b" />
            </linearGradient>
          </defs>
          <path
            d="M163 35S110-4 69 5l-3 1c-6 2-11 5-14 9l-2 3-15 26 26 5c11 7 25 10 38 7l46 9 18-30z"
            fill="#76b3e1"
          />
          <path
            d="M163 35S110-4 69 5l-3 1c-6 2-11 5-14 9l-2 3-15 26 26 5c11 7 25 10 38 7l46 9 18-30z"
            opacity=".3"
            fill="url(#a)"
          />
          <path
            d="M52 35l-4 1c-17 5-22 21-13 35 10 13 31 20 48 15l62-21S92 26 52 35z"
            fill="#518ac8"
          />
          <path
            d="M52 35l-4 1c-17 5-22 21-13 35 10 13 31 20 48 15l62-21S92 26 52 35z"
            opacity=".3"
            fill="url(#b)"
          />
          <path
            d="M134 80a45 45 0 00-48-15L24 85 4 120l112 19 20-36c4-7 3-15-2-23z"
            fill="url(#c)"
          />
          <path
            d="M114 115a45 45 0 00-48-15L4 120s53 40 94 30l3-1c17-5 23-21 13-34z"
            fill="url(#d)"
          />
        </svg>
      </div>
    </div>
  );
}
