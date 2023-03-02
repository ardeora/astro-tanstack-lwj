import { QueryClient } from "@tanstack/query-core";
import { atom } from "nanostores";

export const counter = atom(1);
export const client = new QueryClient();
