// EDIT THIS FILE. The instructions are in README.md, in this folder.

import { useState } from "react";

export function useLocalStorage<T>(key: string, initial: T) {
  // TODO: read the saved value on the first render, save on every change, survive bad or blocked storage
  void key;
  return useState<T>(initial); // wrong: this forgets the value on refresh
}

export default function UnitToggle({ areaHa }: { areaHa: number }) {
  // TODO: a metric / imperial toggle that uses useLocalStorage("units", "metric")
  // 1 hectare = 2.471 acres
  return <p>Not built yet. Fire size: {areaHa} ha.</p>;
}
