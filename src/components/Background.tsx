import { useState, useEffect, useMemo, ReactNode } from "react";
import { getPokemon, getColorPalette } from "../api/pokemon";
import { client, counter } from "../utils";
import { QueryClientProvider, useQuery } from "@tanstack/react-query";
import { useStore } from "@nanostores/react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

/** A counter written with React */
export function Background() {
  return (
    <>
      <ReactQueryDevtools queryClient={client} />
      <BackgroundColor />
    </>
  );
}

const constrainValue = (value, min, max) => {
  return Math.min(Math.max(value, min), max);
};

function BackgroundColor() {
  const count = useStore(counter);

  const { data } = useQuery(
    {
      queryKey: ["color", count],
      queryFn: () => getColorPalette(count),
      placeholderData: (prev) => prev,
    },
    client
  );

  const color = !data
    ? ""
    : `linear-gradient(
		45deg,
		hsl(${constrainValue(data[0] + 25, 0, 360)}deg ${constrainValue(
        data[1] + 50,
        0,
        100
      )}% ${constrainValue(data[2] - 10, 0, 100)}%) 0%,
		hsl(${constrainValue(data[0] - 25, 0, 360)}deg ${constrainValue(
        data[1] + 25,
        0,
        100
      )}% ${constrainValue(data[2] + 10, 0, 100)}%) 100%
	)`;

  const iconColor = !data
    ? ""
    : `hsl(${data[0]}deg ${constrainValue(
        data[1] + 25,
        0,
        100
      )}% ${constrainValue(data[2] - 10, 0, 100)}%)`;

  return (
    <div>
      <div
        style={{
          position: "fixed",
          zIndex: -10,
          backgroundImage: color,
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          opacity: 0.5,
          transition: "background-image 0.5s ease",
        }}
      ></div>
      <div
        style={{
          position: "fixed",
          zIndex: -8,
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          opacity: 0.3,
        }}
      >
        <Icon color={iconColor} />
      </div>
    </div>
  );
}

function Icon({ color }: { color: string }) {
  const size = "75vh";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      style={{
        rotate: "90deg",
        position: "absolute",
        right: "0%",
        top: "50%",
        transform: "translate(-85%, -45%)",
      }}
      fill="none"
      viewBox="0 0 96 96"
    >
      <g fill={color}>
        <path
          fillRule="evenodd"
          d="M48 96c26.51 0 48-21.49 48-48S74.51 0 48 0 0 21.49 0 48s21.49 48 48 48zm0-19c16.016 0 29-12.984 29-29S64.016 19 48 19 19 31.984 19 48s12.984 29 29 29z"
          clipRule="evenodd"
        ></path>
        <path d="M45 60.652v16.195a29.324 29.324 0 006 0V60.652C56.733 59.298 61 54.147 61 48c0-6.147-4.267-11.298-10-12.652V19.153a29.324 29.324 0 00-6 0v16.195C39.267 36.702 35 41.853 35 48c0 6.147 4.267 11.298 10 12.652z"></path>
      </g>
    </svg>
  );
}
