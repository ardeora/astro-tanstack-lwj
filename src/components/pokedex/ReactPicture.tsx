import { useState, useEffect, useMemo, ReactNode } from "react";
import { getPokemon, getColorPalette } from "../../api/pokemon";
import { client, counter } from "./store";
import { useQuery } from "@tanstack/react-query";
import { useStore } from "@nanostores/react";
import { createLeadingZero } from "../../utils/fns";

/** A counter written with React */
export function ReactPicture() {
  const count = useStore(counter);
  const add = () => counter.set(counter.get() + 1);
  const subtract = () => counter.set(counter.get() - 1);

  const { data } = useQuery(
    {
      queryKey: ["pokemon", count],
      queryFn: () => getPokemon(count),
      placeholderData: (prev) => prev,
    },
    client
  );

  return (
    <div className="bg-white/70 flex flex-col p-3 aspect-square backdrop-blur-md rounded-xl h-72">
      <div className="flex">
        <p className="font-semibold flex-1 text-lg text-black/70">Picture</p>
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

      <div className="flex-1 relative">
        {data && (
          <img
            className="absolute inset-0 w-full h-full object-contain object-center"
            src={data.sprites.other["official-artwork"].front_default}
            alt={data.name}
          />
        )}
      </div>

      <div className="flex items-center">
        <button
          onClick={subtract}
          className="text-black/80 hover:bg-black/5 w-8 h-8 flex justify-center items-center rounded-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 18l-6-6 6-6"
            ></path>
          </svg>
        </button>
        <div className="flex-1 text-center text-sm text-black/80 font-medium">
          #{createLeadingZero(count)}
        </div>
        <button
          onClick={add}
          className="text-black/80 hover:bg-black/5 w-8 h-8 flex justify-center items-center rounded-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 18l6-6-6-6"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
}
