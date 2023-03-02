/** @jsxImportSource solid-js */

import { createSignal } from "solid-js";
import { getPokemon, getColorPalette } from "../api/pokemon";
import { client, counter } from "../utils";
import { createQuery } from "@tanstack/solid-query";
import { useStore } from "@nanostores/solid";
import { createLeadingZero } from "../utils/fns";

/** A counter written with Solid */
export function PokedexHeader() {
  const count = useStore(counter);

  const pokemonQuery = createQuery(
    () => ({
      queryKey: ["pokemon", count()],
      queryFn: () => getPokemon(count()),
      placeholderData: (prev) => prev,
    }),
    () => client
  );

  return (
    <>
      <div class="container flex items-center px-8 mt-8 justify-between mx-auto max-w-5xl">
        <p class="text-2xl opacity-70 font-semibold flex gap-2 items-center">
          Pokémon
        </p>
        <p class="text-2xl opacity-70 font-semibold">
          #{createLeadingZero(count())}
        </p>
      </div>

      <div class="container flex items-center px-8 justify-between mx-auto max-w-5xl">
        <p class="text-8xl font-semibold opacity-70 font-fun">
          {pokemonQuery.data?.name}
        </p>
      </div>
    </>
  );
}
