/** @jsxImportSource solid-js */

import { createSignal, For, Index } from "solid-js";
import { getPokemon, Pokemon } from "../../api/pokemon";
import { client, counter } from "./store";
import { createQuery } from "@tanstack/solid-query";
import { useStore } from "@nanostores/solid";

/** A counter written with Solid */
export function SSRName(props: { pokemon: Pokemon }) {
  const count = useStore(counter);

  // const pokeQuery = createQuery(
  //   () => ({
  //     queryKey: ["pokemon", count()],
  //     queryFn: () => getPokemon(count()),
  //     placeholderData: (prev) => prev,
  //     initialData: () => (count() === 1 ? props.pokemon : undefined),
  //     staleTime: 1000 * 20,
  //   }),
  //   () => client
  // );

  return (
    <h1 class="text-8xl font-fun font-bold text-amber-50">
      {/* {pokeQuery.data.name} */}
    </h1>
  );
}
