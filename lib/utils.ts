import { type ClassValue, clsx } from "clsx";
import { debounce } from "lodash";
import { Dispatch, SetStateAction } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
};

export const debouncedSetEditorKey = debounce(
  (action: Dispatch<SetStateAction<number>>) => {
    action((prev) => prev + 1);
  },
  500
);
