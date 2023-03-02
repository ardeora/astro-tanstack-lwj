import type { IEvolutionChain, IPokemon } from "pokeapi-typescript";
import PokeAPI from "pokeapi-typescript";
import ColorThief from "colorthief";
import { properCase } from "../utils/fns";

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
  const pokemon: any = await PokeAPI.Pokemon.resolve(id);
  return pokemon as Pokemon;
};

interface IChainItem {
  id: number;
  name: string;
}

export const getEvolutionChain = async (id: number) => {
  const species = await PokeAPI.PokemonSpecies.resolve(id);
  const evolution: IEvolutionChain = await fetch(
    species.evolution_chain.url
  ).then((res) => res.json());

  const chain = evolution.chain;

  const chainItems: IChainItem[] = [];
  const regex = /\/(\d+)\/?$/;

  const getChain = (chain: any) => {
    chainItems.push({
      id: chain.species.url.match(regex)[1],
      name: chain.species.name,
    });

    if (chain.evolves_to.length > 0) {
      getChain(chain.evolves_to[0]);
    }
  };

  getChain(chain);

  return chainItems;
};

export const getTypesAndWeaknesses = async (id: number) => {
  const pokemon = await PokeAPI.Pokemon.resolve(id);
  const types = pokemon.types.map((type) => type.type.url);
  const damagePromises = [];
  types.forEach((type) => {
    damagePromises.push(
      fetch(type)
        .then((res) => res.json())
        .then((res) => res.damage_relations.double_damage_from)
    );
  });

  const doubleDamages = await Promise.all(damagePromises);
  const weaknesses = new Set();
  doubleDamages.forEach((damage) => {
    damage.forEach((weakness) => {
      weaknesses.add(weakness.name);
    });
  });

  return {
    weaknesses: Array.from(weaknesses),
    types: pokemon.types.map((type) => type.type.name),
  };
};

const getStatLabel = (name: string) => {
  switch (name) {
    case "special-attack":
      return "Sp. Atk";
    case "special-defense":
      return "Sp. Def";
    default:
      return properCase(name);
  }
};

export const getStats = async (id: number) => {
  const pokemon = await PokeAPI.Pokemon.resolve(id);
  return pokemon.stats.map((stat) => ({
    name: stat.stat.name,
    value: Math.round((stat.base_stat / 150) * 100),
    label: getStatLabel(stat.stat.name),
  }));
};

export async function getColorPalette(
  id: number
): Promise<[number, number, number]> {
  const pokemon = await getPokemon(id);
  const colorThief = new ColorThief();

  const img_url = pokemon.sprites.other["official-artwork"].front_default;

  const img = new Image();

  img.crossOrigin = "Anonymous";
  img.src = img_url;

  return new Promise((resolve) => {
    img.addEventListener("load", function () {
      const color = colorThief.getColor(img);
      resolve(RGBToHSL(color));
    });
  });
}

const RGBToHSL = ([r, g, b]: number[]): [number, number, number] => {
  r /= 255;
  g /= 255;
  b /= 255;
  const l = Math.max(r, g, b);
  const s = l - Math.min(r, g, b);
  const h = s
    ? l === r
      ? (g - b) / s
      : l === g
      ? 2 + (b - r) / s
      : 4 + (r - g) / s
    : 0;
  return [
    Math.round(60 * h < 0 ? 60 * h + 360 : 60 * h),
    Math.round(
      100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0)
    ),
    Math.round((100 * (2 * l - s)) / 2),
  ];
};
