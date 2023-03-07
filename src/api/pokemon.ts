import type { IEvolutionChain, IPokemon } from "pokeapi-typescript";
import PokeAPI from "pokeapi-typescript";
import ColorThief from "colorthief";
import { properCase } from "../utils/fns";

const API_URL = "https://pokeapi.aryandeora.com/api/pokeapi";
export interface Pokemon extends Omit<IPokemon, "sprites"> {
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
}

export const getPokemon = async (id: number) => {
  const pokemon = await fetch(`${API_URL}?method=get_pokemon&id=${id}`).then(
    (res) => res.json()
  );
  return pokemon as Pokemon;
};

interface IChainItem {
  id: number;
  name: string;
}

export const getEvolutionChain = async (id: number) => {
  const chainItems = await fetch(
    `${API_URL}?method=get_evolution_chain&id=${id}`
  ).then((res) => res.json());
  return chainItems as IChainItem[];
};

export const getTypesAndWeaknesses = async (id: number) => {
  const types = await fetch(
    `${API_URL}?method=get_types_and_weaknesses&id=${id}`
  ).then((res) => res.json());
  return types as {
    types: string[];
    weaknesses: string[];
  };
};

export const getStats = async (id: number) => {
  const stats = await fetch(`${API_URL}?method=get_stats&id=${id}`).then(
    (res) => res.json()
  );
  return stats as {
    stats: {
      name: string;
      value: number;
    }[];
  };
};

export async function getColorPalette(
  id: number
): Promise<[number, number, number]> {
  const palette = await fetch(
    `${API_URL}?method=get_color_palette&id=${id}`
  ).then((res) => res.json());
  return palette;
}
