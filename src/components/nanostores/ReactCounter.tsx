import { useState, useEffect, useMemo, ReactNode } from "react";
import { getPokemon } from "../../api/pokemon";
import { useQuery } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useStore } from "@nanostores/react";
import { counter, client } from "./store";

/** A counter written with React */
export function ReactCounter() {
  const count = useStore(counter);
  const add = () => counter.set(count + 1);
  const subtract = () => counter.set(count - 1);

  const pokemonQuery = useQuery(
    {
      queryKey: ["pokemon", count],
      queryFn: () => getPokemon(count),
    },
    client
  );

  return (
    <div className="min-h-96 overflow-hidden flex flex-col border shadow-md flex-1 rounded-xl bg-white p-4">
      <Header />

      <div className="flex justify-center items-center text-5xl py-8">
        {count}
      </div>

      <div className="flex gap-2 items-center justify-center">
        <button
          onClick={subtract}
          className="text-black/80 text-xl border shadow-sm hover:bg-black/5 w-8 h-8 flex justify-center items-center rounded-md"
        >
          -
        </button>

        <button
          onClick={add}
          className="text-black/80 text-xl border shadow-sm hover:bg-black/5 w-8 h-8 flex justify-center items-center rounded-md"
        >
          +
        </button>
      </div>

      <pre>{JSON.stringify(pokemonQuery.data?.name, null, 2)}</pre>

      <CorgiList count={count} />

      <ReactQueryDevtools queryClient={client} />
    </div>
  );
}

function CorgiList({ count }: { count: number }) {
  return (
    <div className="flex gap-3 flex-wrap mt-4">
      {Array.from({ length: count }, (_, i) => (
        <div className="h-16 w-16 relative" key={i}>
          <img
            className="absolute inset-0 w-full h-full object-contain object-center"
            src={i % 2 == 0 ? "./rubber-corgi.png" : "./corgi-pal.png"}
            alt="Corgi"
          />
        </div>
      ))}
    </div>
  );
}

function Header() {
  return (
    <div className="flex">
      <div className="text-lg font-semibold flex-1">React Component</div>
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="-11.5 -10.232 23 20.463"
        >
          <circle r="2.05" fill="#61dafb"></circle>
          <g fill="none" stroke="#61dafb">
            <ellipse rx="11" ry="4.2"></ellipse>
            <ellipse rx="11" ry="4.2" transform="rotate(60)"></ellipse>
            <ellipse rx="11" ry="4.2" transform="rotate(120)"></ellipse>
          </g>
        </svg>
      </div>
    </div>
  );
}
