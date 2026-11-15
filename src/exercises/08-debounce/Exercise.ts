// EDIT THIS FILE. The instructions are in README.md, in this folder.

export function debounce<Args extends unknown[]>(fn: (...args: Args) => void, waitMs: number) {
  // TODO: call fn only after waitMs has passed with no new call. Add a cancel() method.
  void waitMs;

  function debounced(...args: Args) {
    fn(...args); // wrong: this calls fn every time
  }

  debounced.cancel = () => {};

  return debounced;
}

// Usage:
//   const log = debounce((text: string) => console.log("search for", text), 300);
//   log("k"); log("ka"); log("kam");   // only "search for kam" is logged, 300 ms after this call
//   log.cancel();                       // would stop even that one
