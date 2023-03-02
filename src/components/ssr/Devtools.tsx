import { useState, useEffect, useMemo, ReactNode } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { client } from "./store";

/** A counter written with React */
export function Devtools() {
  return <ReactQueryDevtools queryClient={client} />;
}
