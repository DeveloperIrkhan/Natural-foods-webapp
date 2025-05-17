import { useEffect, useRef } from "react";

export function useOutSideClick<T extends HTMLElement>(callback: () => void) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const handleClickedOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback();
      }
    };
    document.addEventListener("click", handleClickedOutside);
    return () => {
      document.removeEventListener("click", handleClickedOutside);
    };
  }, [callback]);
  return ref;
}
