/** @jsxImportSource solid-js */

import { createSignal, For, Index } from "solid-js";
import {
  getPokemon,
  getColorPalette,
  getStats,
  Pokemon,
} from "../../api/pokemon";
import { client, counter } from "./store";
import { createQuery } from "@tanstack/solid-query";
import { useStore } from "@nanostores/solid";
import { createLeadingZero } from "../../utils/fns";

/** A counter written with Solid */
export function SSRStats(props: {
  stats: {
    value: number;
    label: string;
  }[];
}) {
  const count = useStore(counter);
  const add = () => counter.set(counter.get() + 1);
  const subtract = () => counter.set(counter.get() - 1);

  const statsQuery = createQuery(
    () => ({
      queryKey: ["pokemon-stats", count()],
      queryFn: () => getStats(count()),
      placeholderData: (prev) => prev,
      initialData: () => (count() === 1 ? props.stats : undefined),
      staleTime: 1000 * 2,
    }),
    () => client
  );

  return (
    <div class="bg-white border shadow-md flex flex-col p-3 flex-1 backdrop-blur-md rounded-xl h-72">
      <div class="flex">
        <p class="font-semibold flex-1 text-lg text-black/70">Stats</p>
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

      <div class="flex-1 px-1">
        <div class="flex gap-3 align-middle mt-1">
          <div>
            <Index each={statsQuery.data || []}>
              {(stat, i) => (
                <div class="flex justify-between text-black/80 h-6 mt-2 items-center">
                  <div class="font-semibold text-sm">{stat().label}</div>
                </div>
              )}
            </Index>
          </div>
          <div class="flex-1">
            <Index each={statsQuery.data || []}>
              {(stat, i) => (
                <div class="flex items-center mt-2 h-6">
                  <div class="flex-1 bg-[#201d29]/20 h-3 rounded-full relative">
                    <div
                      class="absolute bg-[#201d29] transition-all inset-y-0 left-0 rounded-full"
                      style={{
                        width: `${stat().value < 100 ? stat().value : 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              )}
            </Index>
          </div>
          <div>
            <Index each={statsQuery.data || []}>
              {(stat, i) => (
                <div class="flex text-black/80 justify-between h-6 mt-2 items-center">
                  <div class="font-semibold text-sm tabular-nums">
                    {Math.round((stat().value / 100) * 150)}
                  </div>
                </div>
              )}
            </Index>
          </div>
        </div>
      </div>

      <div class="flex items-center">
        <button
          onClick={subtract}
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
          #{createLeadingZero(count())}
        </div>
        <button
          onClick={add}
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
  );
}
